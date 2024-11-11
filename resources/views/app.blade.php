<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Whatsapp/Telegram -->
        <title inertia>{{config('app.name', '')}}</title>
        <meta name="description" content="{{__('meta.description')}}">

        <meta property="og:title" content="{{config('app.name', '')}}"/>
        <meta property="og:description" content="{{__('meta.description')}}">
        <meta property="og:url" content="{{config('app.url', '')}}"/>
        <meta property="og:image" content="{{url('storage/logo.png')}}" />
        <meta property="og:type" content="website"/>
        <meta property="og:locale" content="{{str_replace('_', '-', app()->getLocale())}}"/>

        <link rel="icon" href="{{url('storage/favicon.ico')}}">

        <!-- pwa -->
        <link rel="manifest" href="{{url('storage/manifest.json')}}"/>

        <!-- Fonts -->
        <!--
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />        
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather&family=Montserrat&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        -->

        <!-- Scripts -->
        <!-- Google tag (gtag.js) -->
        <!--
        <script async src="https://www.googletagmanager.com/gtag/js?id="></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '');
        </script>
        -->
        <script>
            // when installing the pwa
            /*
            const registerServiceWorker = async () => {
    
                if ('serviceWorker' in navigator) {
                
                    try {
                        
                        const configValues = {
                            apiKey: '{{env('VITE_FIREBASE_apiKey','')}}',
                            authDomain: '{{env('VITE_FIREBASE_authDomain','')}}',
                            projectId: '{{env('VITE_FIREBASE_projectId','')}}',
                            storageBucket: '{{env('VITE_FIREBASE_storageBucket','')}}',
                            messagingSenderId: '{{env('VITE_FIREBASE_messagingSenderId','')}}',
                            appId: '{{env('VITE_FIREBASE_appId','')}}',
                            measurementId: '{{env('VITE_FIREBASE_measurementId','')}}'
                        };
                        
                        const firebaseConfig = encodeURIComponent(JSON.stringify(configValues));
                        
                        const swURL = '{{url('sw.js')}}'+'?firebaseConfig='+firebaseConfig;
                        
                        //const swURL = '{{url('sw.js')}}';
                        const registration = await navigator.serviceWorker.register(swURL,{scope: './',});
                  
                        if (registration.installing) {
                            console.log('Service worker installing');
                        } 
                        else if (registration.waiting) {
                            console.log('Service worker installed');
                        } 
                        else if (registration.active) {
                            console.log('Service worker active');
                        }
                    } 
                    catch (error) {
                        console.error(`Registration failed with ${error}`);
                    }
                }
            };
            registerServiceWorker();
            */
        </script>
        
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
