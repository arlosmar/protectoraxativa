<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\API\TokenRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\{News};

class APIController extends Controller
{

    public function __construct(){
        
        parent::__construct();   
        
        // by default english. we set up here in case of validation errors
        // that we cannot control with apiResponse => TokenRequest
        //app()->setLocale('en');
    }
    
    public function token(TokenRequest $request){

        $language = null;
        if(isset($request->language) && !empty($request->language)){
            $language = $request->language;
        }

        if(!Auth::attempt($request->only('email','password'))){
            return apiResponse(true,'Unauthorized',[],$language);
            //return response()->json(['message' => 'Invalid login credentials'], 401);
        }

        $user = Auth::user();

        // https://laravel.com/docs/11.x/sanctum#token-expiration
        $token = $user->createToken('auth_token',['*'],now('UTC')->addMinutes(60))->plainTextToken;

        return apiResponse(true,'Authorized',[
            'access_token' => $token,
            'token_type' => 'Bearer'
            //'user' => $user,            
        ],$language);
    }

    public function news(Request $request){

        // if Bearer: token is valid, it gets the user
        $user = $request->user();

        $news = News::all();

        $language = null;
        if(isset($request->language) && !empty($request->language)){
            $language = $request->language;
        }

        return apiResponse(true,'Authorized',[
            'timestamp' => now('UTC')->format('Y-m-d H:i:s'),
            'items' => count($news),
            'news' => $news
        ],$language);
    }

    /*
    public function destroy(Request $request){

        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout successful']);
    }
    */
}
