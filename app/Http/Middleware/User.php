<?php

// check if user is not admin

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Redirect;

class User
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        
        // if common user
        if(!isset($user->admin) || empty($user->admin)){
            return $next($request);    
        }
        else{
            // if admin
            // http://localhost:8000/intranet/settings
            // /intranet/animals => /admin/animals
            // /intranet/settings => /admin/settings
            // /intranet/account => /admin/account
            $baseUrl = url('/');
            $url = $request->url();
            $path = str_replace($baseUrl,'',$url);

            $paths = [
                '/intranet/animals',
                '/intranet/settings',
                '/intranet/account'
            ];

            if(in_array($path,$paths)){
                $newPath = str_replace('intranet','admin',$path);
                return Redirect::to($newPath);
            }
            else{
                return Redirect::route('admin');
            }            
        }
    }
}
