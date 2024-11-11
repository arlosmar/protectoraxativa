<?php

namespace App\Listeners;

use Illuminate\Notifications\Events\NotificationFailed;
use Illuminate\Support\Arr;
/*
When a notification fails it will dispatch an Illuminate\Notifications\Events\NotificationFailed event. You can listen for this event and choose to handle these notifications as appropriate. For example, you may choose to delete expired notification tokens from your database.

Remember to register your event listeners in the event service provider.
vendor/laravel/framework/src/Illuminate/Foundation/Support/Providers/EventServiceProvider.php

protected $listen = [
    \Illuminate\Notifications\Events\NotificationFailed::class => [
        \App\Listeners\DeleteExpiredNotificationTokens::class,
    ],
];
*/

class DeleteExpiredNotificationTokens
{
    /**
     * Handle the event.
     */
    public function handle(NotificationFailed $event): void
    {
        /*
        $report = Arr::get($event->data, 'report');

        $target = $report->target();

        $event->notifiable->notificationTokens()
            ->where('push_token', $target->value())
            ->delete();
        */
    }
}