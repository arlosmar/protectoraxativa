<?php 

// https://laravel.com/docs/11.x/localization

use Illuminate\Support\Facades\App;

// browser language
//$language = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

function setLanguage(){
    
}

function getLanguageCookie(){       

    if(isset($_COOKIE['language']) && !empty($_COOKIE['language'])){
        return $_COOKIE['language'];
    }
    else{
        return false;
    }
}

function setLanguageCookie($language){
    setcookie('language',$language,0,'/');
}

function setUserLanguage(){

    $user = auth()->user();
    $language = false;

    if(isset($user) && !empty($user)){

        // if user language, set cookie
        if(isset($user->language) && !empty($user->language)){
            $language = $user->language;
            setLanguageCookie($user->language);
        }
        else{
            // if no language on user and cookie, set it
            $cookieLanguage = getLanguageCookie();
        
            if(isset($cookieLanguage) && !empty($cookieLanguage)){
                $user->update(['language' => $cookieLanguage]);
            }
        }
    }

    return $language;
}

function setDarkModeCookie($darkmode){
    setcookie('darkmode',$darkmode,0,'/');
}

function setUserDarkMode(){

    $user = auth()->user();

    $settings = (array)json_decode($user['settings']);

    if(isset($settings['darkmode'])){
        
        if(!empty($settings['darkmode'])){
            setDarkModeCookie(true);
        }
        else{
            setDarkModeCookie(false);
        }

        return $settings['darkmode'];
    }
    else{
        return false;
    }
}