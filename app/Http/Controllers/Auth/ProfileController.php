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

use App\Models\{Group,Event};

class ProfileController extends Controller
{

    public function __construct(){
        parent::__construct();   
    }

    public function user(Request $request,$section = null,$subsection = null){

        $user = auth()->user();

        $groups = Group::with(['tag','type'])->get();
        $events = Event::with(['tag','type'])->get();

        //$mustVerifyEmail = $request->user() instanceof MustVerifyEmail;

        $status = session('status');

        $msg = '';
        if(isset($request->msg) && !empty($request->msg)){
            $msg = $request->msg;
        }
        
        return Inertia::render('Profile/User',compact('user','section','subsection','groups','events','status','msg'));
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        /*
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
