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
use App\Models\{User};
use Illuminate\Support\Facades\Http;
use Google\Client;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{

    public function __construct(){
        parent::__construct();   
    }

    // test firebase
    // firebase json file from firebase => project settings => service accounts => firebase admin sdk => generate private key
    // to test sending messages directly on firebase => messaging (left menu) => create campaign => send test message
    // google-services.json file on the android app => firebase => project settings => general => your apps (bottom part) => android app
    public function firebase(){

        $file = Storage::path('firebase.json');

        $client = new Client();
        $client->setAuthConfig($file);
        $client->addScope('https://www.googleapis.com/auth/firebase.messaging');
        $client->useApplicationDefaultCredentials();
        $accessTokenArray = $client->fetchAccessTokenWithAssertion();
        $accessToken = $accessTokenArray['access_token'];
        
        //return $accessToken;
        
        // device token
        $token = '';

        $data = [
            'message' => [
                'notification' => [
                    'title' => 'laravel title',
                    'body' => 'laravel body'
                ],
                'token' => $token
            ]
        ];

        $url = 'https://fcm.googleapis.com/v1/projects/protectoraxativa-e0481/messages:send';

        $encodedData = json_encode($data);
        $headers = [
            'Authorization: Bearer ' . $accessToken,
            'Content-Type: application/json',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        // Disabling SSL Certificate support temporarly
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $encodedData);
        // Execute post
        $result = curl_exec($ch);
        if ($result === FALSE) {
            die('Curl failed: ' . curl_error($ch));
        }
        // Close connection
        curl_close($ch);

        // Decode the result
        $response = json_decode($result, true);

        // Check for errors in the FCM response
        if (isset($response['error'])) {
            die('FCM error: ' . $response['error']);
        }

        // Optionally, print the entire response for debugging
        dd($response);
        
        return true;
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
        /*
        $users = User::all();
        foreach($users as $item){
            $loginApp = substr($item->id.'_'.time().'_'.str()->password(100,true,true,false),0,100);
            $item->update(['loginApp' => $loginApp]);
        }
        */
        $user = auth()->user();
        $user->load('person');

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

        // for the richt text, to can add images
        $csrf_token = csrf_token();

        // to send notifications
        // if localhost include admins
        if(isLocalhost()){
            $users = User::orderBy('email','asc')->select('id','email','name')->get();
        }
        else{
            $users = User::where('admin',false)->orderBy('email','asc')->select('id','email','name')->get();
        }

        // types of notifications to open a different url
        $notifications = $this->getNotifications();

        $isApp = $this->isApp($request);

        // if app, check if notifications parameter stating notifications are disabled
        $appNotificationsEnabled = true;
        if($isApp && isset($request->notifications) && intval($request->notifications) === 0){
            $appNotificationsEnabled = false;
        }

        $emails = [
            'info' => config('mail.info.address')
        ];

        $social = config('social.social');

        return Inertia::render('Admin/Admin',compact('user','section','subsection','status','msg','baseUrl','imagesPaths','page','csrf_token','users','notifications','emails','social','isApp','appNotificationsEnabled'));
    }

    // Update the user's profile information.
    public function update(ProfileUpdateRequest $request): RedirectResponse{

        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('admin.account.info');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse{

        $user = auth()->user();

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
