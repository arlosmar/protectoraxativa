import { getCookie, setCookie } from '@/Utils/Cookies';

export const isLocalhost = () => {

    if(
        window.location.href.includes('localhost') ||
        window.location.href.includes('192.168')
    ){
        return true;
    }
    else{
        return false;
    }
}

export const languages = () => {

    const languages = [
        { 'name' : 'Valencià', 'value' : 'ca'},
        { 'name' : 'Español', 'value' : 'es'},
        { 'name' : 'English', 'value' : 'en'}
    ];

    return languages;
}

// for list
export const itemsPerPageListOptions = (origin) => {

    var options = [20,50,100];

    switch(origin){
        
        case 'user-animals':
        case 'user-people':
        case 'user-news':
            options = [20,50,100];
            break;
    }

    return options;
}

export const itemsPerPageList = (origin) => {

    var defaultItems = 20;
    var itemsPerPageList = defaultItems;
    
    switch(origin){
        
        case 'user-animals':
        case 'user-people':
        case 'user-news':
            defaultItems = 20;            
            break;
    }

    var itemsPerPageList = getCookie('itemsPerPageList-'+origin);
    if(!itemsPerPageList){
        itemsPerPageList = defaultItems;
        setCookie('itemsPerPageList-'+origin,itemsPerPageList);
    }

    return itemsPerPageList;
}

// get paramater
export const getParameter = (variable) => {

    const queryParameters = new URLSearchParams(window.location.search);
    const parameter = queryParameters.get(variable);

    if(parameter){
        return parameter;
    }
    else{
        return null;
    }
}