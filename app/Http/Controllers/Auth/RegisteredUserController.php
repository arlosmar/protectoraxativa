<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

//https://laravel.com/docs/11.x/verification#the-email-verification-notice

class RegisteredUserController extends Controller
{

    public function __construct(){
        parent::__construct();   
    }
    
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
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

        $userInfo = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];

        // if cookie language, save on user
        $cookieLanguage = getLanguageCookie();  
        if(isset($cookieLanguage) && !empty($cookieLanguage)){
            $userInfo['language'] = $cookieLanguage;
        }

        $user = User::create($userInfo);

        event(new Registered($user));

        Auth::login($user);

        //return redirect(route('dashboard', absolute: false));
        //return redirect(route('user', absolute: false));
        return redirect(route('verification.notice'));
    }
}
