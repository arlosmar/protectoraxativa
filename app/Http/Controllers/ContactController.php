<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\ContactSendRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use App\Mail\Contact;

// https://laravel.com/docs/11.x/mail
class ContactController extends Controller{

    public function __construct(){     
        parent::__construct();
    }

    public function index(){

        $user = auth()->user();

        $email = config('mail.from.address');

        $emails = [
            'info' => config('mail.info.address'),
            'adoptions' => config('mail.adoptions.address'),
            'colaboration' => config('mail.colaboration.address'),
            'volunteering' => config('mail.volunteering.address')
        ];

        $social = config('social.social');

        $status = session('status');

        return Inertia::render('Contact/Contact',compact('user','email','status','emails','social'));
    }

    public function contactSend(ContactSendRequest $request){

        $values = $request->validated();

        if(
            isset($values['email']) && !empty($values['email']) &&
            isset($values['message']) && !empty($values['message'])
        ){
            //$to = config('mail.contact.address');
            $url = url('/');

            $toEmail = '';
            $toName = '';
            if(isset($url) && !empty($url)){
                                
                if(str_contains($url,'localhost') || str_contains($url,'192.168')){
                    $toEmail = config('mail.test.to.address');
                    $toName = config('mail.test.to.name');                    
                }
                else{
                    $toEmail = config('mail.contact.address');
                    $toName = config('mail.contact.name');
                }
            }
            else{                
                $toEmail = config('mail.test.to.address');
                $toName = config('mail.test.to.name');  
            }

            $to = [
                [                    
                    'email' => $toEmail,
                    'name' => $toName                     
                ]
            ];
            
            try{
                Mail::to($to)->send(new Contact($values));            
            }
            catch(\Exception $e){
                throw ValidationException::withMessages([
                    'error' => [trans('mail.contact.error')]
                ]);
            }
        }
        else{
            throw ValidationException::withMessages([
                'error' => [trans('mail.contact.error')]
            ]);
        }
        
        return back();
    }
}