import Cookies from 'universal-cookie';

export const getCookie = (name) => {
    const cookies = new Cookies();
    return cookies.get(name);
}

export const setCookie = (name,value) => {
    const cookies = new Cookies();
    cookies.set(name,value,{path: '/'});
}

export const getLanguage = () => {

    const cookies = new Cookies();

    return cookies.get('language');
}

export const setLanguage = (language) => {

    const cookies = new Cookies();

    //localStorage.setItem('language',language);
    cookies.set("language",language,{path: '/'});

    // communicate with app
    if(window?.AndroidHandler?.language){                    
        window.AndroidHandler.language(language);                    
    }
}

export const setDarkMode = (darkmode, sendApp = true) => {

    const cookies = new Cookies();

    cookies.set("darkmode",darkmode,{path: '/'});

    applyDarkModeClasses(darkmode);

    // send to android app
    if(sendApp && window?.AndroidHandler?.darkmode){                    
        window.AndroidHandler.darkmode(darkmode ? true : false);                    
    }
}

export const getDarkMode = () => {

    const cookies = new Cookies();

    const darkmode = cookies.get("darkmode");

    if(darkmode !== null && typeof darkmode !== 'undefined'){
        if(darkmode){
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

export const setAuthentication = (user,authentication) => {

    const cookies = new Cookies();
    
    // add user to know who is later
    const credential = {
        authentication: authentication,
        user: user?.id
    }; 

    // if saving in json it saves strange characters in cookies
    cookies.set("authentication",credential,{path: '/'});

    const credentialJson = JSON.stringify(authentication); 

    return credentialJson;
}

export const removeAuthentication = () => {
    const cookies = new Cookies();
    cookies.set("authentication",null,{path: '/'});
}

export const getAuthentication = () => {

    const cookies = new Cookies();

    const credential = cookies.get("authentication");

    if(credential){
        return {
            userId: credential?.user,
            authentication: credential?.authentication
        };
    }
    else{
        return {
            userId: null,
            authentication: null
        }
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
            window.AndroidHandler.darkmode(darkmode ? true : false);                    
        }
    }

    return darkmode;
}