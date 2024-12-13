<?php

//https://laravel.com/docs/11.x/socialite

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\{User,Device};
use Illuminate\Support\Facades\Date;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Google\Client as Google_Client;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthenticatedSessionController extends Controller
{

    public function __construct(){
        parent::__construct();   
    }
    
    /**
     * Display the login view.
     */
    public function create(Request $request): Response{

        $canResetPassword = Route::has('password.request');
        $status = session('status');

        //$path = $request->get('path');

        $isApp = $this->isApp($request);

        return Inertia::render('Auth/Login',compact('canResetPassword','status','isApp'/*,'path'*/));
    }

    public function setUserSettings(){

        // save language on user
        $language = setUserLanguage();

        // save dark mode if on user settings
        $darkmode = setUserDarkMode();
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse{
               
        $request->authenticate();

        $request->session()->regenerate();

        $this->setUserSettings();

        // if coming from the login button on top
        /*
        if(isset($request->path) && !empty($request->path)){
            return redirect($request->path);
        }
        */

        //return redirect()->intended(route('dashboard', absolute: false));        
        //return redirect()->intended(route('user', absolute: false));        
        return redirect()->intended(route('user', absolute: false));
    }

    // when logging in with biometrics
    public function authentication(User $user, Request $request): RedirectResponse{

        if(isset($user) && !empty($user)){
            
            Auth::login($user);

            $this->setUserSettings();

            return redirect()->intended(route('user', absolute: false));
        }
        else{
            throw ValidationException::withMessages([
                'authentication' => trans('Error'),
            ]);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function google(): RedirectResponse
    {
        //return Socialite::driver('google')->scopes(['read:user', 'public_repo'])->with(['hd' => 'example.com'])->redirect();

        // send info to recover it later
        $info = [
        ];

        return Socialite::driver('google')->with($info)->redirect();
    }

    /*
    public function apple(Request $request){

        //$state = json_encode($state, JSON_THROW_ON_ERROR);
        $state = [];

        return Socialite::driver('apple')->setScopes(['name', 'email'])->with(['state' => $state])->redirect();
    }
    */

    public function loginCallback(Request $request, $type){

        switch($type){

            case 'google':
                return $this->googleCallback($request);
                break;
        }
    }

    public function googleCallback(Request $request): RedirectResponse{

        /*
        if ($request->has('state')) {
            $state = json_decode($request->get('state'), true, 512, JSON_THROW_ON_ERROR);
        }
        */

        /*
            Laravel\Socialite\Two\User Object ( 
                [token] => ya29.a0AfB_byBn_EdvpjjainuUTADZBqlKP1O8MZXr8ZDqnV2I2Y58Aq3XbHB5KicvODKi-vMdjwl_RTg9WYFrS4cn3c2F5NGAuVTlUj9Ag1lBwi0yPyxVxJG1pSVYw053Tp3Mwj0jJV9VPj_uJb7aywc8U69GaDV-Kw4E_sGFaCgYKAbwSARISFQGOcNnCNWJSLBFUW_qyUzwEhv3PUQ0171 
                [refreshToken] => 
                [expiresIn] => 3599 
                [approvedScopes] => Array ( 
                    [0] => https://www.googleapis.com/auth/userinfo.profile 
                    [1] => openid 
                    [2] => https://www.googleapis.com/auth/userinfo.email ) 
                [id] => 114276970029095412274 
                [nickname] => 
                [name] => arlosmar 
                [email] => arlosmar@gmail.com 
                [avatar] => https://lh3.googleusercontent.com/a/ACg8ocJbNFWOnpwh16qbn4lgItW8uF7uNLMiK03Bziowr7pnvVDN=s96-c 
                [user] => Array ( 
                    [sub] => 114276970029095412274 
                    [name] => arlosmar 
                    [given_name] => arlosmar 
                    [picture] => https://lh3.googleusercontent.com/a/ACg8ocJbNFWOnpwh16qbn4lgItW8uF7uNLMiK03Bziowr7pnvVDN=s96-c 
                    [email] => arlosmar@gmail.com 
                    [email_verified] => 1 
                    [locale] => en-GB 
                    [id] => 114276970029095412274 
                    [verified_email] => 1 
                    [link] => ) 
                [attributes] => Array ( 
                    [id] => 114276970029095412274 
                    [nickname] => 
                    [name] => arlosmar 
                    [email] => arlosmar@gmail.com 
                    [avatar] => https://lh3.googleusercontent.com/a/ACg8ocJbNFWOnpwh16qbn4lgItW8uF7uNLMiK03Bziowr7pnvVDN=s96-c 
                    [avatar_original] => https://lh3.googleusercontent.com/a/ACg8ocJbNFWOnpwh16qbn4lgItW8uF7uNLMiK03Bziowr7pnvVDN=s96-c ) )
        */

        // The stateless() may be used to disable session state verification. 
        // This is useful when adding social authentication to a stateless API that does not utilize cookie based sessions
        //$user = Socialite::driver('google')->stateless(false)->user();
        $user = Socialite::driver('google')->user();

        // All providers
        /*
        $user->getId();
        $user->getNickname();
        $user->getName();
        $user->getEmail();
        $user->getAvatar();
        */

        // if trying to log in and not there, register
        $found = User::where('email',$user->email)->first();

        $now = Date::now();
        $loginApp = getRandomToken($found);

        // register
        if(!isset($found) || empty($found)){
            
            // create and auto verify
            $userInfo = [
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'email_verified_at' => $now,
                'loginApp' => $loginApp
            ];

            // notifications activated by default
            $userInfo['settings'] = $this->getDefaultSettings();
            
            $found = User::create($userInfo);
        }
        else{
            // check if not verified and auto verify
            if(!isset($found->email_verified_at) || empty($found->email_verified_at)){
                $found->update(['email_verified_at',$now]);   
            }            
        }
     
        Auth::login($found);

        $this->setUserSettings();
     
        return redirect()->intended(route('user', absolute: false));
    }

    /*

    public function appleCallback(Request $request): RedirectResponse{

        try{

            if($request->has('state')) {
                $state = json_decode($request->get('state'), true, 512, JSON_THROW_ON_ERROR);
            }

            Laravel\Socialite\Two\User Object ( 

                [token] => eyJraWQiOiJmaDZCczhDIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoibWUubmlpZC5sb2dpbkFwcCIsImV4cCI6MTY5NDk2NjMzNCwiaWF0IjoxNjk0ODc5OTM0LCJzdWIiOiIwMDAyMjMuOWU1Mjg2ZGY0MjhjNGIzOGFiN2M1OTllNTNlZDY3OTIuMTYzMCIsImF0X2hhc2giOiI1clZxdjZtdTg4amZlUHk2REFGWEJRIiwiZW1haWwiOiJhcmxvc21hckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJhdXRoX3RpbWUiOjE2OTQ4Nzk5MzIsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZX0.XuCv6auaLwGunL2Yyk2_aVzlADRAS1Fnxz8arNlmK0SrI93Tmis2TSWp0kiG0VgdvI5qnn2pT5HyWrZ4Hox0EhbtHTSPlMlSDPGfA4PZoyrWwUPz8JvtKoRWtWwx557juDu8vRCWsar3Ml0I6Jrzg_evZAr3M83pYBOPieenwjvtHf2Cm116JE8Im1fwS6pYvrFa_bbKrZShmqt9U6hYvQ_e8qgK-SYgtrMwJSiDVuaPwqlBY2n6d1Qkvg1wIl_VxxctDRby5LlfcvHQRfMvCPhdZHeIIm732YhljeyvkZSrvRERp7fGmQbX3TbGcF36kelO2ENqqXwoOKO69w9doA 

                [refreshToken] => r64d7173d7cd04affaeaff15534c4233a.0.msst.e5qqoFt86W5CoztWBWXAAQ 
                [expiresIn] => 3600 
                [approvedScopes] => 
                [id] => 000223.9e5286df428c4b38ab7c599e53ed6792.1630 
                [nickname] => 
                [name] => 
                [email] => arlosmar@gmail.com 
                [avatar] => 
                [user] => Array ( 
                    [iss] => https://appleid.apple.com 
                    [aud] => me.niid.loginApp 
                    [exp] => 1694966334 
                    [iat] => 1694879934 
                    [sub] => 000223.9e5286df428c4b38ab7c599e53ed6792.1630 
                    [at_hash] => 5rVqv6mu88jfePy6DAFXBQ 
                    [email] => arlosmar@gmail.com 
                    [email_verified] => true 
                    [auth_time] => 1694879932 
                    [nonce_supported] => 1 
                ) 
                [attributes] => Array ( 
                    [id] => 000223.9e5286df428c4b38ab7c599e53ed6792.1630 
                    [name] => 
                    [email] => arlosmar@gmail.com 
                ) 
            )
            
            $user = Socialite::driver('apple')->stateless()->user();
        }
        catch (Exception $e) {
        }
    }
    */

    // to have persistent login on the app
    public function persistentLogin(Request $request): RedirectResponse{

        // if already logged in, do nothing
        $user = auth()->user();

        // check language from the url
        $language = '';
        if(isset($request->language) && !empty($request->language)){
            $language = "/".$language;
        }

        // check darkmode from the url
        $darkmode = '';
        if(isset($request->darkmode) && !empty($request->darkmode)){
            $darkmode = "&darkmode=".$request->darkmode;
        }

        if(isset($user) && !empty($user)){
            return redirect()->to(route('home').$language."?isApp=android&logged=".$user->id.'&token='.$user->loginApp.'&nomsg=1'.$darkmode);
        }
        else{
            
            if(isset($request->token) && !empty($request->token) && isset($request->userId) && !empty($request->userId)){

                $token = $request->token;
                $userId = $request->userId;
                
                $found = User::where('id',$userId)->where('loginApp',$token)->first();
                 
                if(isset($found) && !empty($found)){

                    Auth::login($found);

                    $this->setUserSettings();

                    return redirect()->to(route('home').$language."?isApp=android&loading=0&logged=".$found->id.'&token='.$token.'&nomsg=1'.$darkmode);
                }
            }
        }

        return redirect()->to(route('home').$language.'?isApp=android&loading=0&logged=0&nomsg=1'.$darkmode);
    }

    public function loginCallbackApp(Request $request, $platform, $type): RedirectResponse{

        switch($platform){

            case 'android':
                return $this->loginAndroid($request,$type);
                break;
        }

        return redirect()->to(route('login').'?isApp=android&loading=0&logged=0');
    }

    public function loginAndroid($request,$type){

        switch($type){

            case 'password':
                return $this->loginAndroidPassword($request);
                break;

            case 'google':
                return $this->loginAndroidGoogle($request);
                break;
        }

        return redirect()->to(route('login').'?isApp=android&loading=0&logged=0');
    }

    public function loginAndroidPassword(Request $request): RedirectResponse{

        if(isset($request->email) && !empty($request->email) && isset($request->password) && !empty($request->password)){

            $email = $request->email;
            $password = $request->password;
            $remember = true;

            // to avoid too many attemps
            $throttleKey = Str::transliterate(Str::lower($request->string('email')).'|'.$request->ip());
            if(!RateLimiter::tooManyAttempts($throttleKey,5)){
          
                if(Auth::attempt($request->only('email', 'password'),$remember)){

                    RateLimiter::clear($throttleKey);

                    $found = User::where('email',$email)->first();

                    $this->setUserSettings();

                    // save device id
                    if(isset($request->deviceId) && !empty($request->deviceId)){
                        
                        $deviceId = $request->deviceId;

                        // check if already on database. if so, update the user id
                        $now = Date::now();
                        $device = Device::updateOrCreate(
                            ['token_firebase' => $deviceId],
                            ['user_id' => $found->id, 'token_firebase_date' => $now]
                        );
                    }
                 
                    if(isset($found->admin) && !empty($found->admin)){
                        return redirect()->to(route('admin').'?isApp=android&loading=0&logged='.$found->id.'&token='.$found->loginApp);
                    }
                    else{                        
                        return redirect()->to(route('intranet').'?isApp=android&loading=0&logged='.$found->id.'&token='.$found->loginApp);
                    }
                }
                else{
                    RateLimiter::hit($throttleKey);
                }
            }
        }

        return redirect()->to(route('login').'?isApp=android&loading=0&logged=0');
    }

    //https://developers.google.com/identity/gsi/web/guides/verify-google-id-token#php
    public function loginAndroidGoogle(Request $request): RedirectResponse{

        if(isset($request->token) && !empty($request->token)){

            $token = $request->token;

            // Specify the CLIENT_ID of the app that accesses the backend
            // the key is from google console => android app => debug => client_id_app_android_debug
            // the key is from google console => android app => prod => client_id_app_android

            // on the app we use the web client id, so using the same here
            $client = new Google_Client(['client_id' => config('services.google.client_id_app_android')]);
            $payload = $client->verifyIdToken($token);
            //echo '<pre>'.print_r($payload,true).'</pre>';die;

            /*
                Array
                (
                    [iss] => https://accounts.google.com
                    [azp] => 574697809635-8e11m4jj2nrlv2gvful658sjsgojo44o.apps.googleusercontent.com
                    [aud] => 574697809635-5cflqub84gvuddur662c6a8vvvsg7shp.apps.googleusercontent.com
                    [sub] => 114276970029095412274
                    [email] => arlosmar@gmail.com
                    [email_verified] => 1
                    [name] => Armando
                    [picture] => https://lh3.googleusercontent.com/a/ACg8ocL0lgsIIKIhxs3YAh1yrn9Q87aEKOo-el8ZNlVDgpTd1h1E6S1r1g=s96-c
                    [given_name] => Armando
                    [iat] => 1733938900
                    [exp] => 1733942500
                )
            */
            if($payload){

                $userEmail = $payload['email'];
                // If the request specified a Google Workspace domain
                //$domain = $payload['hd'];

                $found = User::where('email',$userEmail)->first();

                $now = Date::now();                    

                // register
                if(!isset($found) || empty($found)){

                    $loginApp = getRandomToken($found);

                    $name = '';
                    if(isset($payload['name']) && !empty($payload['name'])){
                        $name = $payload['name'];
                    }
                    else{
                        if(isset($payload['given_name']) && !empty($payload['given_name'])){
                            $name = $payload['given_name'];
                        }
                    }
                    
                    // create and auto verify
                    $userInfo = [
                        'name' => $name,
                        'email' => $userEmail,
                        'email_verified_at' => $now,
                        'loginApp' => $loginApp
                    ];

                    // notifications activated by default
                    $userInfo['settings'] = $this->getDefaultSettings();
                    
                    $found = User::create($userInfo);
                }
                else{
                    // check if not verified and auto verify
                    if(!isset($found->email_verified_at) || empty($found->email_verified_at)){
                        $found->update(['email_verified_at',$now]);   
                    }            
                }

                // save device id
                if(isset($request->deviceId) && !empty($request->deviceId)){
                    
                    $deviceId = $request->deviceId;

                    // check if already on database. if so, update the user id
                    $device = Device::updateOrCreate(
                        ['token_firebase' => $deviceId],
                        ['user_id' => $found->id, 'token_firebase_date' => $now]
                    );
                }
             
                Auth::login($found);

                $this->setUserSettings();

                //return redirect()->intended(route('user', absolute: false));
             
                // going directly to admin or intranet to can add get parameter and 
                // be aware of the login on the app and save a flag
                if(isset($found->admin) && !empty($found->admin)){
                    return redirect()->to(route('admin').'?isApp=android&loading=0&logged='.$found->id.'&token='.$found->loginApp);
                }
                else{                        
                    return redirect()->to(route('intranet').'?isApp=android&loading=0&logged='.$found->id.'&token='.$found->loginApp);
                }
            }
        }

        return redirect()->to(route('login').'?isApp=android&loading=0&logged=0');
    }
}
