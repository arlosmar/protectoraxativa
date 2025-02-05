<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\{User,Device};
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Date;

//https://laravel.com/docs/11.x/verification#the-email-verification-notice

class RegisteredUserController extends Controller
{

    public function __construct(){
        parent::__construct();   
    }
    
    /**
     * Display the registration view.
     */
    public function create(): Response{
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {        

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $loginApp = getRandomToken();

        $userInfo = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'loginApp' => $loginApp
        ];

        // if cookie language, save on user
        $cookieLanguage = getLanguageCookie();  
        if(isset($cookieLanguage) && !empty($cookieLanguage)){
            $userInfo['language'] = $cookieLanguage;
        }

        $extraDefaultSettings = [];

        // if darkmode cookie
        $darkmode = getDarkModeCookie();
        if($darkmode !== null){
            $extraDefaultSettings = [
                'darkmode' => $darkmode
            ];
        }

        // notifications activated by default
        $userInfo['settings'] = $this->getDefaultSettings($extraDefaultSettings);

        $user = User::create($userInfo);
        
        event(new Registered($user));

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

        Auth::login($user);

        //return redirect(route('dashboard', absolute: false));
        //return redirect(route('user', absolute: false));
        return redirect(route('verification.notice'));
    }

    public function registerApp(Request $request, $platform): RedirectResponse{

        switch($platform){

            case 'android':
                return $this->registerAndroid($request);
                break;
        }

        return redirect()->to(route('register').'?isApp=android&loading=0&logged=0');
    }

    public function registerAndroid(Request $request): RedirectResponse{

        if(isset($request->email) && !empty($request->email) && isset($request->password) && !empty($request->password)){

            $name = isset($request->name) ? $request->name : '';
            $email = $request->email;
            $password = $request->password;

            $userInfo = [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ];

            // if cookie language, save on user
            $cookieLanguage = getLanguageCookie();  
            if(isset($cookieLanguage) && !empty($cookieLanguage)){
                $userInfo['language'] = $cookieLanguage;
            }

            // notifications activated by default
            $userInfo['settings'] = $this->getDefaultSettings();

            $user = User::create($userInfo);

            // add loginApp
            $loginApp = getRandomToken($user);
            $user->update(['loginApp' => $loginApp]);

            event(new Registered($user));

            Auth::login($user);

            // message to validate email
            return redirect()->to(route('verification.notice').'?isApp=android&loading=0&logged='.$user->id.'&token='.$user->loginApp);
        }

        return redirect()->to(route('register').'?isApp=android&loading=0&logged=0');
    }

}
