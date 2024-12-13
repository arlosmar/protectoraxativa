<?php

// https://laravel.com/docs/11.x/broadcasting#configuration
// https://firebase.google.com/docs/cloud-messaging/concept-options

// firebase json file from firebase => project settings => service accounts => firebase admin sdk => generate private key
// to test sending messages directly on firebase => messaging (left menu) => create campaign => send test message
// google-services.json file on the android app => firebase => project settings => general => your apps (bottom part) => android app

/*
send to several users
use Illuminate\Support\Facades\Notification;
Notification::send($users, new UserNotifications($user,$notification));

send to one user
$user->notify(new UserNotifications($user,$notification));   
*/

namespace App\Notifications;

use Illuminate\Notifications\Notification;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use NotificationChannels\Fcm\FcmChannel;
use NotificationChannels\Fcm\FcmMessage;
use NotificationChannels\Fcm\Resources\Notification as FcmNotification;


// notifiable is the user
class UserNotifications extends Notification
{
    use Queueable;

    private $notification = null;

    // Create a new notification instance.
    public function __construct($notification){
        $this->notification = $notification;
    }

    // Get the notification's delivery channels.
    // mail => email => toMail()
    // broadcast => browser and pwa => toBroadcast()
    // FcmChannel::class is firebase, push notifications to navite apps => toFcm()
    public function via(object $notifiable): array{

        $array = [];

        $user = $notifiable;

        if(isset($user->settings) && !empty($user->settings)){

            $settings = (array)json_decode($user->settings);

            if(isset($settings['notifications']) && !empty($settings['notifications'])){

                // check if user allows the notification type
                if(isset($settings['notifications_types']) && !empty($settings['notifications_types'])){
                
                    $userNotificationsTypes = $settings['notifications_types'];
                    $userNotificationsTypesArray = explode(',',$userNotificationsTypes);
                    $notificationType = $this->notification['type'];

                    if(in_array($notificationType,$userNotificationsTypesArray)){
                 
                        if(isset($settings['notifications_push']) && !empty($settings['notifications_push'])){
                            $array[] = 'broadcast'; // wpa or browser
                            $array[] = FcmChannel::class; // app
                        }

                        if(isset($settings['notifications_email']) && !empty($settings['notifications_email'])){         
                            $array[] = 'mail';
                        }
                    }
                }
            }
        }

        return $array;
    }

    // to web/wpa
    public function toBroadcast(object $notifiable): BroadcastMessage{        

        /*
        on react
        Echo.private('App.Models.User.'+user?.id)
        .notification((notification) => {
            setToastGeneralMsg(notification.message);
            setToastGeneralErrorMsg('');
            setOpenToastGeneral(true);
        });   
        */
        return new BroadcastMessage($this->notification);
    }

    // to email
    public function toMail(object $notifiable): MailMessage{

        $data = [
            'title' => $this->notification['title'] ? $this->notification['title'] : '',
            'message' => $this->notification['message'] ? $this->notification['message'] : '',
            'url' => $this->notification['url'] ? $this->notification['url'] : url('/')
        ];
        
        /*
        return (new MailMessage)
            ->markdown('emails.notification',$data) 
            ->from(config('mail.noreply.address'),config('mail.noreply.name'))           
            ->subject(trans('mail.notification.subject'));
        */

        return (new MailMessage)
            ->from(config('mail.noreply.address'),config('mail.noreply.name'))
            ->subject(trans('mail.notification.subject'))
            ->greeting($data['title'])
            ->line($data['message'])            
            ->action(trans('mail.notification.button'), $data['url'])
            ->salutation(trans('mail.notification.salutation'));           
    }

    // to android/ios
    public function toFcm($notifiable): FcmMessage{

        // to add the token manually
        //->token($user->token_firebase)

        // but better to use on user model the method routeNotificationForFcm

        $user = $notifiable;

        // get notification category
        $notificationType = $this->notification['type'];

        $url = $this->notification['url'] ? $this->notification['url'] : url('/');

        return (new FcmMessage(notification: new FcmNotification(
                title: $this->notification['title'] ? $this->notification['title'] : '',
                body: $this->notification['message'] ? $this->notification['message'] : '',
                //image: '/storage/logo.png'
            )))            
            // to send data to the app   
            // if localhost change to server         
            ->data([
                'channel_description' => $this->notification['channel'],
                'url' => str_replace('http://localhost:8000','https://protectoraxativa.org',$url)
            ])
            ->custom(
                [
                    'android' => [
                        'notification' => [
                            //'color' => '#0A0A0A',
                            //'sound' => 'default',
                            'click_action' => 'notification_click',
                            'channel_id' => $this->notification['channel']                            
                        ]/*,
                        'fcm_options' => [
                            'analytics_label' => 'analytics',
                        ],*/
                    ],
                    // apn => apple push notification
                    'apns' => [
                        'payload' => [
                            'aps' => [
                                'sound' => 'default',
                                'category' => $this->notification['channel']
                            ],
                        ]/*,
                        'fcm_options' => [
                            'analytics_label' => 'analytics',
                        ],*/
                    ],
                ]
            );
    }

    // Get the array representation of the notification.
    /*
    public function toArray(object $notifiable): array{
        return [
      
        ];
    }
    */
}
