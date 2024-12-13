<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;

class HomeController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    // php info
    public function php(){
        echo '<pre>'.print_r(phpinfo(),true).'</pre>';
        die;
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

    // email templates
    public function email($template){
        $data = [
            'values' => [
                'name' => 'name',
                'email' => 'email',
                'message' => 'message'
            ]
        ];
        return view('emails.'.$template,$data);
    }

    public function index(Request $request, $lang = null){
        
        $user = auth()->user();

        // in case we want to show a message with ?msg=
        $message = null;
        if(isset($request->msg) && !empty($request->msg)){
            $message = $request->msg;
        }

        // if we receive darkmode from the app
        $darkmode = null;
        if(isset($request->darkmode) && !empty($request->darkmode)){
            $darkmode = $request->darkmode;
        }

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

        $guides = config('guides');

        return Inertia::render('Home',compact('user','email_colaboration','email_volunteering','language','social','partners','prices','forms','guides','message','darkmode'));
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

        $guides = config('guides');

        return Inertia::render('Home',compact('user','section','email_colaboration','email_volunteering','social','partners','prices','forms','guides'));
    }

    public function info($section = null){

        $user = auth()->user();

        return Inertia::render('Info/Info',compact('user','section'));
    }
}