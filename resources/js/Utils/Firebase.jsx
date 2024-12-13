////////////////////////
// to use on a webapp to receive a message from firebase fcm
// instead of using pusher
/////////////////////////

//import { initializeApp } from "firebase/app";
//import { getMessaging } from "firebase/messaging";
//import { getToken } from "firebase/messaging";

/*
https://stackoverflow.com/questions/70709987/how-to-load-environment-variables-from-env-file-using-vite

f you are trying to access env vars outside your app source code (such as inside vite.config.js), then you have to use loadEnv(): [If you are trying to access env vars outside your app source code (such as inside vite.config.js), then you have to use loadEnv():]

import { defineConfig, loadEnv } from 'vite'; [import { defineConfig, loadEnv } from 'vite';] 

export default ({ mode }) => { [export default ({ mode }) => {] 
    // Load app-level env vars to node-level env vars. [// Load app-level env vars to node-level env vars.] 
    process.env = {...process.env, ...loadEnv(mode, process.cwd())}; [process.env = {...process.env, ...loadEnv(mode, process.cwd())};] 

    return defineConfig({ [return defineConfig({] 
      // To access env vars here use import.meta.env.VITE_TEST_VAR [// To access env vars here use import.meta.env.VITE_TEST_VAR] 
    }); [});] 
} [}] 
*/

/*
export const firebaseConfig = () => {

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_apiKey,
        authDomain: import.meta.env.VITE_FIREBASE_authDomain,
        projectId: import.meta.env.VITE_FIREBASE_projectId,
        storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
        messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
        appId: import.meta.env.VITE_FIREBASE_appId,
        measurementId: import.meta.env.VITE_FIREBASE_measurementId
    };

    return firebaseConfig;
}
export const config = () => {

    const config = firebaseConfig();
    const app = initializeApp(config);
    const messaging = getMessaging(app);

    return messaging;
}

const saveToken = async (messaging) => {
    try {
        const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_vapidKey });
        if(token){
            console.log('Token generated:', token);
            // Send this token to your server to store it for later use            
            //fetch('/save-token', {
            //    method: 'POST',
            //    headers: {
            //        'Content-Type': 'application/json',
            //    },
            //    body: JSON.stringify({ token }),
            //});
            axios.post(route('save.token'),{token:token})
            .then(function (response){            
            
            })
            .catch(function (error){            
                
            });

            return token;
        }
        else{
            //console.log('No registration token available.');
        }
    }
    catch (err) {
        //console.error('Error getting token:', err);
    }
};

export const getFirebaseToken = () => {
    
    const messaging = config();
    const granted = requestPermission(messaging); 

    if(granted){
        saveToken(messaging);
    }
}
*/