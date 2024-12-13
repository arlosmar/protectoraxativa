<?php

// check if user is admin

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Redirect;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        
        // if admin
        if(isset($user->admin) && !empty($user->admin)){
            return $next($request);    
        }
        else{
            // if common user
            // http://localhost:8000/intranet/settings
            // /admin/animals => /intranet/animals
            // /admin/settings => /intranet/settings
            // /admin/account => /intranet/account
            $baseUrl = url('/');
            $url = $request->url();
            $path = str_replace($baseUrl,'',$url);

            $paths = [
                '/admin/animals',
                '/admin/settings',
                '/admin/account'
            ];

            if(in_array($path,$paths)){
                $newPath = str_replace('admin','intranet',$path);
                return Redirect::to($newPath);
            }
            else{
                return Redirect::route('intranet');
            }            
        }
    }
}
