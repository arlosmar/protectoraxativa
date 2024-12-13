<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

// https://laravel.com/docs/11.x/queues#connections-vs-queues

// to use queue
// implements ShouldBroadcast
// php artisan queue:work

// to avoid queue
// implements ShouldBroadcastNow
// not working on server
class GenericEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notification;

    // Create a new event instance.
    public function __construct($notification){
        $this->notification = $notification;
    }

    public function broadcastOn(){
        // you have a channel and on the channel you have events
        // so for the genericChannel => event GenericEvent
        
        // public channel
        /*
        Echo.channel('GenericChannel')
        .listen('GenericEvent',(e) =>{
            sendTelegram(e.message,true);
        });
        */
        return new Channel('GenericChannel');
        
        // private channel
        // https://laravel.com/docs/11.x/broadcasting#authorizing-channels
        // authorize on => routes/channels.php
        /*
        /*
        Echo.private('GenericChannel')
        .listen('GenericEvent',(e) =>{
            
        });
        */
        /*
        return [
            new PrivateChannel('GenericChannel')
        ];
        */
    }

    // check conditions to broadcast
    /*
    public function broadcastWhen(){

        $user = $notifiable;

        if(isset($user['settings']) && !empty($user['settings'])){

            $settings = (array)json_decode($user['settings']);

            if(
                isset($settings['notifications']) && !empty($settings['notifications']) &&
                isset($settings['notifications_push']) && !empty($settings['notifications_push'])
            ){
                return true;
            }   
        }        
        
        return false;
    }
    */
}