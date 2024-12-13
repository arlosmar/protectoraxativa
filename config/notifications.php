<?php

return [
    'send' => [
        'insert' => explode(',',env('SEND_NOTIFICATION_INSERT','')),
        'update' => explode(',',env('SEND_NOTIFICATION_UPDATE',''))
    ]
];