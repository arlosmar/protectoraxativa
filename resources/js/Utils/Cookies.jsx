// using localStorage
//import Cookies from 'universal-cookie';

export const getCookie = (name) => {
    //const cookies = new Cookies();
    //return cookies.get(name);
    return localStorage.getItem(name);
}

export const setCookie = (name,value) => {
    //const cookies = new Cookies();
    //cookies.set(name,value,{path: '/'});
    localStorage.setItem(name,value);
}

// use localStorage to keep value
export const getLanguage = () => {

    //const cookies = new Cookies();
    //return cookies.get('language');
    return localStorage.getItem("language");
}

export const setLanguage = (language) => {

    //const cookies = new Cookies();
    //cookies.set("language",language,{path: '/'});
    localStorage.setItem("language",language);

    // communicate with app
    if(window?.AndroidHandler?.language){                    
        window.AndroidHandler.language(language);                    
    }
}

export const setDarkMode = (darkmode, sendApp = true) => {

    var darkmodeInt = darkmode ? 1 : 0;

    //const cookies = new Cookies();
    //cookies.set("darkmode",darkmodeInt,{path: '/'});
    localStorage.setItem("darkmode",darkmodeInt);

    applyDarkModeClasses(darkmode);

    // send to android app
    if(sendApp && window?.AndroidHandler?.darkmode){                    
        window.AndroidHandler.darkmode(darkmode);
    }
}

export const getDarkMode = () => {

    //const cookies = new Cookies();
    //const darkmodeInt = cookies.get("darkmode");
    const darkmodeInt = localStorage.getItem("darkmode");

    if(darkmodeInt !== null && typeof darkmodeInt !== 'undefined'){
        
        if(parseInt(darkmodeInt) === 1){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

export const applyDarkModeClasses = (darkmode) => {

    if(darkmode){
        document.body.classList.add('darkmode');
        document.body.classList.remove('lightmode');
    }
    else{
        document.body.classList.add('lightmode');
        document.body.classList.remove('darkmode');
    }
}

export const applyDarkMode = (user = null) => {

    // if logged in, check user settings
    var darkmode = false;
    var useCookies = true;
    if(user && user?.settings){

        var settings = JSON.parse(user.settings);
        
        if(settings.hasOwnProperty('darkmode')){
            
            if(settings?.darkmode){
                darkmode = true;            
            }
            else{
                darkmode = false;
            }

            setDarkMode(darkmode);
            useCookies = false;
        }        
    }

    if(useCookies){
        // get from cookie
        darkmode = getDarkMode();

        applyDarkModeClasses(darkmode);

        // send to android app
        if(window?.AndroidHandler?.darkmode){
            window.AndroidHandler.darkmode(darkmode);
        }
    }

    return darkmode;
}