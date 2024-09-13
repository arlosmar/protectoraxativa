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
use App\Models\{User};
use Illuminate\Support\Facades\Date;
use Laravel\Socialite\Facades\Socialite;

class AuthenticatedSessionController extends Controller
{

    public function __construct(){
        parent::__construct();   
    }
    
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // save language on user
        $language = setUserLanguage();

        // save dark mode if on user settings
        $darkmode = setUserDarkMode();

        //return redirect()->intended(route('dashboard', absolute: false));
        return redirect()->intended(route('user', absolute: false));
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
        $info = [
        ];

        return Socialite::driver('google')->with($info)->redirect();
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

        // if loggging in and not there, register
        $found = User::where('email',$user->email)->first();

        $now = Date::now();

        // register
        if(!isset($found) || empty($found)){
            
            $found = User::create([
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'email_verified_at' => $now
            ]);
        }
        else{
            // save email_verified_at
            $found->update(['email_verified_at',$now]);
        }
     
        Auth::login($found);
     
        return redirect()->intended(route('user', absolute: false));
    }

    /*
    public function apple(Request $request){

        //$state = json_encode($state, JSON_THROW_ON_ERROR);
        $state = [];

        return Socialite::driver('apple')->setScopes(['name', 'email'])->with(['state' => $state])->redirect();
    }

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
}
