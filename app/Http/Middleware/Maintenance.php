<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Maintenance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response{

        $maintenanceActive = config('maintenance.status');
        if(isset($maintenanceActive) && !empty($maintenanceActive)){
            
            $myIpsString = config('maintenance.ips');
            $myIps = explode(',',$myIpsString);
            $ip = $request->ip();
            $localhost = '127.0.0.1';

            if(!in_array($ip,$myIps) && $ip !== $localhost){
                //return response()->view('maintenance',['ip' => $ip]);
                return response()->view('maintenance.maintenance',compact('ip'));
            }
        }

        return $next($request);
    }
}
