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
}

export const setDarkMode = (darkmode) => {

    const cookies = new Cookies();

    cookies.set("darkmode",darkmode,{path: '/'});

    applyDarkModeClasses(darkmode);
}

export const getDarkMode = () => {

    const cookies = new Cookies();

    const darkmode = cookies.get("darkmode");

    if(darkmode){
        return true;
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

export const applyDarkMode = (user) => {

    // if logged in, check user settings
    var useCookies = true;
    var darkmode = false;
    if(user && user?.settings && user.settings?.darkmode !== null){
        darkmode = user.settings?.darkmode ? user.settings?.darkmode : false;
        setDarkMode(darkmode);
        useCookies = false;
    }
    
    if(useCookies){
        // get from cookie
        var darkmode = getDarkMode();
    }

    applyDarkModeClasses(darkmode);

    return darkmode;
}