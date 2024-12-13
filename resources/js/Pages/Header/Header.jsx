import BarBottom from '@/Pages/Header/BarBottom';
import { useState, lazy, Suspense, useEffect } from "react";
import { getCookie, setCookie } from "@/Utils/Cookies";
import { isApp, isAppOrWebApp } from "@/Utils/Device";

import { notificationsSupported, requestPermission, notificationsListeners } from '@/Utils/Notifications';

import { setLanguage } from "@/Utils/Cookies";
import { languages } from "@/Utils/Variables";
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';

// dynamic import. import only when rendered
// if uncomment last part, the import must remove the "default" word
// <Suspense fallback={<div>Loading...</div>}>

const BarTop = lazy(() => import("@/Pages/Header/BarTop"));//.then((module) => ({ default: module.BarTop })));
const Title = lazy(() => import("@/Pages/Header/Title"));
const Cookies = lazy(() => import("@/Components/Cookies"));
const LanguageModal = lazy(() => import("@/Modals/LanguageModal"));
const BannerInstallApp = lazy(() => import("@/Components/BannerInstallApp"));
const BannerNotifications = lazy(() => import("@/Components/BannerNotifications"));

export default function Header({user,t,from}){

    const { i18n } = useTranslation('global');

    const langs = languages();

    const [ showLanguage, setShowLanguage ] = useState(false);

    const changeLanguage = (event) => {
        setShowLanguage(true);
    };

    const [ lang, setLang ] = useState(i18n.language);

    const handleLanguage = (e) => {  

        e.preventDefault();

        setShowLanguage(false);
        
        const iso = e.currentTarget.id;

        i18n.changeLanguage(iso);        

        setLanguage(iso);
        setLang(iso);
        
         // update user language if logged in
        axios.put(route('language.update'),{language: iso})
        .then(function (response){            
            /*
            if(response.result){
                // success
            }
            else{
                // error
            }
            */
        })
        .catch(function (error){
            
        });     

        //put(route('language.update'));
        /*
        fetch(route('language.update'), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: 'a'
            })
        })
        .then(function (response) {
            
        })
        .catch(function (error) {
            
        });
        */  
    };

    const handleLogout = () => {
        window.location = route('logout.get');
    };

    const handleContact = () => {
        window.location = route('contact');
    };

    const handleWhatsapp = () => {
    	window.open('https://wa.me/34671870889','_blank');        
    };

	// is webview on app
	const [ isApplicationOrWebApp , setIsApplicationOrWebApp ] = useState(isAppOrWebApp());

	// is app
	const [ isApplication , setIsApplication ] = useState(isApp());

	const [ installAppClosed, setInstallAppClosed ] = useState(getCookie('app-closed'));	
	const [ notificationsAvailable, setNotificationsAvailable ] = useState(notificationsSupported());
	const [ openNotifications, setOpenNotifications ] = useState(false);	
	const [ notificationsClosed, setNotificationsClosed ] = useState(!notificationsAvailable ? true : getCookie('notifications-closed'));

	const handlePermissions = async (event) => {

		var requestPerm = await requestPermission();

		// if true or false, it means the user answered the popup. if null, not or it did not appear		
		if(requestPerm !== null){
					
			// save cookie to remove banner
			setCookie('notifications-closed',true);
			setOpenNotifications(false);

			// if on admin/settings or intranet/settings refresh the page to see the switches updated
			var url = window.location.href;
			if(url.includes('admin/settings') || url.includes('intranet/settings')){
				window.location.reload();
            }            
		}
		else{
					
			if(!openNotifications){
				// if popup but the user did not answer, show the banner
	        	setTimeout(()=>{
	       			setOpenNotifications(true);
	     		}, 500);
	        }
	    }
	}

    const trigger = useScrollTrigger({
        target: window ? window : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleTop = (e) => {  
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const [ appInstalled, setAppInstalled ] = useState(false);
    
    //https://web.dev/articles/get-installed-related-apps?hl=es-419
    const checkAppInstalled = async () => {
        
        const relatedApps = await navigator.getInstalledRelatedApps();    

        if(relatedApps && relatedApps.length > 0){
            setAppInstalled(true);   

            /*
            relatedApps.forEach((app) => {            
            	alert(app.id+app.platform+app.url);            
        	});
        	*/        	
        }
    }

    // notifications
	useEffect(() => {

		// ask about notifications if not user because if not they won't receive generic notifications
		if(!notificationsClosed){
			handlePermissions();			
		}

		// listeners for the events if not app
		if(!isApplication){   
        	notificationsListeners(user);
        }

        if(!isApplication){
        	checkAppInstalled();
        }
    },[]);


    /*
		            {
                appInstalled ?
                <a href='spax://protectoraxativa.org/animals'>APP</a>
                :
                <a href='https://protectoraxativa.org/animals'>WEB</a>
            }
    */

	return (
		<>
		{
			showLanguage &&
			<Suspense>
				<LanguageModal           
		            show={showLanguage}
		            setShow={setShowLanguage}
		            language={lang}
		            languages={langs}
		            handleLanguage={handleLanguage}
		        />
		    </Suspense>
		}
		{
			!isApplicationOrWebApp &&
			<>
			<Suspense>
				<Title t={t} from={from}/>
			</Suspense>
			<Suspense>
				<Cookies t={t}/>		
			</Suspense>
			<Suspense>
				<BarTop 
					user={user} 
					t={t} 
					from={from} 
					changeLanguage={changeLanguage}
					handleLogout={handleLogout}
					handleContact={handleContact}
				/>
			</Suspense>
			{
				(!isApplication && !installAppClosed && !appInstalled) ?
					<Suspense>
						<BannerInstallApp t={t}/>
					</Suspense>
				:
					''
			}
			{
	            !notificationsClosed ?
	                <Suspense>
	                    <BannerNotifications 
	                    	t={t}
	                    	open={openNotifications}
	                    	setOpen={setOpenNotifications}
	                    	handlePermissions={handlePermissions}
	                    />
	                </Suspense>
	            :
	                ''
	        }
	        </>
	    }
		<BarBottom 
			user={user}
			t={t} 
			from={from} 
			changeLanguage={changeLanguage}
			handleLogout={handleLogout}
			handleContact={handleContact}
			handleWhatsapp={handleWhatsapp}
		/>
		<Fade in={trigger}>
            <Box
                onClick={handleTop}
                role="presentation"
                sx={{ position: 'fixed', bottom: 80, right: 16, zIndex: 100 }}
            >
                <Fab size="small" sx={{color:'#FF8C00', bgcolor:'white'}}>
                    <KeyboardArrowUpIcon/>
                </Fab>
            </Box>
        </Fade>
		</>
	)
}