import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getLanguage } from "@/Utils/Cookies";

import en from '../../lang/en.json'
import es from '../../lang/es.json'
import ca from '../../lang/ca.json'

const defaultLanguage = 'ca';
//var language = localStorage.getItem('language');
var language = getLanguage();

if(!language || language.length === 0){
    language = defaultLanguage;
    //localStorage.setItem('language',language);
    //cookies.set("language",language,{path: '/'}); NOT NECESSARY TO DO ALL THE TIME.
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        lng: language, // remove this line to start with english
        fallbackLng: defaultLanguage,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                global: en
            },
            es: {
                global: es
            },
            ca: {
                global: ca
            }
        }
    });

export default i18n;
