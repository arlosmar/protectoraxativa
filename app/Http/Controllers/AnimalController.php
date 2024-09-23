<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\{Animal};
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\GroupUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;

class AnimalController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    public function index(Request $request,$section = null,$subsection = null){

        $user = auth()->user();

        $emails = [
            'email_colaboration' => config('mail.colaboration.address'),
            'email_volunteering' => config('mail.volunteering.address'),
            'email_adoptions' => config('mail.adoptions.address')
        ];

        $social = config('social.social');

        $apus = config('apu.apus');

        $images_path = env('PATH_ANIMALS', '');

        $animals_adopt = [];
        $animals_adopted = [];
        $animals_sponsor = [];
        $animals_sponsored = [];

        if(isset($section) && !empty($section)){

            switch($section){

                case 'adopt':

                    if(isset($subsection) && !empty($subsection)){

                        switch($subsection){

                            case 'animals':
                                $animals_adopt = Animal::find('status_id','1');
                                break;

                            case 'adopted':
                                $animals_adopted = Animal::find('status_id','2');
                                break;
                        }
                    }
                    break;

                case 'sponsor':
                    if(isset($subsection) && !empty($subsection)){

                        switch($subsection){

                            case 'animals':
                                $animals_sponsor = Animal::find('status_id','3');
                                break;

                            case 'sponsored':
                                $animals_sponsored = Animal::find('status_id','4');
                                break;
                        }
                    }
                    break;
            }
        }
        echo print_r($animals_adopted,true);die;
        return Inertia::render('Animals/Animals',compact('user','section','subsection','emails','social',
        'apus','animals_adopt','animals_adopted','animals_sponsor','animals_sponsored','images_path'));
    }
}