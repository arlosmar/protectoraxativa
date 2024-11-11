<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\Maintenance;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

        $middleware->append(Maintenance::class);
        
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            //\Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // when needed to be logged in and not, overwrite behaviour with this to
        // go to login but with current path
        // UNNECESSARY BECAUSE LARAVEL ALREADY DOES IT
        /*
        $middleware->redirectGuestsTo(function (Request $request) {
            
                // save the path to open it again                
                $requestUri = $request->getRequestUri();

                if($requestUri !== '/logout' && $requestUri !== '/login'){
                    $requestUriEncode = urlencode($requestUri);
                    return route('login').'?path='.$requestUriEncode;
                }
                else{
                    return route('login');
                }                                
        });
        */
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
