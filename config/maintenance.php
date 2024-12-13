<?php

// app/Http/Middleware/Maintenance.php
return [
    'status'    => env('APP_MAINTENANCE',false),
    'ips' => env('APP_MAINTENANCE_ALLOWED_IPS','')
];