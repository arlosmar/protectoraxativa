<?php

namespace App\Broadcasting;

use App\User;
use App\Message;
use Illuminate\Support\Facades\Log;

class MessageChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    
    
    /**
     * @param \App\User    $user
     * @param \App\Message $message
     *
     * @return bool
     */public function join(User $user, Message $message)
    {
        return $user->id === $message->user_id;
    }
}
