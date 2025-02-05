<?php 

// https://laravel.com/docs/11.x/localization

use Illuminate\Support\Facades\App;

function isLocalhost(){
    
    $myUrl = url('/');

    if(str_contains($myUrl,'localhost') || str_contains($myUrl,'192.168')){
        return true;
    }
    else{
        return false;
    }
}

// to avoid adding code to TelegramBotHandler.php in case it is change on any update
// vendor/monolog/monolog/src/Monolog/Handler/TelegramBotHandler.php
// method write
/*
change the default code for:
protected function write(LogRecord $record): void
    {
    $message = sendTelegramFromBotHandler();

    if(isset($message) && !empty($message)){
        $this->disableWebPagePreview(true);
        $this->send($message);
    }
}
*/

// to create random token to log in on the app
function getRandomToken(){
    $random = substr(time().'_'.str()->password(100,true,true,false),0,100);
    return $random;
}

function sendTelegramFromBotHandler($record){

    //https://gmblog.org/blog/how-to-use-telegram-for-storing-laravel-logs/    

    // do not send if localhost
    $logDetails = '';
    $url = '';
    if(isset($record['context']) && !empty($record['context'])){  

        $logDetails = print_r($record['context']['exception'],true);

        $split = explode('[trace:',$logDetails);

        $logDetailsInfo = $split[0];
        $logDetailsTrace = $split[1];
        
        // $split[0]
        /*
        [message:protected] => syntax error, unexpected token "try"
        [string:Error:private] => 
        [code:protected] => 0
        [file:protected] => /home/arlosmar/webs/protectoraxativa/app/Http/Controllers/Auth/AdminController.php
        [line:protected] => 48
        */

        preg_match('/\[message.*\n/',$logDetailsInfo,$matchesMessage);
        preg_match('/\[file.*\n/',$logDetailsInfo,$matchesFile);
        preg_match('/\[line.*\n/',$logDetailsInfo,$matchesLine);              

        $message = str_replace('[message:protected] => ','',$matchesMessage[0]);
        $file = str_replace('[file:protected] => ','',$matchesFile[0]);
        $path = str_replace('/public','',getcwd());
        $file = str_replace($path.'/','',$file);
        $line = trim(str_replace('[line:protected] =>','',$matchesLine[0]));
        $trace = str_replace(['Error:private] => Array','[previous:Error:private] =>'],'',$logDetailsTrace);            
        $traceSplit = explode(')',$trace);
        array_pop($traceSplit);
        $trace = implode(')',$traceSplit);
        $traceSubstr = '<pre>'.substr($trace,0,300).'</pre>';            
        $logDetailsFormatted = $traceSubstr;
        
        $url = '* File: '.$file.'* Line: '.$line;
    }

    $log = $record['message'];

    $user = auth()->user();

    $device = (array)json_decode(getCookieValue('device'));

    $date = $record['datetime']->format('Y-m-d H:i:s');

    $message = formatTelegramMessage($date,'Laravel',$url,$user,$device,$log,$logDetailsFormatted,true);

    if(isset($message) && !empty($message)){
        return $message;
    }
    else{
        return '';
    }
}

function formatTelegramMessage($date = '', $from = '',$url = '',$user = null,$device = '',$log = '',$details = '', $filter = false){

    // if filter, filter messages. we do not filter all here because if react
    // it makes no sense to call the server to filter. we can filter in advance and avoid a call
    if(isset($filter) && !empty($filter)){

        if(
            (strpos($log,'could not be found') !== false) ||
            (strpos($log,'Vite manifest not found') !== false) ||
            (strpos($log,'Unable to locate file in Vite') !== false) ||
            (strpos($log,'Unable to preload CSS') !== false)
        ){
            return '';
        }
    }

    if(isset($date) && !empty($date)){
        $logDate = $date;
    }
    else{
        $logDate = gmdate('Y-m-d H:i:s');
    }
    
    $logUser = '';
    if(isset($user) && !empty($user)){
        $logUser = $user->id.'# '.$user->email;
    }

    $logDevice = '';
    if(isset($device) && !empty($device)){
        foreach($device as $deviceItem => $deviceValue){
            $logDevice .= '* '.$deviceItem.': '.$deviceValue.PHP_EOL;
        }
    }

    $info = '<b>[UTC]</b>'.PHP_EOL.$logDate.PHP_EOL.PHP_EOL.'<b>[FROM]</b>'.PHP_EOL.$from.PHP_EOL.PHP_EOL.'<b>[URL]</b>'.PHP_EOL.$url.PHP_EOL.PHP_EOL.'<b>[USER]</b>'.PHP_EOL.$logUser.PHP_EOL.PHP_EOL.'<b>[DEVICE]</b>'.PHP_EOL.$logDevice.PHP_EOL.'<b>[LOG]</b>'.PHP_EOL.$log;

    if(isset($details) && !empty($details)){
        $info .= PHP_EOL.PHP_EOL.'<b>[DETAILS]</b>'.PHP_EOL.$details;
    }

    return $info;
}

function sendTelegram($message){

    $messageString = print_r($message,true);
    $messageEncoded = urlencode($messageString);

    $botToken = env('TELEGRAM_API_KEY');
    $channel = env('TELEGRAM_CHANNEL');         

    $urlTelegram = 'https://api.telegram.org/bot'.$botToken.'/sendMessage?parse_mode=html&chat_id='.$channel.'&text='.$messageEncoded.'&disable_web_page_preview=true';
    
    $response = Http::get($urlTelegram);
}

function getCookieValue($name){

    if(isset($_COOKIE[$name])){
        return $_COOKIE[$name];
    }
    else{
        return '';
    }
}

function setCookieValue($name,$value){
    setcookie($name,$value,0,'/');
}

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
            // and update on user
            $cookieLanguage = getLanguageCookie();
        
            if(isset($cookieLanguage) && !empty($cookieLanguage)){
                $user->update(['language' => $cookieLanguage]);
            }
        }
    }

    return $language;
}

function getDarkModeCookie(){

    if(isset($_COOKIE['darkmode'])){
        if(!empty($_COOKIE['darkmode'])){
            return 1;
        }
        else{
            return 0;
        }
    }
    else{
        return null;
    }
}

function setDarkModeCookie($darkmode){
    setcookie('darkmode',$darkmode,0,'/');
}

function setUserDarkMode(){

    $user = auth()->user();

    if(isset($user['settings'])){

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
            // if user does not have darkmode setting, check if cookie
            // if cookie add it to the user settings
            $darkmode = getDarkModeCookie();

            if($darkmode !== null){
                $settings['darkmode'] = $darkmode;
                $settingsNew = json_encode($settings);
                $user->update(['settings' => $settingsNew]);
                return $darkmode;
            }
            else{
                return false;
            }
        }
    }
    else{
        // if user does not have darkmode setting, check if cookie
        // if cookie add it to the user settings
        $darkmode = getDarkModeCookie();

        if($darkmode !== null){
            $settings = [
                'darkmode' => $darkmode
            ];
            $settingsNew = json_encode($settings);
            $user->update(['settings' => $settingsNew]);
            return $darkmode;
        }
        else{
            return false;
        }
    }
}

function apiResponse($success,$status,$data = [],$language = null){

    // messages on api always in English unless indicated by parameter on the api call with language
    //app()->setLocale('en'); => en

    if(!isset($language) || empty($language)){
        $language = 'en';
    }

    $response = [
        'success' => $success,
        'status' => trans('api.'.$status,[],$language)
    ];

    if(isset($data) && !empty($data)){
        $response['data'] = $data;
    }

    return response()->json($response);
}