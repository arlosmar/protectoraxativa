<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Líneas de idioma de restablecimiento de contraseña
    |--------------------------------------------------------------------------
    |
    | Las siguientes líneas de idioma son las líneas predeterminadas que coinciden con las razones
    | que son dadas por el intermediario de contraseñas para un intento de actualización de contraseña
    | resultado como el fracaso debido a una contraseña inválida / token de restablecimiento.
    |
    */

    'reset' => 'Se ha restablecido su contraseña.',
    'sent' => 'Le hemos enviado el enlace de restablecimiento de contraseña por correo electrónico.',
    'throttled' => 'Por favor, espere antes de volver a intentarlo (mínimo '.config('auth.passwords.'.config('auth.defaults.passwords').'.throttle').' segundos).',
    'token' => 'Este token de restablecimiento de contraseña no es válido.',
    'user' => 'No podemos encontrar un usuario con esa dirección de correo electrónico.',

];