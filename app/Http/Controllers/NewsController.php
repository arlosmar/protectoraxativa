<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\{News,User};
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

// https://laravel.com/docs/11.x/pagination
class NewsController extends Controller{

    public function __construct(){
        parent::__construct();   
    }

    public function index(Request $request,$page = 1){

        $user = auth()->user();

        $imagesPaths = config('paths.images');

        $newsPerPage = env('NEWS_PER_PAGE',5);

        if(isset($page) && !empty($page)){
            if(!is_numeric($page) || $page < 1){
                $page = 1;
            }
        }
        else{
            $page = 1;
        }

        // check if initial news
        $initialNews = null;
        if(isset($request->view) && !empty($request->view)){
            
            $view = $request->view;

            $initialNews = News::find($view);

            if(isset($initialNews) && !empty($initialNews)){

                if(isset($initialNews['date']) && !empty($initialNews['date'])){
                    $rows = News::where('hidden',false)->where(
                        function ($query) use ($initialNews){
                            $query->where('date','>',$initialNews['date'])->orWhere(
                                function ($query) use ($initialNews){
                                    $query->where('date',$initialNews['date'])
                                    ->where('id','>',$initialNews['id']);
                                });
                        })->get();
                }
                else{
                    $rows = News::where('hidden',false)->where(
                        function ($query) use ($initialNews){
                            $query->whereNotNull('date')->orWhere(
                                function ($query) use ($initialNews) {
                                    $query->whereNull('date')
                                    ->where('id','>',$initialNews['id']);
                                });
                        })->get();                    
                }

                $posNews = count($rows)+1;

                $page = ceil($posNews/$newsPerPage);
            }
        }

        $news = $this->getNews('list',$newsPerPage,$page,true);

        // disable load more if no news or less than requested
        $disabled = false;
        if(!isset($news) || empty($news)){
            $disabled = true;
        }
        else{            
            $totalNews = $newsPerPage*$page;
            if(count($news) < $totalNews){
                $disabled = true;
            }
        }

        return Inertia::render('News/News',compact('user','imagesPaths','page','news','disabled','initialNews'));
    }

    public function getNews($from = 'list', $newsPerPage = 5, $page = 1, $fromBeginning = false){

        // list with load more
        if(!isset($from) || $from === 'list'){

            $newsSettings = News::where('hidden',false)->orderBy('date','desc')->orderBy('id','desc');

            // from element 1
            if(isset($fromBeginning) && !empty($fromBeginning)){
                $numItems = $newsPerPage*$page;
                //$news = News::where('hidden',false)->orderBy('date','desc')->orderBy('id','desc')->take($numItems)->get();
                $news = $newsSettings->take($numItems)->get();
            }
            else{
                // from X to Y

                $startAt = (($page-1)*$newsPerPage)+1;
                //$finishAt = $startAt+$newsPerPage-1;
                
                //$news = News::where('hidden',false)->orderBy('date','desc')->orderBy('id','desc')->skip($startAt-1)->take($newsPerPage)->get();
                //$news = News::orderBy('date','desc')->offset(1)->limit($newsPerPage)->get();
                $news = $newsSettings->skip($startAt-1)->take($newsPerPage)->get();
            }
        }
        else{

            // from user section
            $newsSettings = News::orderBy('date','desc')->orderBy('id','desc');
            $news = $newsSettings->with('user')->get();
        }

        return $news;
    }

    public function getList(Request $request){

        try{
            
            $page = $request->get('page');

            $newsPerPage = env('NEWS_PER_PAGE',5);

            $news = $this->getNews('list',$newsPerPage,$page,false);

            // disable load more if no news or less than requested
            $disabled = false;
            if(!isset($news) || empty($news)){
                $disabled = true;
            }
            else{            
                $totalNews = $newsPerPage;
                if(count($news) < $totalNews){
                    $disabled = true;
                }
            } 

            return response()->json(['result' => true, 'news' => json_encode($news), 'disabled' => $disabled]);
        }
        catch(\Exception $e){
            return response()->json(['result' => false]);
        }
    }

    public function getUserList(Request $request){

        try{

            $user = auth()->user();

            if(isset($user->admin) && !empty($user->admin)){

                $news = $this->getNews('userlist');

                // get foreign keys tables
                $options = [                                
                    'user_id' => User::all()->select('id','name','email')
                ]; 

                return response()->json(['result' => true, 'news' => json_encode($news), 'options' => json_encode($options)]); 
            }

            return response()->json(['result' => false]);
        }
        catch(\Exception $e){
            return response()->json(['result' => false]);
        }
    }

