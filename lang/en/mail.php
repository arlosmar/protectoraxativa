<?php

return [
    'trans' => [
        'name'  => 'Name',
        'email'  => 'Email',
        'message'  => 'Message',
        'copyright' => 'All right reserved.'
    ],
    'contact'   => [
        'subject'   => 'Contact from '.config('app.name'),
        'error' => 'Error sending email. Try again please.'
    ],
    'notification'   => [
        'subject'   => 'Notification from '.config('app.name'),
        'button' => 'Open APP',
        'salutation' => 'Regards'
    ],
    'generic'   => [
        'greeting' => 'Hello!',
        'salutation' => 'Regards',
        'troubleLink' => 'If you\'re having trouble clicking the ":actionText" button, copy and paste the URL below into your web browser:'
    ],
    'verify' => [
        'subject' => 'Verify Email Address',        
        "greeting" => "Hello!",
        'sentence1' => 'Please click the button below to verify your email address.',
        'button' => 'Verify Email Address',
        'sentence2' => 'If you did not create an account, no further action is required.',
        'salutation' => 'Regards',
        'troubleLink' => 'If you\'re having trouble clicking the ":actionText" button, copy and paste the URL below into your web browser:'
    ],
    'reset-password' => [
        'subject' => 'Reset Password Notification',
        "greeting" => "Hello!",
        'sentence1' => 'You are receiving this email because we received a password reset request for your account.',
        'button' => 'Reset Password',
        'sentence2' => 'This password reset link will expire in :count minutes.',
        'sentence3' => 'If you did not request a password reset, no further action is required.',
        'salutation' => 'Regards',
        'troubleLink' => 'If you\'re having trouble clicking the ":actionText" button, copy and paste the URL below into your web browser:'
    ]
];