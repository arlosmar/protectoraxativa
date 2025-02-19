<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LanguageUpdateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;
use App\Models\{Biometric};

use Illuminate\Http\Request;

class SettingsController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    public function authentication(Request $request) : JsonResponse {

        try{

            $user = auth()->user();

            if(isset($user) && !empty($user)){

                $values = $request->all();

                if(isset($values['device']) && !empty($values['device'])){

                    $device = $values['device'];

                    if(isset($values['authentication']) && !empty($values['authentication'])){
                                  
                        // already json format
                        $authentication = $values['authentication'];

                        $biometric = Biometric::updateOrCreate(
                            ['user_id' => $user->id, 'device' => $device],
                            ['authentication' => $authentication]
                        );
                    }
                    else{
                        // remove biometric if exists
                        Biometric::where('user_id',$user->id)->where('device',$device)->delete();
                    }

                    return response()->json(['result' => true]);
                }
            }             
        }
        catch(\Exception $e){    
            //return response()->json(['result' => false, 'message' => $e->getMessage()]);
        }

        return response()->json(['result' => false]);
    }

    public function update(Request $request) : JsonResponse{

        try{

            $user = auth()->user();

            if(isset($user) && !empty($user)){

                $values = $request->all();

                if(isset($values['settings']) && !empty($values['settings'])){
                                
                    $newSettings = $values['settings'];
                    $settings = (array)json_decode($user->settings);                    
        
                    foreach($newSettings as $setting => $value){
                        $settings[$setting] = $value;
                    }

                    $user->update(['settings' => json_encode($settings)]);

                    return response()->json(['result' => true, 'settings' => $settings]);
                }
            }             
        }
        catch(\Exception $e){
            return response()->json(['result' => false]);
        }

        return response()->json(['result' => false]);
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