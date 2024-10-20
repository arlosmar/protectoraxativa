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

class ProfileController extends Controller
{

    public function __construct(){
        parent::__construct();   
    }

    public function userProfile(Request $request,$subsection = null){
        return $this->user($request,'profile',$subsection);
    }

    public function userAnimals(Request $request,$subsection = null,$page=1){
        return $this->user($request,'animals',$subsection,$page);
    }

    public function userSections(Request $request,$section = null,$page=1){
        return $this->user($request,$section,null,$page);
    }

    public function user(Request $request,$section = null,$subsection = null,$page = 1){

        $user = auth()->user();

        if(
            !isset($page) || 
            empty($page) ||
            !is_numeric($page) || 
            $page < 1
        ){
            $page = 1;
        }

        // not used because we don't allow access to user section if not verified
        //$mustVerifyEmail = $request->user() instanceof MustVerifyEmail;

        $status = session('status');

        $msg = '';
        if(isset($request->msg) && !empty($request->msg)){
            $msg = $request->msg;
        }

        $images_path = env('PATH_ANIMALS', '');
        
        return Inertia::render('User/User',compact('user','section','subsection','status','msg','images_path','page'));
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        /*
        // not used because we don't allow access to user section if not verified        
        return Inertia::render('Profile/User', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
        */
        return $this->user($request,'profile');
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

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
