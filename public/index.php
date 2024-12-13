<?php

use Illuminate\Http\Request;

// define environment to use later .env, .env.local, etc.
if(
    (isset($_SERVER['HTTP_HOST']) && !empty($_SERVER['HTTP_HOST'])) &&
    (
        str_contains($_SERVER['HTTP_HOST'],'localhost') ||
        str_contains($_SERVER['HTTP_HOST'],'192.168')
    )
){
    $env = 'local';
}
else{
    $env = ''; // empty to take .env
}

if(isset($env) && !empty($env)){
    putenv("APP_ENV=".$env);
}

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(Request::capture());
