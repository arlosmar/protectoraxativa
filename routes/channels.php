<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user,$id) {
    return (int) $user->id === (int) $id;
});

// authorize private channels used on events
// channel by channel. 
// if several channels, you can do by a class with join method (search in google)
Broadcast::channel('PrivateChannel.{userId}', function ($user,$userId) {
    return (int) $user->id === (int) $userId;
});
