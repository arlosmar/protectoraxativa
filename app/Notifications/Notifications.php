<?php

// https://laravel.com/docs/11.x/notifications
// https://laravel.com/docs/11.x/broadcasting#client-side-installation

// https://packagist.org/packages/laravel-notification-channels/fcm
// https://laravel-notification-channels.com/about/#suggesting-a-new-channel

/*
$user->notify(new Notifications(['title' => 'a', 'message' => 'b', 'image' => '']));
/*
send to several users
use Illuminate\Support\Facades\Notification;
 
Notification::send($users, new Notifications(['title' => 'a', 'message' => 'b', 'image' => '']));
*/

/*
    "apiKey":"AIzaSyCDKD-9HlIGb7nopL9AKV-NnzkZVeM9P_s",
    "authDomain": "protectoraxativa-e0481.firebaseapp.com",
    "projectId": "protectoraxativa-e0481",
    "storageBucket": "protectoraxativa-e0481.appspot.com",
    "messagingSenderId": "574697809635",
    "appId": "1:574697809635:web:aff456d94f87256f5f07d6",
    "measurementId": "G-ELXJV28QFE",
    "vapidKey": "BDtI3W95CFg_qjZvf_1jW8H7EE9YyNgEBQccmR2emI1rXix1v_0yZt21ifc2vZ0w0G9xOGu2R4_YJ4hVaiHU3JU",
*/

namespace App\Notifications;

use Illuminate\Notifications\Notification;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Notifications\Messages\BroadcastMessage;
/*
use Illuminate\Notifications\Messages\MailMessage;
use NotificationChannels\Fcm\FcmChannel;
use NotificationChannels\Fcm\FcmMessage;
use NotificationChannels\Fcm\Resources\Notification as FcmNotification;
*/

class Notifications extends Notification
{
    use Queueable;

    private $user = null;
    private $notification = null;

    // Create a new notification instance.
    public function __construct($user,$notification){
        $this->user = $user;
        $this->notification = $notification;
    }

    // Get the notification's delivery channels.
    public function via(object $notifiable): array{
        //return ['mail',FcmChannel::class];
        return ['broadcast'];
    }

    // to web/wpa
    public function toBroadcast(object $notifiable): BroadcastMessage{
        return new BroadcastMessage([
            'comment'=>$this->notification,
            'user_id'=>$this->user
        ]);
    }

    public function broadcastOn(){
        return ['my-channel'];
    }

    // to android/ios
    /*
    public function toFcm($notifiable): FcmMessage{

        // apn apple push notification

        return (new FcmMessage(notification: new FcmNotification(
                title: $this->notification['title'],
                body: $this->notification['message'],
                image: $this->notification['image']
            )))
            ->data(['data1' => 'value', 'data2' => 'value2'])
            ->custom(
                [
                    'android' => [
                        'notification' => [
                            'color' => '#0A0A0A',
                            'sound' => 'default',
                        ],
                        'fcm_options' => [
                            'analytics_label' => 'analytics',
                        ],
                    ],
                    'apns' => [
                        'payload' => [
                            'aps' => [
                                'sound' => 'default'
                            ],
                        ],
                        'fcm_options' => [
                            'analytics_label' => 'analytics',
                        ],
                    ],
                ]
            );
    }
    */

    // to email
    /*
    public function toMail(object $notifiable): MailMessage{
        return (new MailMessage)->markdown('mail.firebase-notification');
    }
    */

    // Get the array representation of the notification.
    /*
    public function toArray(object $notifiable): array{
        return [
      
        ];
    }
    */
}
