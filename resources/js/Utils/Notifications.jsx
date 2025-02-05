import { getDeviceInfo } from '@/Utils/Device';
import { isLocalhost } from '@/Utils/Variables';
import { getLanguage } from "@/Utils/Cookies";

// to receive notifications
export const notificationsListeners = (user) => {

    // generic events
    Echo.channel('GenericChannel')
    .listen('GenericEvent',(e) =>{            
        sendNotification('generic',e?.notification?.title,e?.notification?.message,e?.notification?.url);
    });

    if(user){
        
        /*
        Echo.private('PrivateChannel.'+user?.id)
        .listen('PrivateEvent',(e) =>{                
            sendNotification(e?.message?.title,e?.message?.message);
        });
        */

        // in case we use $user->notify or any other notifications
        Echo.private('App.Models.User.'+user?.id)
        .notification((notification) => {window?.AndroidHandler?.print('a1');
            sendNotification('generic',notification?.title,notification?.message,notification?.url,user);
        });
    }
}

// https://udn.realityripple.com/docs/Web/API/ServiceWorkerRegistration/showNotification
//https://web.dev/articles/push-notifications-notification-behaviour?hl=es-419
export const sendNotification = (type,title,message,url,user=null) => {

    // type => generic

    /*
    const options = {
        body: message,
        icon: '/storage/logo.png'
    };
    new Notification(title,options);
    */

    const notificationConfig = {
        body: message,            
        icon: '/storage/logo.png',
        badge: '/storage/logo.png',
        //image: '/storage/logo.png',
        //vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: "General", // if different tags and you send several notificatios, it shows all, not overwrites
        lang: getLanguage(),
        data: {
            urlGeneric: route('home'), // to go by default
            url: url
            // url is the url for the notification itself, not the buttons
            //url: user ? route('admin.settings') : route('intranet.settings'),
            //url1: route('home')
            //url2 if 2 buttons and action on 2nd button is url2
        }/*,
        actions: [
            {
              action: 'url1',
              type: 'button',
              title: '👎 Settings',                  
              //icon: '/storage/logo.png'
            },                
            {                 
              action: 'no1',
              type: 'text',
              title: 'no lo sé',
              placeholder: 'Explicación',
            }
        ]*/
    };
    
    navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title,notificationConfig);
    });
}   

export const notificationsSupported = () => {

    if(
        'Notification' in window &&
        'serviceWorker' in navigator &&
        'PushManager' in window
    ){
        return true;
    }
    else{
        return false;
    }
}

// request notification permissions
export const requestPermission = async () => {

    // granted, denied, default (not set up)
    try {

        const notificationsAvailable = notificationsSupported();

        if(notificationsAvailable){

            // check if already requested
            const permission = Notification.permission;

            if(permission === 'default'){
                
                const result = await Notification.requestPermission().then(permission => {
                    
                    if(permission === 'granted'){
                        return true;
                    }
                    else{
                        // denied
                        if(permission === 'denied'){
                            //console.log('No permission for notifications');
                            return false;
                        }
                        else{
                            return null;
                        }
                    }
                });

                return result;         
            }   
            else{
                if(permission === 'granted'){                
                    return true;                     
                }
                else{
                    // denied
                    //if(permission === 'denied'){                      
                    return false;
                }                    
            }
        }
        else{
            return null;
        }
    }
    catch (err) {
        return null;
        //console.error('Error getting token:', err);
    }
};

export const checkPermission = () => {

    const notificationsAvailable = notificationsSupported();

    if(notificationsAvailable){

        const permission = Notification.permission;

        if(permission === 'granted'){
            return true;
        }
        else{
            if(permission === 'denied'){
                return false;
            }
            else{
                // default
                return null;
            }
        }
    }
    else{
        return null;
    }
}

export const sendTelegram = async (message,localhost = false,extraInfo = '') => {

    if(localhost || !isLocalhost()){

        if(
            !message.includes('Unable to preload CSS') &&
            !message.includes('Failed to fetch dynamically imported module') &&
            !message.includes('Importing a module script failed') &&
            !message.includes('The node to be removed is not a child of this node')
        ){

            const device = getDeviceInfo();

            const dataTelegram = {
                log: JSON.stringify(message),
                url: window.location.href,
                device: device
            };

            if(extraInfo.length > 0){
                dataTelegram.extraInfo = extraInfo;
            }
          
            await axios.post(route('log.telegram'),dataTelegram)
            .then(function (response){
            })
            .catch(function (error){
            });
        }
    }
}