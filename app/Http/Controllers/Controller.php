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
	
	// transform database dates
    public function datesStringsToDatabase(){

    	$animals = Animal::all();

    	$datesFields = ['birthdate','deathdate','date_entry','date_exit','date_entry2','date_exit2'];
    	$months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre',
    	'noviembre','diciembre'];
    	foreach($animals as $animal){

    		$update = [];

    		foreach($datesFields as $datesField){
    			
    			$date_text = $animal[$datesField.'_text'];
    			
    			if(isset($date_text) && !empty($date_text)){

    				$explode = explode('/',$date_text);
    				// DD/MM/YYYY
    				if(count($explode) === 3){
    					$date = $explode[2].'-'.$explode[1].'-'.$explode[0].' 00:00:00';
    				}
    				else{
    					$explode = explode('-',$date_text);
	    				// DD-MM-YYYY
	    				// febrero 2012-03-17	    				
	    				if(count($explode) === 3){

	    					$explode2 = explode(' ',$date_text);

	    					// febrero 2012-03-17
	    					if(count($explode2) === 2){
	    						$date = $explode2[1].' 00:00:00';	    						
	    					}
	    					else{
	    						// DD-MM-YYYY
	    						$date = $explode[2].'-'.$explode[1].'-'.$explode[0].' 00:00:00';
	    					}
	    				}
	    				else{
		    				foreach($months as $index => $month){

		    					if(stripos($date_text,$month) !== false){
			    					
			    					$year = str_ireplace($month.' ','',$date_text);
				    				$month = str_ireplace(' '.$year,'',$date_text);
				    				$monthNumber = str_pad($index+1,2,'0',STR_PAD_LEFT);

			    					if(isset($year) && !empty($year)){

			    						if(isset($monthNumber) && !empty($monthNumber)){
			    							$date = $year.'-'.$monthNumber.'-01 00:00:00';
			    						}
			    						else{
			    							$date = $year.'-01-01 00:00:00';
			    						}
			    					}
			    					else{
			    						$date = null;
			    					}

			    					break;	    					
			    				}
		    				}
		    			}
		    		}
    			}
    			else{
    				$date = null;
    			}

    			$update[$datesField] = $date;

    			//echo '<pre>'.print_r($datesField.'#'.$animal['id'].'#'.$date,true).'</pre>';
    		}

    		//echo '<pre>'.print_r($update,true).'</pre>';
    		$animal->update($update);  		
    	}
    }

    // transform database dates
    public function validateDatabaseDates(){

    	$animals = Animal::all();

    	$datesFields = ['birthdate','deathdate','date_entry','date_exit','date_entry2','date_exit2'];

    	$invalid = [];
    	$fix = [];
    	foreach($animals as $animal){    		

    		foreach($datesFields as $datesField){
    			
    			$date = $animal[$datesField];
    			$date_text = $animal[$datesField.'_text'];
    			
    			if(isset($date) && !empty($date)){

    				if(stripos($date,'Mayo ') !== false){
    					$date = str_ireplace('Mayo ','',$date);    					
    				
    				}    				
	    			if(stripos($date,'junio ') !== false){
	    				$date = str_ireplace('junio ','',$date);
	    			}

	    			if(stripos($date,'marzo ') !== false){
	    				$date = str_ireplace('marzo ','',$date);
	    			}

	    			// YYYY-MM-DD HH:MM:SS
	    			$explode = explode(' ',$date);

	    			//03 2022-02-01 00:00:00#03 febrero 2022 => 
	    			if(
	    				count($explode) === 3 &&
	    				strlen($explode[0]) === 2 &&
	    				strlen($explode[1]) === 10 &&
	    				strlen($explode[2]) === 8
	    			){	    				
	    				$explodeDate = explode('-',$explode[1]);
						$fixString = $animal['id'].'#'.$datesField.'#'.$explodeDate[0].'-'.$explodeDate[1].'-'.$explode[0].' '.$explode[2];
						$fix[] = $fixString;
						$invalid[] = $animal['id'].'#'.$datesField.'#'.$date.'#'.$date_text.' => '.$fixString;
	    			}
	    			else{

	    				if(count($explode) !== 2){

	    					$fixString = '';

	    					if(strpos($explode[1],'??') !== false){
								$replace = str_replace('??','',$explode[1]);
								$fixString = $animal['id'].'#'.$datesField.'#'.$explode[0].$replace.' '.$explode[2];
								$fix[] = $fixString;
							}
							else{
								if(empty($explode[0])){			
									$fixString = $animal['id'].'#'.$datesField.'#'.$explode[1].' '.$explode[2];
									$fix[] = $fixString;
								}
							}
	    					$invalid[] = $animal['id'].'#'.$datesField.'#'.$date.'#'.$date_text.' => '.$fixString;
	    				}
	    				else{
	    					$explode2 = explode('-',$explode[0]);
		    				
		    				if(count($explode2) !== 3){
								$invalid[] = $animal['id'].'#'.$datesField.'#'.$date.'#'.$date_text;
		    				}
		    				else{
		    					$explode3 = explode(':',$explode[1]);
		    				
			    				if(count($explode3) !== 3){
									$invalid[] = $animal['id'].'#'.$datesField.'#'.$date.'#'.$date_text;
		    					}
		    					else{
		    						if(
		    							strlen($explode2[0]) !== 4 ||
		    							strlen($explode2[1]) !== 2 ||
		    							strlen($explode2[2]) !== 2 ||
		    							strlen($explode3[0]) !== 2 ||
		    							strlen($explode3[1]) !== 2 ||
		    							strlen($explode3[2]) !== 2
		    						){

		    							$fixString = '';

		    							if(
		    								strlen($explode2[0]) === 2 &&
		    								strlen($explode2[1]) === 2 &&
		    								strlen($explode2[2]) === 4
		    							){
		    								$fixString = $animal['id'].'#'.$datesField.'#'.$explode2[2].'-'.$explode2[1].'-'.$explode2[0].' '.$explode3[0].':'.$explode3[1].':'.$explode3[2];
					    					$fix[] = $fixString;
		    							}
		    							else{
			    							if(
			    								strlen($explode2[2]) === 0
			    							){
			    								$fixString = $animal['id'].'#'.$datesField.'#'.$explode2[0].'-'.$explode2[1].'-'.'01'.' '.$explode3[0].':'.$explode3[1].':'.$explode3[2];
						    					$fix[] = $fixString;
			    							}		    							
			    							else{
				    							if(
				    								strlen($explode2[0]) !== 4 && 
				    								(
				    									strpos($explode2[0],'.') !== false
				    								)
				    							){
				    								$replace = str_replace(['.',' ??'],['',''],$explode2[0]);
				    								$fixString = $animal['id'].'#'.$datesField.'#'.$replace.'-'.$explode2[1].'-'.$explode2[2].' '.$explode3[0].':'.$explode3[1].':'.$explode3[2];
				    								$fix[] = $fixString;
				    							}
				    							else{
				    								if(strlen($explode2[1]) === 1){		    								
					    								$fixString = $animal['id'].'#'.$datesField.'#'.$explode2[0].'-0'.$explode2[1].'-'.$explode2[2].' '.$explode3[0].':'.$explode3[1].':'.$explode3[2];
					    								$fix[] = $fixString;
					    							}
					    							else{
						    								if(strlen($explode2[2]) === 1){		    								
						    								$fixString = $animal['id'].'#'.$datesField.'#'.$explode2[0].'-'.$explode2[1].'-0'.$explode2[2].' '.$explode3[0].':'.$explode3[1].':'.$explode3[2];
						    								$fix[] = $fixString;
						    							}
					    							}
				    							}
				    						}
				    					}

		    							$invalid[] = $animal['id'].'#'.$datesField.'#'.$date.'#'.$date_text.' => '.$fixString;
		    						}
		    					}
		    				}
			    		}
			    	}
		    	}
    		}
    	}

    	echo '<pre>'.print_r($invalid,true).'</pre>';
    	echo '<pre>'.print_r($fix,true).'</pre>';
    	die;
    	foreach($fix as $item){
    		
    		$explode = explode('#',$item);
    		$animal = Animal::find($explode[0]);
    		$update = [
    			$explode[1] => $explode[2]
    		];    		
    		$animal->update($update);
    	}
    }
    
    public function moveImages(){
    
    	$files = Storage::allFiles('images/fotos');
    
    	if(isset($files) && !empty($files)){
    		
    		foreach($files as $file){
    			
    			$explode = explode('/',$file);

    			$folder1 = $explode[0]; // images
    			$folder2 = $explode[1]; // fotos
    			$folderId = $explode[2]; // id
    			$image = $explode[3]; // pic

    			$split = explode('.',$image);
    			$extension = '';
    			$basename = $image;
    			$suffix = '_'.date('YmdHis');
    			$field = 'image';
    			$count = count($split);
    			if($count > 1){
    				$extension = $split[$count-1];
    				unset($split[$count-1]);
    				$basename = implode('.',$split);

    				switch($basename){

    					case 'a':
    						$suffix = '_1';
    						$field = 'image';
    						break;

    					case 'b':
    						$suffix = '_2';
    						$field = 'image2';
    						break;

    					case 'c':
    						$suffix = '_sponsored';
    						$field = 'image_sponsored';
    						break;

    					default:
    						$suffix = '_1';//.date('YmdHis');
    						$field = 'image';
    						break;
    				}
    			}

    			if($extension !== 'old'){

	    			$newName = 'animal_'.str_pad($folderId,7,'0',STR_PAD_LEFT).$suffix.'.'.$extension;

	    			Storage::copy($file,$folder1.'/fotosTest/'.$newName);

	    			$animal = Animal::where('code',$folderId);

	    			if(isset($animal) && !empty($animal)){
	    				$animal->update([$field => $newName]);
	    			}
	    		}
    		}
    	}
    }
    */
}