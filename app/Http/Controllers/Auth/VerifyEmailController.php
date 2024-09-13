<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{

    public function __construct(){
        parent::__construct();   
    }
    
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            //return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
            return redirect()->intended(route('user', absolute: false).'?msg=user.email.verified');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        //return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        return redirect()->intended(route('user', absolute: false).'?msg=user.email.verified');
    }
}
