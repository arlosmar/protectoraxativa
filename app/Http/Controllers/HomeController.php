<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
//use DB;

class HomeController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    // print php/react/etc. versions
    public function versions(){

        $laravel = app()::VERSION;
        $php = phpversion();
        $database = '';

        //$content = File::get('/package.json');
        //echo '<pre>'.print_r($content,true).'</pre>';die;
        
        return Inertia::render('Versions',compact('laravel','php','database'));
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

        $email_colaboration = config('mail.colaboration.address');
        $email_volunteering = config('mail.volunteering.address');

        $social = config('social.social');

        $partners = config('partners');

        $forms = config('forms.forms');

        $prices = config('prices.prices');

        return Inertia::render('Home',compact('user','email_colaboration','email_volunteering','language','social','partners','prices','forms'));
        //return view('welcome');
    }

    public function section($section = null){
        
        // read from json file
        //App::setLocale('es');
        //echo print_r(trans('introduction')['title'],true);die;
        
        $user = auth()->user();

        $email_colaboration = config('mail.colaboration.address');
        $email_volunteering = config('mail.volunteering.address');

        $social = config('social.social');

        $partners = config('partners');

        $forms = config('forms.forms');

        $prices = config('prices.prices');

        return Inertia::render('Home',compact('user','section','email_colaboration','email_volunteering','social','partners','prices','forms'));
    }

    public function info($item = null){

        $user = auth()->user();

        return Inertia::render('Info/Info',compact('user','item'));
    }
}