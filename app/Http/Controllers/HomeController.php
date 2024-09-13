<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    public function index($lang = null){

        $user = auth()->user();

        $language = null;
        if(isset($lang) && !empty($lang)){
            $language = $lang;
        }
        /*
        $back = route('home');
        return Inertia::render('Contact',compact('back'));
        */

        $email = config('mail.from.address');

        return Inertia::render('Home',compact('user','email','language'));
        //return view('welcome');
    }

    public function info($item = null){

        $user = auth()->user();

        return Inertia::render('Info/Info',compact('user','item'));
    }
}