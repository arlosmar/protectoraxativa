<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\{Person,User};
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\EventUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\JsonResponse;

class PersonController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    public function getList(Request $request){

        try{

            $user = auth()->user();

            if(isset($user->admin) && !empty($user->admin)){

                $people = Person::with('animals','users')->orderBy('name','asc')->orderBy('surname','asc')->orderBy('name2','asc')->orderBy('surname2','asc')->get();

                // get foreign keys tables
                $options = [
                    'users' => User::where('admin',false)->orderBy('email','asc')->select('id','email','name')->get()
                ]; 

                return response()->json(['result' => true, 'people' => json_encode($people), 'options' => json_encode($options)]); 
            }

            return response()->json(['result' => false]);
        }
        catch(\Exception $e){
            return response()->json(['result' => false]);
        }
    }

    public function edit(Person $person, Request $request): JsonResponse{

        try{

            $user = auth()->user();

            if(isset($user->admin) && !empty($user->admin)){

                $requestAll = $request->all();

                if(isset($requestAll['data']) && !empty($requestAll['data'])){

                    $values = $requestAll['data'];

                    $info = [
                        'name' => isset($values['name']) ? $values['name'] : null,
                        'surname' => isset($values['surname']) ? $values['surname'] : null,
                        'dni' => isset($values['dni']) ? $values['dni'] : null,
                        'birthdate' => isset($values['birthdate']) ? $values['birthdate'].' 00:00:00' : null,
                        'email' => isset($values['email']) ? $values['email'] : null,
                        'phone' => isset($values['phone']) ? $values['phone'] : null,
                        'address' => isset($values['address']) ? $values['address'] : null,
                        'name2' => isset($values['name2']) ? $values['name2'] : null,
                        'surname2' => isset($values['surname2']) ? $values['surname2'] : null,
                        'dni2' => isset($values['dni2']) ? $values['dni2'] : null,
                        'birthdate2' => isset($values['birthdate2']) ? $values['birthdate2'].' 00:00:00' : null,
                        'email2' => isset($values['email2']) ? $values['email2'] : null,
                        'phone2' => isset($values['phone2']) ? $values['phone2'] : null,
                        'address2' => isset($values['address2']) ? $values['address2'] : null,
                        'description' => isset($values['description']) ? $values['description'] : null
                    ];

                    // edit
                    if(isset($requestAll['id']) && !empty($requestAll['id'])){    
                        $id = $requestAll['id'];
                        $person->update($info);                                                
                    }
                    else{
                        // create                    
                        $personCreate = Person::create($info);                    
                        $id = $personCreate->id;                        
                    }

                    // link users with people if changed
                    $newUsers = [];
                    $newIds = [];
                    if(isset($values['users_ids']) && !empty($values['users_ids'])){
                        
                        $newUsers = $values['users_ids'];
                        foreach($newUsers as $newUser){
                            $newIds[] = $newUser['value'];
                        }
                    }

                    $previousUsers = [];
                    $removeIds = [];
                    $addIds = [];
                    if(isset($values['users_items']) && !empty($values['users_items'])){
                        
                        $previousUsers = $values['users_items'];

                        // remove from previous values the new values. the repeated ones remain the same
                        // the rest of previous ones must be updated to null                        

                        foreach($previousUsers as $previousUser){

                            $prevId = $previousUser['value'];
                            if(!in_array($prevId,$newIds)){
                                $removeIds[] = $prevId;
                            }
                            else{
                                // remove from new ids to update
                                $key = array_search($prevId,$newIds);
                                unset($newIds[$key]);
                            }
                        }                        
                    }

                    if(isset($removeIds) && !empty($removeIds)){                        
                        User::whereIn('id',$removeIds)->update(['person_id' => null]);
                    }

                    if(isset($newIds) && !empty($newIds)){                        
                        User::whereIn('id',$newIds)->update(['person_id' => $id]);
                    }

                    return response()->json(['result' => true, 'id' => $id]);
                }
            }

            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
        catch(\Exception $e){
            //return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }

    public function delete(Person $person, Request $request): JsonResponse{

        try{

            $user = auth()->user();

            if(isset($user->admin) && !empty($user->admin)){
           
                // create                    
                $delete = $person->delete();
                return response()->json(['result' => true]);
            }

            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
        catch(\Exception $e){
            //return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }
}