<?php

//amicsengirona@gmail.com

return [

    /*
    |--------------------------------------------------------------------------
    | Default Mailer
    |--------------------------------------------------------------------------
    |
    | This option controls the default mailer that is used to send all email
    | messages unless another mailer is explicitly specified when sending
    | the message. All additional mailers can be configured within the
    | "mailers" array. Examples of each type of mailer are provided.
    |
    */

    'default' => env('MAIL_MAILER', 'log'),

    /*
    |--------------------------------------------------------------------------
    | Mailer Configurations
    |--------------------------------------------------------------------------
    |
    | Here you may configure all of the mailers used by your application plus
    | their respective settings. Several examples have been configured for
    | you and you are free to add your own as your application requires.
    |
    | Laravel supports a variety of mail "transport" drivers that can be used
    | when delivering an email. You may specify which one you're using for
    | your mailers below. You may also add additional mailers if needed.
    |
    | Supported: "smtp", "sendmail", "mailgun", "ses", "ses-v2",
    |            "postmark", "resend", "log", "array",
    |            "failover", "roundrobin"
    |
    */

    'mailers' => [

        'smtp' => [
            'transport' => 'smtp',
            'url' => env('MAIL_URL'),
            'host' => env('MAIL_HOST', '127.0.0.1'),
            'port' => env('MAIL_PORT', 2525),
            'encryption' => env('MAIL_ENCRYPTION', 'tls'),
            'username' => env('MAIL_USERNAME'),
            'password' => env('MAIL_PASSWORD'),
            'timeout' => null,
            'local_domain' => env('MAIL_EHLO_DOMAIN'),
        ],

        'ses' => [
            'transport' => 'ses',
        ],

        'postmark' => [
            'transport' => 'postmark',
            // 'message_stream_id' => env('POSTMARK_MESSAGE_STREAM_ID'),
            // 'client' => [
            //     'timeout' => 5,
            // ],
        ],

        'resend' => [
            'transport' => 'resend',
        ],

        'sendmail' => [
            'transport' => 'sendmail',
            'path' => env('MAIL_SENDMAIL_PATH', '/usr/sbin/sendmail -bs -i'),
        ],

        'log' => [
            'transport' => 'log',
            'channel' => env('MAIL_LOG_CHANNEL'),
        ],

        'array' => [
            'transport' => 'array',
        ],

        'failover' => [
            'transport' => 'failover',
            'mailers' => [
                'smtp',
                'log',
            ],
        ],

        'roundrobin' => [
            'transport' => 'roundrobin',
            'mailers' => [
                'ses',
                'postmark',
            ],
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Global "From" Address
    |--------------------------------------------------------------------------
    |
    | You may wish for all emails sent by your application to be sent from
    | the same address. Here you may specify a name and address that is
    | used globally for all emails that are sent by your application.
    |
    */
    'test' => [
        'to' => [
            'address' => env('MAIL_TEST_FROM_ADDRESS', ''),
            'name' => env('MAIL_TEST_FROM_NAME', ''),
        ],
        'from' => [
             'address' => env('MAIL_TEST_TO_ADDRESS', ''),
            'name' => env('MAIL_TEST_TO_NAME', ''),
        ]
    ],
    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', ''),
        'name' => env('MAIL_FROM_NAME', ''),
    ],
    'adoptions' => [
        'address' => env('MAIL_FROM_ADDRESS_ADOPTIONS', ''),
        'name' => env('MAIL_FROM_NAME_ADOPTIONS', ''),
    ],
    'colaboration' => [
        'address' => env('MAIL_FROM_ADDRESS_COLABORATION', ''),
        'name' => env('MAIL_FROM_NAME_COLABORATION', ''),
    ],
    'volunteering' => [
        'address' => env('MAIL_FROM_ADDRESS_VOLUNTEERING', ''),
        'name' => env('MAIL_FROM_NAME_VOLUNTEERING', ''),
    ],
    'info' => [
        'address' => env('MAIL_FROM_ADDRESS_INFO', ''),
        'name' => env('MAIL_FROM_NAME_INFO', ''),
    ],
    'contact' => [
        'address' => env('MAIL_FROM_ADDRESS_COLABORATION', ''),
        'name' => env('MAIL_FROM_NAME_COLABORATION', ''),
    ],
];
