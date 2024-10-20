export const languages = () => {

    const languages = [
        { 'name' : 'Valencià', 'value' : 'ca'},
        { 'name' : 'Español', 'value' : 'es'},
        { 'name' : 'English', 'value' : 'en'}
    ];

    return languages;
}

// for carousel
export const itemsPerPageCarousel = () => {
    return 20;
}

// for list
export const itemsPerPageList = () => {
    return 20;
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