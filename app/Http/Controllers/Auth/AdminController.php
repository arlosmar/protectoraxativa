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

class AdminController extends Controller
{

    public function __construct(){
        parent::__construct();   
    }
    
    public function adminProfile(Request $request,$subsection = null){
        return $this->admin($request,'profile',$subsection);
    }

    public function adminAnimals(Request $request,$subsection = null,$page=1){
        return $this->admin($request,'animals',$subsection,$page);
    }

    public function adminSections(Request $request,$section = null,$page=1){
        return $this->admin($request,$section,null,$page);
    }

    public function adminAccount(Request $request,$subsection = null){
        return $this->admin($request,'account',$subsection);
    }

    public function admin(Request $request,$section = null,$subsection = null,$page = 1){

        $user = auth()->user();

        if(isset($user->admin) && !empty($user->admin)){

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

            $imagesPaths = config('paths.images');        

            $baseUrl = URL::to('/');
            
            return Inertia::render('Admin/Admin',compact('user','section','subsection','status','msg','baseUrl','imagesPaths','page'));
        }
        else{
            return Redirect::route('intranet');
        }
    }

    // Update the user's profile information.
    public function update(ProfileUpdateRequest $request): RedirectResponse{

        $user = auth()->user();

        if(isset($user->admin) && !empty($user->admin)){

            $request->user()->fill($request->validated());

            if ($request->user()->isDirty('email')) {
                $request->user()->email_verified_at = null;
            }

            $request->user()->save();

            return Redirect::route('admin.account.info');
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse{

        $user = auth()->user();

        if(isset($user->admin) && !empty($user->admin)){

            $request->validate([
                'password' => ['required', 'current_password'],
            ]);

            Auth::logout();

            $user->delete();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            // return Redirect::to('/');  
            // trans('user.account.deleted')
            return Redirect::to('?msg=user.profile.account.deleted');
        }
    }
}
