<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Illuminate\Auth\Notifications\{VerifyEmail,ResetPassword};
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Middleware\RedirectIfAuthenticated;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // overwrite redirect if authenticated
        // redirect to when going to /login and already logged in
        // /vendor/laravel/framework/src/Illuminate/Auth/Middleware/RedirectIfAuthenticated.php
        /*
        public function handle(Request $request, Closure $next, string ...$guards): Response
        {
            $guards = empty($guards) ? [null] : $guards;

            foreach ($guards as $guard) {
                if (Auth::guard($guard)->check()) {   

                    $user = auth()->user();

                    if(isset($user->admin) && !empty($user->admin)){             
                        $path = 'admin';
                    }
                    else{
                        $path = 'intranet';
                    }
                    return redirect()->route($path);
                    //return redirect($this->redirectTo($request));
                }
            }

            return $next($request);
        }
        */
        redirectIfAuthenticated::redirectUsing(function () {
            
            $user = auth()->user();

            if(isset($user->admin) && !empty($user->admin)){             
                $path = 'admin';
            }
            else{
                $path = 'intranet';
            }

            return route($path);
        });

        // to customize the verify email

        // old version => vendor/laravel/framework/src/Illuminate/Auth/Notifications/VerifyEmail.php
        // buildMailMessage

        // the new templates are on 
        // resources/views/vendor/mail/html/message.blade.php
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
        
            return (new MailMessage)
                ->subject(trans('mail.verify.subject'))
                ->greeting(trans('mail.verify.greeting'))
                ->line(trans('mail.verify.sentence1'))
                ->action(trans('mail.verify.button'), $url)
                ->line(trans('mail.verify.sentence2'))
                ->salutation(trans('mail.verify.salutation'));
        });

        // customize forgot-password email
        ResetPassword::toMailUsing(function (object $notifiable, string $token) {

            $url = url(route('password.reset', [
                'token' => $token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ], false));
        
            return (new MailMessage)
                ->subject(trans('mail.reset-password.subject'))
                ->greeting(trans('mail.reset-password.greeting'))
                ->line(trans('mail.reset-password.sentence1'))
                ->action(trans('mail.reset-password.button'),$url)
                ->line(trans('mail.reset-password.sentence2',['count' => config('auth.passwords.users.expire')]))
                ->line(trans('mail.reset-password.sentence3'))
                ->salutation(trans('mail.reset-password.salutation'));
        });
    }
}