    // https://www.filestack.com/fileschool/react/react-file-upload/
    public function edit(News $news, Request $request): JsonResponse{

        try{

            $user = auth()->user();

            if(isset($user->admin) && !empty($user->admin)){

                $requestAll = $request->all();

                if(isset($requestAll['data']) && !empty($requestAll['data'])){

                    $values = $requestAll['data'];

                    $info = [                    
                        'hidden' => isset($values['hidden']) ? $values['hidden'] : 0,
                        'date' => isset($values['date_db']) ? $values['date_db'] : null,
                        'title' => isset($values['title']) ? $values['title'] : null,
                        'description' => isset($values['description']) ? $values['description'] : null,
                        'user_id' => isset($values['user_id']) ? $values['user_id'] : null
                    ];

                    // insert
                    /*
                    $edit = false;
                    if(!isset($requestAll['id']) || empty($requestAll['id'])){                
                        $newNews = News::create($info);
                    }
                    else{
                        // edit
                        $edit = true;
                        $newNews = $news;
                    }
                    */
                    $edit = false;
                    if(isset($requestAll['id']) && !empty($requestAll['id'])){
                        $edit = true;
                    }

                    // if created or updated, check images
                    //if(isset($newNews) && !empty($newNews)){

                        $images = [];
                        $delete = [];

                        $date = gmdate('Ymd_His');

                        $prefix = 'news_';                    
                        $newsFilePath = config('paths.files.news');

                        // images
                        $fields = [
                            'image'     => '1'
                        ];

                        foreach($fields as $field => $suffix){

                            // if new image
                            if(isset($values[$field.'_file']) && !empty($values[$field.'_file'])){
                            
                                $file = $values[$field.'_file'];
                                //$name = $file->getClientOriginalName();
                                $extension = $file->getClientOriginalExtension();
                                
                                $newName = $prefix.$date.'_'.str_pad($suffix,3,'0',STR_PAD_LEFT).'.'.$extension;
                                
                                $path = Storage::putFileAs($newsFilePath,$file,$newName);

                                if(isset($path) && !empty($path)){                            
                                    
                                    $images[$field] = $newName;

                                    // delete old one if any image there
                                    if(
                                        isset($edit) && !empty($edit) &&
                                        isset($news[$field]) && !empty($news[$field])
                                    ){
                                        $delete[] = $news[$field];
                                    }
                                }
                            }
                            else{
                                // check if current image removed
                                // or maybe there never was an image
                                if(!isset($values[$field]) || empty($values[$field])){
                                    
                                    $images[$field] = null;

                                    // delete old one if any image there
                                    if(
                                        isset($edit) && !empty($edit) &&
                                        isset($news[$field]) && !empty($news[$field])
                                    ){
                                        $delete[] = $news[$field];
                                    }
                                }
                            }
                        }

                        $newInfo = array_merge($info,$images);
                        if(isset($edit) && !empty($edit)){

                            // add images to info array and update the entire row
                            //$newInfo = array_merge($info,$images);
                            $updated = $news->update($newInfo);                        
                            $newsId = $news['id'];
                        }
                        else{
                            // update images on inserted animal
                            //$updated = $newNews->update($images);
                            $updated = News::create($newInfo);
                            $newsId = $updated['id'];
                        }

                        // if properly updated/created delete old images                    
                        if(isset($updated) && !empty($updated)){

                            foreach($delete as $deleteImage){

                                if(isset($deleteImage) && !empty($deleteImage)){
                                    Storage::delete($newsFilePath.$deleteImage);
                                }
                            }
                        }
                        else{
                            // if not updated, delete created images
                            foreach($images as $deleteImage){                            
                                Storage::delete($newsFilePath.$deleteImage);                            
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
                        
                        return response()->json([
                            'result' => true, 
                            'images' => $images, 
                            'id' => $newsId
                        ]);
                    //}
                }
            }
            
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
        catch(\Exception $e){
            //return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }

    public function delete(News $news, Request $request): JsonResponse{

        try{

            $user = auth()->user();

            if(isset($user->admin) && !empty($user->admin)){
           
                // delete                    
                $delete = $news->delete();
                return response()->json(['location' => 'armando']);
            }

            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
        catch(\Exception $e){
            //return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }

    public function upload(Request $request): JsonResponse{

        try{
            $user = auth()->user();

            if(isset($user->admin) && !empty($user->admin)){
                return response()->json(['result' => true, 'location' => trans('Error')]);
            }

            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
        catch(\Exception $e){
            //return response()->json(['result' => false, 'error' => print_r($e,true)]);
            return response()->json(['result' => false, 'error' => trans('Error')]);
        }
    }
}