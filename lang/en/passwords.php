<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Password Reset Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are the default lines which match reasons
    | that are given by the password broker for a password update attempt
    | outcome such as failure due to an invalid password / reset token.
    |
    */

    'reset' => 'Your password has been reset.',
    'sent' => 'We have emailed your password reset link.',
    'throttled' => 'Please wait before retrying (minimum '.config('auth.passwords.'.config('auth.defaults.passwords').'.throttle').' seconds).',
    'token' => 'This password reset token is invalid.',
    'user' => "We can't find a user with that email address.",

];
