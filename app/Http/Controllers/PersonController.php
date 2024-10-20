<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\{Person};
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

            $people = Person::with('animals')->get();  

            return response()->json(['result' => true, 'people' => json_encode($people)]); 
        }
        catch(\Exception $e){
            return response()->json(['result' => false]);
        }
    }

    public function edit(Person $person, Request $request): JsonResponse{

        try{

            $requestAll = $request->all();

            if(isset($requestAll['data']) && !empty($requestAll['data'])){

                $values = $requestAll['data'];

                $info = [
                    'name' => $values['name'],
                    'surname' => $values['surname'],
                    'dni' => $values['dni'],
                    'birthdate' => $values['birthdate'],
                    'email' => $values['email'],
                    'phone' => $values['phone'],
                    'address' => $values['address'],
                    'name2' => $values['name2'],
                    'surname2' => $values['surname2'],
                    'dni2' => $values['dni2'],
                    'birthdate2' => $values['birthdate2'],
                    'email2' => $values['email2'],
                    'phone2' => $values['phone2'],
                    'address2' => $values['address2'],
                    'description' => $values['description']
                ];

                // edit
                if(isset($requestAll['id']) && !empty($requestAll['id'])){                    
                    $person->update($info);                            
                    return response()->json(['result' => true]);
                }
                else{
                    // create                    
                    $id = Person::create($info);
                    return response()->json(['result' => true]);
                }
            }
            else{
                return response()->json(['result' => false, 'error' => trans('Error')]);
            }
        }
        catch(\Exception $e){
            //return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }

    public function delete(Person $person, Request $request): JsonResponse{

        try{
           
            // create                    
            $delete = $person->delete();
            return response()->json(['result' => true]);
        }
        catch(\Exception $e){
            //return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }
}