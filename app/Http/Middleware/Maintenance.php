<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Config;

class Maintenance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //$myIp = Config::get('maintenance.ip');
        /*
        $myIp = config('maintenance.ip');
        $ip = $request->ip();
        $localhost = '127.0.0.1';

        if($ip !== $myIp && $ip !== $localhost){
            //return response()->view('maintenance',['ip' => $ip]);
            return response()->view('maintenance',compact('ip'));
        }
        */

        return $next($request);
    }
}
