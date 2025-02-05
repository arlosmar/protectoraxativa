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
import { applyDarkMode } from "@/Utils/Cookies";
const darkmode = applyDarkMode();

// save device info on cookie to have useful information
import { setDeviceInfo } from "@/Utils/Device";
setDeviceInfo();

// https://www.npmjs.com/package/react-error-boundary
//import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import Error from '@/Pages/Error';
import { sendTelegram } from '@/Utils/Notifications';

const logError = (error,info) => {    
    sendTelegram(error.message,false,info?.componentStack);
};

const fallback = ({error,resetErrorBoundary }) => {

    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    //const { t } = useTranslation('global');
    if(!window.location.href.includes('localhost')){
        return (
            <Error/>
        );
    }
}

const appName = import.meta.env.VITE_APP_NAME || '';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        
        const root = createRoot(el);

        root.render(
            <ErrorBoundary FallbackComponent={fallback} onError={logError}>
                <I18nextProvider i18n={i18n}>
                    <App {...props}/>
                </I18nextProvider>
            </ErrorBoundary>
        );
    },
    progress: {
        color: '#FF8C00',
    },
});
