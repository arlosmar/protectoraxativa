import { useState } from 'react';
import Alert from '@mui/material/Alert';

import NotificationsIcon from '@mui/icons-material/NotificationsActive';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import Collapse from '@mui/material/Collapse';

import { setCookie } from "@/Utils/Cookies";

// https://www.npmjs.com/package/react-ios-pwa-prompt
export default function BannerNotifications({ t, open, setOpen, handlePermissions }){

    const handleClose = () => {
        setOpen(false);
        setCookie('notifications-closed',true);
    }

    const sx = {
        
    }

    const handleNotifications = (e) => {
        //setOpen(false);
        //setCookie('notifications-closed',true);
        //window.location.href = route('intranet.settings');
        handlePermissions();
    }
    
    return (     
        <Collapse 
            in={open}
            timeout={{
                appear: 'auto',
                enter: 1000,
                exit: 1000
            }}
        >   
            <Alert 
                className='notifications-banner'
                sx={sx}
                severity="error"
                icon={<NotificationsIcon/>}            
                action={
                    <Button 
                        color="inherit" 
                        onClick={handleClose}
                        sx={{minWidth: '0px'}}
                    >
                        <CloseIcon fontSize='medium'/>
                    </Button>
                }
            >
                <div className='flex justify-between items-center'>
                    {/*
                    <div>
                        {t('notifications.text')}
                    </div>
                    */}
                    <div className=''>
                        <Button 
                            variant="outlined"
                            color="inherit" 
                            onClick={handleNotifications}
                            sx={{border: 1}}                        
                        >
                            {t('notifications.button')}
                        </Button>
                    </div>
                </div>
            </Alert>
        </Collapse>
    )
}