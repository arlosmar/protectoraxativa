<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LanguageUpdateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;

use Illuminate\Http\Request;

class SettingsController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    public function update(Request $request) : JsonResponse
    {

        try{

            $user = auth()->user();

            $values = $request->all();

            // update table users
            if(isset($user) && !empty($user)){            
                $settings = (array)json_decode($user->settings);
            }

            foreach($values as $setting => $value){
                $settings[$setting] = $value;
            }

            $user->update(['settings' => json_encode($settings)]);

            return response()->json(['result' => true]);
        }
        catch(\Exception $e){
            return response()->json(['result' => false]);
        }
    }

    public function languageUpdate(LanguageUpdateRequest $request) : JsonResponse
    {
        try{

            $user = auth()->user();

            $values = $request->validated();

            $language = $values['language'];

            // update table users
            if(isset($user) && !empty($user)){            
                $user->update(['language' => $language]);            
            }

            // update server language just in case we don't refresh the current page
            App::setLocale($language);

            return response()->json(['result' => true]);
        }
        catch(\Exception $e){
            return response()->json(['result' => false]);
        }
    }
}