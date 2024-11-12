<?php

return [
    'refresh' => [
        // in seconds
        'animals'  =>  env('REFRESH_ANIMALS_AFTER_TIME', '3600') // 1 hour
    ],
    'animalsPerPage' => env('ANIMALS_PER_PAGE',12),
    'app-year' => env('APP_YEAR','')
];
