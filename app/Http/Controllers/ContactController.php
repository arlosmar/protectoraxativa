<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\ContactSendRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller{

    public function __construct(){     
        parent::__construct();
    }

    public function index(){

        $user = auth()->user();

        $email = config('mail.from.address');

        $status = session('status');

        return Inertia::render('Contact/Contact',compact('user','email','status'));
    }

    public function contactSend(ContactSendRequest $request){

        $values = $request->validated();
        
        throw ValidationException::withMessages([
            'error' => ['a']
        ]);
    
        
        return back();
    }
}