<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use App\Http\Requests\Auth\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use App\Models\{Status,Sponsor,Type,Age,Gender,Size,Breed,Person};
use DB;

class ProfileController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    public function intranet(Request $request,$section = null,$subsection = null){

        $user = auth()->user();

        if(!isset($user->admin) || empty($user->admin)){

            $status = session('status');

            $msg = '';
            if(isset($request->msg) && !empty($request->msg)){
                $msg = $request->msg;
            }

            // get user person and animals
            $user->load('person','person.animals');

            // get foreign keys tables
            $options = [                
                'status_id' => Status::all()->select('id','name'),
                'sponsor_id' => Sponsor::all()->select('id','name'),
                'type_id' => Type::all()->select('id','name'),
                'age_id' => Age::all()->select('id','name'),
                'gender_id' => Gender::all()->select('id','name'),
                'size_id' => Size::all()->select('id','name'),
                'breed_id' => Breed::select('id',DB::raw('description as name'))->get(),
                'person_id' => Person::all()
            ];

            $imagesPaths = config('paths.images');
            $baseUrl = URL::to('/');
            $itemsPerPage = config('variables.animalsPerPage');
            $page = 1;

            return Inertia::render('Intranet/Intranet',compact('user','section','subsection','msg','status','options','imagesPaths','baseUrl','itemsPerPage','page'));
        }
        else{
            // in case admin goes to the intranet url, redirect
            return Redirect::route('admin');
        }
    }

    // Display the user's profile form.
    public function edit(Request $request): Response
    {
        /*
        // not used because we don't allow access to user section if not verified        
        return Inertia::render('Profile/User', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
        */
        return $this->intranet($request,'account');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    // Delete the user's account
    public function destroy(Request $request): RedirectResponse{

        $user = auth()->user();
        
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);      

        Auth::logout();

        //$user->delete();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        //return Redirect::to('/');  
        // trans('user.account.deleted')
        return Redirect::to('?msg=user.profile.account.deleted');
    }
}
