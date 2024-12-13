import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
//import InstallIcon from '@mui/icons-material/InstallMobile';
import InstallIcon from '@mui/icons-material/InstallDesktop';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import { installPWA, listenerPWA, removeListenerPWA } from "@/Utils/PWA";
import { /*getCookie,*/ setCookie } from "@/Utils/Cookies";

import { checkIsApple, checkIsAndroid } from '@/Utils/Device';
import PWAPrompt from 'react-ios-pwa-prompt';

// https://www.npmjs.com/package/react-ios-pwa-prompt
export default function BannerInstallApp({ t }){

    const [ isApple, setIsApple ] = useState(checkIsApple());
    const [ isAndroid, setIsAndroid ] = useState(checkIsAndroid());

    const [ installPrompt, setInstallPrompt ] = useState(null);

    // in IOS the listener does not work. so open always   
    // if is android open to install the app from the store  
    const [ open, setOpen ] = useState(isApple || isAndroid ? true : false);
    const [ openInstallApple, setOpenInstallApple ] = useState(false);

    const listener = (event) => { 
        event.preventDefault();
        setOpen(true);            
        setInstallPrompt(event);
        removeListenerPWA(listener);
    }

    const handleInstall = () => {
        
        // app on the store
        if(isAndroid){
            window.location.href = 'https://play.google.com/store/apps/details?id=com.app.spax';
            handleClose();
        }
        else{
            if(isApple){
                setOpenInstallApple(true);
            }
            else{
                installPWA('banner',installPrompt,listener,setInstallPrompt,handleClose);
            }
        }
    }

    useEffect(() => {
        listenerPWA(listener);
    },[]);   

    const handleClose = () => {
        setOpen(false);
        if(isApple){
            setOpenInstallApple(false);
        }
        setCookie('app-closed',true);
    }

    const sx = {
        //padding: '0px 12px'
    }

    return (
        <>
        {
            isApple &&
            <PWAPrompt 
                isShown={openInstallApple}
                delay={1}
                onClose={handleClose}
                copyTitle={t('pwa.apple.title')}
                copySubtitle={t('pwa.apple.subtitle')}
                copyDescription={t('pwa.apple.description')}
                copyShareStep={t('pwa.apple.share')}
                copyAddToHomeScreenStep={t('pwa.apple.add')}
                appIconPath={'/storage/logo.png'}
            />
        }
        <Collapse 
            in={open}
            timeout={{
                appear: 'auto',
                enter: 1000,
                exit: 1000
            }}
        >
            <Alert 
                className='pwa-banner'
                sx={sx}
                severity="warning"
                icon={<InstallIcon/>}
                //onClose={handleClose}
                action={
                    <Button 
                        color="inherit" 
                        onClick={handleClose}
                        sx={{minWidth: '0px'}}
                        //size="large"
                    >
                        <CloseIcon fontSize='medium'/>
                    </Button>
                }
            >
                <div className='flex justify-between items-center'>
                    {/*<div>
                        {t('pwa.text')}
                    </div>*/}
                    <div className=''>
                        <Button 
                            variant="outlined"
                            color="inherit" 
                            onClick={handleInstall}
                            sx={{border: 1}}
                            //sx={{minWidth: '0px'}}
                            //size="small"
                        >
                            {t('pwa.button')}
                        </Button>
                    </div>
                </div>
            </Alert>
        </Collapse>
        </>
    )
}