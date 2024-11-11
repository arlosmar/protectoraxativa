<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EventBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    // Create a new event instance.
    public function __construct($message){
        $this->message = $message;
    }

    // Get the channels the event should broadcast on.   
    /*  
    public function broadcastOn(): array{
        return [
            new PrivateChannel('channel-name'),
        ];
    }
    */

    public function broadcastOn(){
        //return ['my-channel']; // important part of realtime notification
        return new Channel('my-channel');
    }

    /*
    public function broadcastAs(){
        return 'my-event';// important part of realtime notification
    }
    */
}