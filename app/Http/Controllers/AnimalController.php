<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\{Animal,Status,Sponsor,Type,Age,Gender,Size,Breed,Person,User};
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
use DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Cache;

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

        $imagesPaths = config('paths.images');

        $prices = config('prices.prices');

        $guides = config('guides');

        $baseUrl = URL::to('/');

        $reloadAfterTime = config('variables.refresh.animals');

        $itemsPerPage = config('variables.animalsPerPage');

        // we don't do initial load to avoid checking if section, subsection, etc. on the useEffect
        // and to load the GUI before the list
        //$animals = $this->getAnimals($section,$subsection); 

        return Inertia::render('Animals/Animals',compact('user','section','subsection','emails','social',
            'baseUrl','imagesPaths','page','forms','prices','guides','reloadAfterTime','itemsPerPage'));
    }

    public function clearCache(){
        Cache::forget('animals_all');
        Cache::forget('animals_adopt_animals');
        Cache::forget('animals_adopt_adopted');
        Cache::forget('animals_sponsor_animals');
        Cache::forget('animals_sponsor_sponsored');
        Cache::forget('animals_heaven_external');
        Cache::forget('animals_heaven');
        Cache::forget('animals_hidden');
    }

    public function getAnimals($section,$subsection){

        $animals = [];
        $this->clearCache();
        if(isset($section) && !empty($section)){

            switch($section){

                // when on user profile
                case 'all':
                    //$animals = Animal::with('status','sponsor','type','age','gender','size','breed','person','person.animals')->orderBy('name','asc')->orderBy('code','asc')->get();
                    $animals = Cache::rememberForever('animals_all', function () {
                        return Animal::with('status','sponsor','type','age','gender','size','breed','person','person.animals')->orderBy('name','asc')->orderBy('code','asc')->get();
                    });
                    break;

                case 'adopt':

                    if(isset($subsection) && !empty($subsection)){

                        switch($subsection){

                            case 'animals':
                                /*$animals = Animal::where('hidden',false)->where('dead',false)->where(
                                function ($query) {
                                    $query->where('status_id','1')
                                    ->orWhereNull('status_id')
                                    ->orWhere('status_id', '=', '');
                                })->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                                */
                                $animals = Cache::rememberForever('animals_adopt_animals', function () {
                                    return Animal::where('hidden',false)->where('dead',false)->where(
                                        function ($query) {
                                            $query->where('status_id','1')
                                            ->orWhereNull('status_id')
                                            ->orWhere('status_id', '=', '');
                                        })->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                                });
                                break;

                            case 'adopted':
                                /*
                                $animals = Animal::where('hidden',false)->where('dead',false)->where('status_id','2')->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                                */
                                $animals = Cache::rememberForever('animals_adopt_adopted', function () {
                                    return Animal::where('hidden',false)->where('dead',false)->where('status_id','2')->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                                });
                                break;
                        }
                    }
                    break;

                case 'sponsor':
                    if(isset($subsection) && !empty($subsection)){

                        switch($subsection){

                            case 'animals':
                                /*
                                $animals = Animal::where('hidden',false)->where('dead',false)->where(
                                function ($query) {
                                    $query->where('status_id','1')
                                    ->orWhereNull('status_id')
                                    ->orWhere('status_id', '=', '');
                                })->where('sponsor_id','3')->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                                */
                                $animals = Cache::rememberForever('animals_sponsor_animals', function () {
                                    return Animal::where('hidden',false)->where('dead',false)->where(
                                        function ($query) {
                                            $query->where('status_id','1')
                                            ->orWhereNull('status_id')
                                            ->orWhere('status_id', '=', '');
                                        })->where('sponsor_id','3')->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                                        });
                                break;

                            case 'sponsored':
                                /*
                                $animals = Animal::where('hidden',false)->where('dead',false)->where(
                                function ($query) {
                                    $query->where('status_id','1')
                                    ->orWhereNull('status_id')
                                    ->orWhere('status_id', '=', '');
                                })->where('sponsor_id','2')->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                                */
                                $animals = Cache::rememberForever('animals_sponsor_sponsored', function () {
                                    return Animal::where('hidden',false)->where('dead',false)->where(
                                        function ($query) {
                                            $query->where('status_id','1')
                                            ->orWhereNull('status_id')
                                            ->orWhere('status_id', '=', '');
                                        })->where('sponsor_id','2')->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                                        });
                                break;
                        }
                    }
                    break;

                case 'heaven':

                    // if public, show dead with hidden false. the external animals
                    if(isset($subsection) && $subsection === 'animals'){
                        //$animals = Animal::where('dead',true)->where('hidden',false)->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                        $animals = Cache::rememberForever('animals_heaven_external', function () {
                            return Animal::where('dead',true)->where('hidden',false)->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                        });
                    }
                    else{
                        // for internal use: if dead it goes to heaven even if hidden
                        //$animals = Animal::/*where('hidden',false)->*/where('dead',true)->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                        $animals = Cache::rememberForever('animals_heaven', function () {
                            return Animal::/*where('hidden',false)->*/where('dead',true)->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();
                        });
                    }
                    break;

                case 'hidden':
                    // if dead it goes to heaven even if hidden
                    //$animals = Animal::where('hidden',true)->where('dead',false)->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();                    
                    $animals = Cache::rememberForever('animals_hidden', function () {
                        return Animal::where('hidden',true)->where('dead',false)->with('status','sponsor','type','age','gender','size','breed','person')->orderBy('name','asc')->orderBy('code','asc')->get();        
                    });
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
                    'hidden' => isset($values['hidden']) ? $values['hidden'] : 0,
                    'status_id' => isset($values['status_id']) ? $values['status_id'] : null,    
                    'sponsor_id' => isset($values['sponsor_id']) ? $values['sponsor_id'] : null,
                    'type_id' => isset($values['type_id']) ? $values['type_id'] : null,
                    'age_id' => isset($values['age_id']) ? $values['age_id'] : null,
                    'gender_id' => isset($values['gender_id']) ? $values['gender_id'] : null, 
                    'size_id' => isset($values['size_id']) ? $values['size_id'] : null,
                    'breed_id' => isset($values['breed_id']) ? $values['breed_id'] : null,
                    'name' => isset($values['name']) ? $values['name'] : null,
                    'weight' => isset($values['weight']) ? $values['weight'] : null,
                    'birthdate' => isset($values['birthdate']) ? $values['birthdate'].' 00:00:00' : null,
                    'dead' => isset($values['dead']) ? $values['dead'] : 0,
                    'deathdate' => isset($values['dead']) && !empty($values['dead']) && isset($values['deathdate']) ? $values['deathdate'].' 00:00:00' : null,
                    'description' => isset($values['description']) ? $values['description'] : null,
                    'location' => isset($values['location']) ? $values['location'] : null,
                    'video' => isset($values['video']) ? $values['video'] : null,
                    'video2' => isset($values['video2']) ? $values['video2'] : null,
                    'person_id' => isset($values['person_id']) ? $values['person_id'] : null,
                    'vaccines' => isset($values['vaccines']) ? $values['vaccines'] : null,
                    'treatment' => isset($values['treatment']) ? $values['treatment'] : null,
                    'castrated' => isset($values['castrated']) ? $values['castrated'] : 0,
                    'date_entry' => isset($values['date_entry']) ? $values['date_entry'].' 00:00:00' : null,
                    'date_exit' => isset($values['date_exit']) ? $values['date_exit'].' 00:00:00' : null,
                    'date_entry2' => isset($values['date_entry2']) ? $values['date_entry2'].' 00:00:00' : null,
                    'date_exit2' => isset($values['date_exit2']) ? $values['date_exit2'].' 00:00:00' : null,
                    'internal' => isset($values['internal']) ? $values['internal'] : null
                ];

                // if external animal (dead and not hidden)
                $isExternal = false;
                if(
                    (isset($newAnimal['dead']) && !empty($newAnimal['dead'])) &&
                    (!isset($newAnimal['hidden']) || empty($newAnimal['hidden']))
                ){ 
                    $isExternal = true;
                }

                // insert
                $edit = false;
                if(!isset($requestAll['id']) || empty($requestAll['id'])){
                    
                    // if creating, get the following code if not external
                    if(!isset($isExternal) || empty($isExternal)){
                        $maxCode = Animal::max('code');
                        $info['code'] = $maxCode+1;
                    }
                
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

                    // if external animal (dead and not hidden)
                    if(isset($isExternal) && !empty($isExternal)){                    
                        $prefix = 'animal_external_';
                        $animalFileId = $newAnimal['id'];
                        $animalFilePath = config('paths.files.animals_external');
                    }
                    else{
                        $prefix = 'animal_';
                        //$animalFileId = $newAnimal['code'];
                        $animalFileId = $newAnimal['id'];
                        $animalFilePath = config('paths.files.animals');
                    }

                    // images
                    $fields = [
                        'image'     => '1',
                        'image2'    => '2',
                        'image_sponsored'   => 'sponsored'
                    ];

                    foreach($fields as $field => $suffix){

                        // if new image
                        if(isset($values[$field.'_file']) && !empty($values[$field.'_file'])){
                        
                            $file = $values[$field.'_file'];
                            //$name = $file->getClientOriginalName();
                            $extension = $file->getClientOriginalExtension();
                            
                            $newName = $prefix.str_pad($animalFileId,7,'0',STR_PAD_LEFT).'_'.$suffix.'_'.$date.'.'.$extension;
                            
                            $path = Storage::putFileAs($animalFilePath,$file,$newName);

                            if(isset($path) && !empty($path)){                            
                                
                                $images[$field] = $newName;

                                // delete old one if any image there
                                if(isset($newAnimal[$field]) && !empty($newAnimal[$field])){
                                    $delete[] = $newAnimal[$field];
                                }
                            }
                            else{
                                return response()->json(['result' => false, 'error' => trans('errors.animal.images.updating')]);
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

                    $this->clearCache();

                    // if properly updated delete old images                    
                    if(isset($updated) && !empty($updated)){

                        foreach($delete as $deleteImage){

                            if(isset($deleteImage) && !empty($deleteImage)){
                                Storage::delete($animalFilePath.$deleteImage);
                            }
                        }
                    }
                    else{
                        // if not updated, delete created images
                        foreach($images as $deleteImage){                            
                            Storage::delete($animalFilePath.$deleteImage);                            
                        }

                        // error updating
                        if(isset($edit) && !empty($edit)){
                            return response()->json(['result' => false, 'error' => trans('Error')]);
                        }
                        else{
                            // error updating the images but it was created
                            return response()->json(['result' => false, 'error' => trans('errors.animal.images.updating')]);
                        }
                    }

                    // check if send notification when inserting/editing animals
                    $sent = $this->sendNotificationAnimals($edit,$updated);
                    
                    return response()->json([
                        'result' => true, 
                        'images' => $images, 
                        'id' => $newAnimal['id'],
                        'code' => $newAnimal['code'],
                        'updated_at' => $newAnimal['updated_at']
                    ]);
                }
            }
        }
        catch(\Exception $e){
            //return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }

    public function sendNotificationAnimals($edit,$newAnimal){

        try{
            $sent = false;
            
            if(isset($edit) && !empty($edit)){
                // updating
                $sendNotifications = config('notifications.send.update');
            }
            else{
                // creating
                $sendNotifications = config('notifications.send.insert');
            }

            if(in_array('animals',$sendNotifications)){

                // only for animals to be adopted/sponsored
                if(
                    (!isset($newAnimal['hidden']) || empty($newAnimal['hidden'])) &&
                    (!isset($newAnimal['dead']) || empty($newAnimal['dead'])) &&
                    (
                        !isset($newAnimal['status_id']) || 
                        empty($newAnimal['status_id']) || 
                        $newAnimal['status_id'] === 1
                    ) &&
                    (
                        !isset($newAnimal['sponsor_id']) || 
                        empty($newAnimal['sponsor_id']) ||
                        $newAnimal['sponsor_id'] !== 2
                    )
                ){

                    $categories = $this->getNotifications(false,true);
                    $type = 2; // animals
                    $channel = isset($categories[$type]) ? $categories[$type] : 'General';

                    $notification = [
                        'title' => trans('notifications.insert.animals.title'),
                        'message' => trans('notifications.insert.animals.message'),
                        'type' => $type,
                        'channel' => $channel
                    ];

                    if(isset($newAnimal['name']) && !empty($newAnimal['name'])){
                        $notification['title'] .= ' "'.$newAnimal['name'].'"';
                    }

                    // to adopt
                    if(
                        !isset($newAnimal['sponsor_id']) || 
                        empty($newAnimal['sponsor_id']) ||
                        $newAnimal['sponsor_id'] === 1
                    ){
                        $tag = 'adopt';
                        $subtag = 'animals';
                    }
                    else{
                        // to sponsor
                        $tag = 'sponsor';
                        $subtag = 'animals';
                    }

                    $url = route('animals',[$tag,$subtag]).'?view='.$newAnimal['id'];
                    $notification['url'] = $url;

                    $users = User::where('admin',false)->get();

                    $sent = $this->sendNotificationFromArray($notification,$users);
                }
            }
        }
        catch(\Exception $e){

        }

        return $sent;
    }

    public function delete(Animal $animal, Request $request): JsonResponse{

        try{
            $delete = $animal->delete();
            $this->clearCache();
            return response()->json(['result' => true]);
        }
        catch(\Exception $e){
            //return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }

    /*
    public function upload(Request $request): JsonResponse{

        try{
            $date = gmdate('Ymd_His');

            $prefix = 'animal_';                    
            //$animalsFilePath = config('paths.files.animals');

            //$requestAll = $request->all();
            $file = $request->file;
            
            //$name = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            
            $newName = $prefix.$date.'.'.$extension;
            
            $path = Storage::putFileAs($animalsFilePath,$file,$newName);

            // for some strange reason $path adds //                
            $location = '/'.$animalsFilePath.$newName;

            if(isset($path) && !empty($path)){                            
                return response()->json(['result' => true, 'location' => $location]);    
            }
        }
        catch(\Exception $e){
            //return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }
    */
}