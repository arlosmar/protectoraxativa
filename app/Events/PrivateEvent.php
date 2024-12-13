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
class PrivateEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    //public $notification; // public, can be seen by client side event.message
    public $message; // not working with notification. the event waits for the message field
    private $user;

    // Create a new event instance.
    public function __construct($user,$notification){
        $this->message = $notification;
        $this->user = $user;
    }

    // to use a custom event name
    // by default it is class name => PrivateEvent
    /*
    public function broadcastAs(): string{
        
        Echo.private('GenericChannel')
        .listen('event.test',(e) =>{
            
        });
        
        return 'event.test';
    }
    */

    /*
    broadcast when concrete condition
    public function broadcastWhen(): bool{
        return $this->order->value > 100;
    }
    */

    public function broadcastOn(){

        // you have a channel and on the channel you have events
        // so for the genericChannel => event GenericEvent
    
        // private channel
        // https://laravel.com/docs/11.x/broadcasting#authorizing-channels
        // authorize on => routes/channels.php
        /*
        Echo.private('GenericChannel')
        .listen('PrivateEvent',(e) =>{
            
        });
        */
        
        // in case we want more than one channel, use array
        /*
            return [
                new PrivateChannel('orders.'.$this->order->id),                
            ];
        */
        return new PrivateChannel('PrivateChannel.'.$this->user->id);
    }
}