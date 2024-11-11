<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\{Envelope,Address};
use Illuminate\Queue\SerializesModels;

class Contact extends Mailable
{
    use Queueable, SerializesModels;

    private $values;

    /**
     * Create a new message instance.
     */
    public function __construct($values)
    {
        $this->values = $values;
    }

    /**
     * Get the message envelope.
     */

    // if you don't specify from, it uses global from config/mail.php
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: trans('mail.contact.subject'),
            //from: new Address($this->values['email'],$this->values['name']),
            replyTo: [
                new Address($this->values['email'],$this->values['name'])
            ],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.contact',
            with: [
                'values' => $this->values
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
