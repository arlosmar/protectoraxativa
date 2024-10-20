<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;

use Illuminate\Support\Facades\App;

use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

use App\Models\{Animal};

class Controller extends BaseController{

	public function __construct(){
	
		// if cookie, get it
		$cookieLanguage = getLanguageCookie();
		
		if(isset($cookieLanguage) && !empty($cookieLanguage)){
			$language = $cookieLanguage;
			App::setLocale($cookieLanguage);
		}
		else{			
			// default language on config/app.php
		}
    }

    // work with files
    /*
    public function renameAnimalsFiles(){

    	$path = 'images/animals/';
    	
    	//$files = Storage::files('images/animals');
    	//echo '<pre>'.print_r($files,true).'</pre>';die;
    	$rows = Animal::all();
    	$fields = [
    		'image'	=> '_1',
    		'image2'	=> '_2'
    	];
    	foreach($rows as $row){

    		foreach($fields as $field => $suffix){

	    		if(isset($row[$field]) && !empty($row[$field])){
	    			$name = $row[$field];
	    			$split = explode('.',$name);

	    			$count = count($split);
	    			if(isset($split) && $count > 1){
	    				
	    				$extension = $split[$count-1];
	    				unset($split[$count-1]);
	    				$basename = implode('.',$split);
	    				$newName = 'animal_'.str_pad($row['id'],7,'0',STR_PAD_LEFT).$suffix.'.'.$extension;
	    				
	    				if(Storage::exists($path.$name)){
	    					$move = Storage::move($path.$name,$path.$newName);
	    					$row->update([$field => $newName]);
	    				}   				
	    			}
	    		}
	    	}
    	}
    }
	*/
}