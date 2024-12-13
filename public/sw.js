//https://github.com/mdn/dom-examples/blob/main/service-worker/simple-service-worker/sw.js
function clickNotification(event){	
	
	event.notification.close();
	
	// if no actions, it means we clicked on the notification itself, not a button
	var url = null;
    if(!event?.action) {
    	
    	if(event?.notification?.data?.url && event?.notification?.data?.url.length > 0){
        	url = event?.notification?.data?.url;
        }
        else{
        	url = event?.notification?.data?.urlGeneric;
        }
    }
    else{
    	switch(event.action) {
        
        	// if buttons
        	case 'url2':
        	case 'url1':
        		var url = event?.notification?.data[event.action];
        		break;
        }
    }
        	
    // if any url to open
    if(url && url.length > 0){	

    	// get root path
    	var split = url.split('/');
    	var rootPath = split[0];

    	var clientWithApp = null;

    	event.waitUntil(

	        clients.matchAll({type: 'window'}).then(windowClients => {
	            
	            // Check if there is already a window/tab open with the target URL
	            for(var i = 0; i < windowClients.length; i++){
	                
	                var client = windowClients[i];		                
	                
	                // If so, just focus it and open
	                if(client.url === url && 'focus' in client){
	                	client.navigate(url);
	                	client.focus();
	                    return;
	                }
	                else{
	                	if(!clientWithApp && client.url.includes(rootPath)){
	                		clientWithApp = client;
	                	}
	                }
	            }
	            
	            // If not but any window with the app, open on it
	            if(clientWithApp && 'focus' in clientWithApp){
	                clientWithApp.navigate(url);
	                clientWithApp.focus();		                
	                return;
	            }

	            // if not, then open the target URL in a new window/tab.
	            if(clients.openWindow){
	                return clients.openWindow(url);
	            }
	        })
	    );
    }

    // if reply action
    //const reply = event.reply;
}
//self.removeEventListener('notificationclick',clickNotification);
self.addEventListener('notificationclick',clickNotification);

////////////////////////
// to use on a webapp to receive a message from firebase fcm
// instead of using pusher
/////////////////////////

// https://medium.com/@theDeepakYadav/web-push-notification-with-firebase-cloud-messaging-313536815628
// File: firebase-messaging-sw.js
/*
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// Set Firebase configuration, once available
self.addEventListener('fetch', () => {
	
	try {
		const urlParams = new URLSearchParams(location.search);
		self.firebaseConfig = Object.fromEntries(urlParams);		
	}
	catch (err) {
		console.error('Failed to add event listener', err);
	}
});

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

// Initialize Firebase app
//firebase.initializeApp(JSON.parse(new URL(location).searchParams.get("firebaseConfig")));
firebase.initializeApp(self.firebaseConfig || defaultConfig);
let messaging;
try {
   messaging = firebase.messaging.isSupported() ? firebase.messaging() : null
}
catch (err) {
  	console.error('Failed to initialize Firebase Messaging', err);
}

// To dispaly background notifications
if (messaging) {
	try {
		messaging.onBackgroundMessage((payload) => {
			console.log('Received background message: ', payload);
			
			const notificationTitle = payload.notification.title;
			const notificationOptions = { 
				body: payload.notification.body,
				tag: notificationTitle, // tag is added to ovverride the notification with latest update
				icon: payload.notification?.image || data.image,
				data: {
					url: payload?.data?.openUrl,// This should contain the URL you want to open
				}
			}
			
			// Optional
			//This condition is added because notification triggers from firebase messaging console doesn't handle image by default.
			//collapseKey comes only when the notification is triggered from firebase messaging console and not from hitting fcm google api.			
			if (payload?.collapseKey && notification?.image) {
				self.registration.showNotification(notificationTitle, notificationOptions);
			} 
			else {
				// Skipping the event handling for notification
				return new Promise(function(resolve, reject) {});
			}
		});
	} 
	catch (err) {
		console.log(err);
	}
}
*/