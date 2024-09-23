import './bootstrap';
import '../css/app.css';

/*
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
*/

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// apply dark mode
import { getDarkMode } from "@/Utils/Cookies";
const darkmode = getDarkMode();
if(darkmode){
    document.body.classList.add('darkmode');
}
else{
    document.body.classList.add('lightmode');
}

const appName = import.meta.env.VITE_APP_NAME || '';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        
        const root = createRoot(el);

        root.render(
            <I18nextProvider i18n={i18n}>
                <App {...props} />
            </I18nextProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
