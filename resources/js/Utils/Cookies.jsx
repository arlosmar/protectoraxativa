import Cookies from 'universal-cookie';

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