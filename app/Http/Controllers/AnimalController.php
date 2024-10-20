<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\{Animal,Status,Sponsor,Type,Age,Gender,Size,Breed,Person};
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\GroupUpdateRequest;
use Illuminate\Support\Facades\{Redirect};
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
use DB;

class AnimalController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    public function index(Request $request,$section = null,$subsection = null,$page = 1){

        if(isset($page) && !empty($page)){
            if(!is_numeric($page) || $page < 1){
                $page = 1;
            }
        }

        $user = auth()->user();

        $emails = [
            'email_colaboration' => config('mail.colaboration.address'),
            'email_volunteering' => config('mail.volunteering.address'),
            'email_adoptions' => config('mail.adoptions.address'),
            'email_info' => config('mail.info.address')
        ];

        $social = config('social.social');

        $forms = config('forms.forms');

        $apus = config('apu.apus');

        $images_path = env('PATH_ANIMALS', '');

        $prices = config('prices.prices');

        // we don't do initial load to avoid checking if section, subsection, etc. on the useEffect
        // and to load the GUI before the list
        //$animals = $this->getAnimals($section,$subsection); 

        return Inertia::render('Animals/Animals',compact('user','section','subsection','emails','social',
        'apus','images_path','page','forms','prices'));
    }

    public function getAnimals($section,$subsection){

        $animals = [];
        
        if(isset($section) && !empty($section)){

            switch($section){

                // when on user profile
                case 'all':
                    $animals = Animal::with('status','sponsor','type','age','gender','size','breed','person','person.animals')->get();
                    break;

                case 'adopt':

                    if(isset($subsection) && !empty($subsection)){

                        switch($subsection){

                            case 'animals':
                                $animals = Animal::where('status_id','1')->orWhereNull('status_id')->orWhere('status_id', '=', '')->with('status','sponsor','type','age','gender','size','breed','person')->get();
                                break;

                            case 'adopted':
                                $animals = Animal::where('status_id','2')->with('status','sponsor','type','age','gender','size','breed','person')->get();
                                break;
                        }
                    }
                    break;

                case 'sponsor':
                    if(isset($subsection) && !empty($subsection)){

                        switch($subsection){

                            case 'animals':
                                $animals = Animal::where('status_id','1')->where('sponsor_id','3')->with('status','sponsor','type','age','gender','size','breed','person')->get();
                                break;

                            case 'sponsored':
                                $animals = Animal::where('status_id','1')->where('sponsor_id','2')->with('status','sponsor','type','age','gender','size','breed','person')->get();
                                break;
                        }
                    }
                    break;

                case 'heaven':
                    $animals = Animal::where('status_id','3')->with('status','sponsor','type','age','gender','size','breed','person')->get();                    
                    break;
            }
        }

        return $animals;
    }

    public function getList(Request $request){

        try{
            
            $section = $request->get('section');
            $subsection = $request->get('subsection');

            $animals = $this->getAnimals($section,$subsection);  

            // get foreign keys tables
            $options = [                
                'status_id' => Status::all()->select('id','name'),
                'sponsor_id' => Sponsor::all()->select('id','name'),
                'type_id' => Type::all()->select('id','name'),
                'age_id' => Age::all()->select('id','name'),
                'gender_id' => Gender::all()->select('id','name'),
                'size_id' => Size::all()->select('id','name'),
                'breed_id' => Breed::select('id',DB::raw('description as name'))->get(),
                //'person_id' => Person::select('id',DB::raw("concat(name,' ',surname,case when name2 = '' then '' else concat(' / ',name2,' ',surname2) end) as name"))->get()
                'person_id' => Person::all()
            ]; 

            return response()->json(['result' => true, 'animals' => json_encode($animals), 'options' => json_encode($options)]); 
        }
        catch(\Exception $e){
            return response()->json(['result' => false]);
        }
    }

    // https://www.filestack.com/fileschool/react/react-file-upload/
    public function edit(Animal $animal, Request $request): JsonResponse{

        try{

            $requestAll = $request->all();

            if(isset($requestAll['data']) && !empty($requestAll['data'])){

                $values = $requestAll['data'];

                $info = [
                    'code' => isset($values['code']) ? $values['code'] : null,
                    'status_id' => isset($values['status_id']) ? $values['status_id'] : null,    
                    'sponsor_id' => isset($values['sponsor_id']) ? $values['sponsor_id'] : null,
                    'type_id' => isset($values['type_id']) ? $values['type_id'] : null,
                    'age_id' => isset($values['age_id']) ? $values['age_id'] : null,
                    'gender_id' => isset($values['gender_id']) ? $values['gender_id'] : null, 
                    'size_id' => isset($values['size_id']) ? $values['size_id'] : null,
                    'breed_id' => isset($values['breed_id']) ? $values['breed_id'] : null,
                    'name' => isset($values['name']) ? $values['name'] : null,
                    'weight' => isset($values['weight']) ? $values['weight'] : null,
                    'birthdate' => isset($values['birthdate']) ? $values['birthdate'] : null,
                    'deathdate' => isset($values['deathdate']) ? $values['deathdate'] : null,
                    'description' => isset($values['description']) ? $values['description'] : null,
                    'location' => isset($values['location']) ? $values['location'] : null,
                    'video' => isset($values['video']) ? $values['video'] : null,
                    'video2' => isset($values['video2']) ? $values['video2'] : null,
                    'person_id' => isset($values['person_id']) ? $values['person_id'] : null
                ];

                // insert
                $edit = false;
                if(!isset($requestAll['id']) || empty($requestAll['id'])){
                    $newAnimal = Animal::create($info);
                }
                else{
                    // edit
                    $edit = true;
                    $newAnimal = $animal;
                }

                // if created or updated, check images
                if(isset($newAnimal) && !empty($newAnimal)){

                    $images = [];
                    $delete = [];

                    $date = gmdate('YmdHis');

                    // images
                    $fields = [
                        'image'     => '1',
                        'image2'    => '2'
                    ];

                    foreach($fields as $field => $suffix){

                        // if new image
                        if(isset($values[$field.'_file']) && !empty($values[$field.'_file'])){
                        
                            $file = $values[$field.'_file'];
                            //$name = $file->getClientOriginalName();
                            $extension = $file->getClientOriginalExtension();
                            
                            $newName = 'animal_'.str_pad($newAnimal['id'],7,'0',STR_PAD_LEFT).'_'.$suffix.'_'.$date.'.'.$extension;
                            
                            $path = Storage::putFileAs('images/animals/',$file,$newName);

                            if(isset($path) && !empty($path)){                            
                                
                                $images[$field] = $newName;

                                // delete old one if any image there
                                if(isset($newAnimal[$field]) && !empty($newAnimal[$field])){
                                    $delete[] = $newAnimal[$field];
                                }
                            }
                        }
                        else{
                            // check if current image removed
                            // or maybe there never was an image
                            if(!isset($values[$field]) || empty($values[$field])){
                                
                                $images[$field] = null;

                                // delete old one if any image there
                                if(isset($newAnimal[$field]) && !empty($newAnimal[$field])){
                                    $delete[] = $newAnimal[$field];
                                }
                            }
                        }
                    }

                    if(isset($edit) && !empty($edit)){

                        // add images to info array and update the entire row
                        $newInfo = array_merge($info,$images);
                        $updated = $newAnimal->update($newInfo);
                    }
                    else{
                        // update images on inserted animal
                        $updated = $newAnimal->update($images);
                    }

                    // if properly updated delete old images                    
                    if(isset($updated) && !empty($updated)){

                        foreach($delete as $deleteImage){

                            if(isset($deleteImage) && !empty($deleteImage)){
                                Storage::delete('images/animals/'.$deleteImage);
                            }
                        }
                    }
                    else{
                        // if not updated, delete created images
                        foreach($images as $deleteImage){                            
                            Storage::delete('images/animals/'.$deleteImage);                            
                        }

                        // error updating
                        if(isset($edit) && !empty($edit)){
                            return response()->json(['result' => false, 'error' => trans('Error')]);
                        }
                        else{
                            // error updating the images but it was created
                            return response()->json(['result' => false, 'error' => trans('Error updating images')]);
                        }
                    }                 
                    
                    return response()->json(['result' => true, 'images' => $images]);
                }
            }
            
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
        catch(\Exception $e){
            return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }

    public function delete(Animal $animal, Request $request): JsonResponse{

        try{
           
            // create                    
            $delete = $animal->delete();
            return response()->json(['result' => true]);
        }
        catch(\Exception $e){
            //return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }
}