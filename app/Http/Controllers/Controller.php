<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;

use Illuminate\Support\Facades\App;

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

}