import Toast from '@/Components/Toast';
import { useState, useEffect } from 'react';
import Switch from '@/Components/Switch';
import { useForm } from '@inertiajs/react';

import { getDarkMode, setDarkMode, getAuthentication, removeAuthentication } from "@/Utils/Cookies";
import { register } from '@/Components/Authentication';

import { notificationsSupported, checkPermission, requestPermission } from '@/Utils/Notifications';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Settings({ t, user, userSettings, setUserSettings, notifications, isApp, appNotificationsEnabled }) {

    const darkmode = getDarkMode();

    const [ loading, setLoading ] = useState(false);

    const [ notificationsAvailable, setNotificationsAvailable ] = useState(notificationsSupported());
    
    // authentication is enabled if the cookie is there and is for that user
    const authenticationEnabled = getAuthentication(); 
    const authentication = authenticationEnabled && authenticationEnabled?.authentication !== null &&
    authenticationEnabled?.userId === user?.id ? true : false;

    const [ checkedDarkmode, setCheckedDarkMode ] = useState(darkmode);
    const [ checkedAuthentication, setCheckedAuthentication ] = useState(authentication);
    
    var permissionNotifications = checkPermission();

    const [ checkedNotifications, setCheckedNotifications ] = useState(
        userSettings &&
        userSettings?.notifications &&
        (
            (isApp && appNotificationsEnabled) ||
            (!isApp && (!notificationsAvailable || permissionNotifications))
        )
        ? 
            true 
        : 
            false
    );

    const [ checkedNotificationsPush, setCheckedNotificationsPush ] = useState(userSettings && 
        userSettings?.notifications_push ? true : false);

    const [ checkedNotificationsEmail, setCheckedNotificationsEmail ] = useState(userSettings && 
        userSettings?.notifications_email ? true : false);

    // for notification types
    const [ notificationsTypes, setNotificationsTypes ] = useState([]);
    const [ applyNotificationsTypes, setApplyNotificationsTypes ] = useState(false);

    useEffect(() => {

        var types = [];
        if(userSettings && userSettings?.notifications_types){
            types = userSettings.notifications_types.split(',');
        }

        var notTypes = [];
        notifications.map((item,index) => {
            notTypes[item?.id] = {
                label: item?.label,
                status: types.includes(''+item?.id) ? true : false
            }
        });

        setNotificationsTypes(notTypes);
    },[]);

    useEffect(() => {
        if(applyNotificationsTypes){
            setNotificationsTypes(notificationsTypes);
            setApplyNotificationsTypes(false);
        }
    },[applyNotificationsTypes]);

    const [ message, setMessage ] = useState('');
    const [ error, setError ] = useState('');

    const handleSettings = async (event) => {

        const id = event?.target?.id;
        const setting = event.target.name;
        var settingsItems = {};

        switch(setting){

            case 'notifications':

                var value = event.target.checked;
                var oldValue = checkedNotifications;

                // if is app, check if permission for notifications
                if(isApp){
                    if(value && !appNotificationsEnabled){
                        // go to app settings
                        if(window?.AndroidHandler?.enableNotifications){
                            window?.AndroidHandler?.enableNotifications(window.location.href);
                        }
                        else{
                            setError(t('user.profile.settings.notifications.appDisabled'));
                            setMessage('');
                            setOpenToast(true);   
                        }
                    }
                    else{
                        setCheckedNotifications(value);
                    }
                }
                else{
                    // if enabling and notifications available
                    if(value && notificationsAvailable){

                        // in case the permission is changed after the page is loaded
                        permissionNotifications = checkPermission();
                        
                        if(permissionNotifications){
                            setCheckedNotifications(value);
                        }
                        else{
                            // if not set up, request permissions
                            if(permissionNotifications === null){

                                permissionNotifications = await requestPermission(true);

                                if(permissionNotifications){
                                    setCheckedNotifications(value);
                                    setMessage(t('user.profile.settings.notifications.enabled'));
                                    setError('');
                                    setOpenToast(true);
                                }
                                else{
                                    // not answered                                
                                    if(permissionNotifications === null){
                                        setError(t('user.profile.settings.notifications.setup'));
                                        setMessage('');
                                        setOpenToast(true);
                                        return;
                                    }
                                    else{
                                        // show message stating the notifications must be enabled
                                        setError(t('user.profile.settings.notifications.disabled'));
                                        setMessage('');
                                        setOpenToast(true);
                                        return;
                                    }
                                }
                            }
                            else{
                                // denied
                                // show message stating the notifications must be enabled
                                setError(t('user.profile.settings.notifications.disabled'));
                                setMessage('');
                                setOpenToast(true);                     
                                return;
                            }                        
                        }                    
                    }
                    else{
                        setCheckedNotifications(value);
                    }
                }
                
                var valueSetting = value ? 1 : 0;
                var path = 'settings.update';   
                settingsItems[setting] = valueSetting;
                var dataSend = {
                    settings: settingsItems
                };

                // if enabling and first time, enable push  
                // not necessary because they are activated by default when registering
                /*              
                if(
                    value && 
                    (
                        !userSettings || 
                        (!checkedNotificationsPush && !userSettings.hasOwnProperty('notifications_push'))
                    )
                ){
                    setCheckedNotificationsPush(value);
                    dataSend.settings.notifications_push = 1;

                    // enable all types of notifications
                    var newNotificationsTypes = [];
                    var newNotificationsTypesArray = [];
                    notificationsTypes && notificationsTypes.length > 0 && notificationsTypes.map((item,index) => {
                        newNotificationsTypes[index] = {
                            label: item.label,
                            status: true
                        };
                        newNotificationsTypesArray.push(index);
                    });
                    setNotificationsTypes(newNotificationsTypes);
                    dataSend.settings.notifications_types = newNotificationsTypesArray.join(',');
                }
                */
                break;

            case 'notifications_email':
            case 'notifications_push':
                var value = event.target.checked;
                var valueSetting = value ? 1 : 0;

                if(setting === 'notifications_push'){
                    var oldValue = checkedNotificationsPush;
                    setCheckedNotificationsPush(value);
                }
                else{
                    var oldValue = checkedNotificationsEmail;
                    setCheckedNotificationsEmail(value);
                }                
                var path = 'settings.update';
                settingsItems[setting] = valueSetting;
                var dataSend = {
                    settings: settingsItems
                };  
                break;

            case 'notifications_types':                
                var value = event.target.checked;
                var valueSetting = value ? 1 : 0;
                
                var oldValue = notificationsTypes[id].status;
                var newNotificationsTypes = notificationsTypes;
                newNotificationsTypes[id].status = value;                

                // trick to remap the switches
                //setNotificationsTypes(newNotificationsTypes);
                setApplyNotificationsTypes(true);
                    
                // send all values separated by comma
                var path = 'settings.update';
                var newValues = [];
                newNotificationsTypes.map((item,index) => {
                    if(item.status){
                        newValues.push(index);
                    }
                });
                settingsItems[setting] = newValues.join(',');
                var dataSend = {
                    settings: settingsItems
                }; 
                break;

            case 'darkmode':
                var value = event.target.checked;
                var oldValue = checkedDarkmode;
                setCheckedDarkMode(value);                                
                var valueSetting = value ? 1 : 0;         
                setDarkMode(value);

                var path = 'settings.update';   
                settingsItems[setting] = valueSetting;
                var dataSend = {
                    settings: settingsItems
                };  
                break;

            case 'authentication':

                var oldValue = checkedAuthentication;
                var value = event.target.checked;
                //setCheckedAuthentication(value);
                if(!value){
                    setCheckedAuthentication(value);
                }

                var credentialJson = null;
                if(value){                  
                    setLoading(true);         
                    credentialJson = await register(user);
                    setLoading(false);

                    if(credentialJson !== false && credentialJson.length > 0){
                        setCheckedAuthentication(value);
                    }
                    else{
                        setError(t('user.profile.settings.authentication.notAllowed'));
                        setMessage('');
                        setOpenToast(true);
                    }
                }

                if(credentialJson !== false){                   
                    var path = 'settings.authentication';
                    var dataSend = {authentication: credentialJson};
                } 
                else{                    
                    // false is when clicking cancel on the prompt
                    //setCheckedAuthentication(oldValue);                    
                    return;                    
                }                       
                break;

            default:
                return;
                break;
        }        

        axios.post(route(path),dataSend)
        .then(function (response){            
            
            if(response.data.result){
                // success
                //setMessage(t('trans.Saved-Male'));
                //setError('');

                // if success and we were removing the authentication, set the cookie
                if(setting === 'authentication' && credentialJson === null){
                    removeAuthentication();
                }
                else{
                    // update user settings in case we change tab and come back here again
                    if( 
                        setting === 'notifications' || 
                        setting === 'notifications_push' || 
                        setting === 'notifications_email' ||
                        setting === 'notifications_types'
                    ){
                        var newSettings = response.data.settings;
                        setUserSettings(newSettings);
                    }
                }                
            }
            else{
                // error
                switch(setting){

                    case 'notifications':                        
                        setCheckedNotifications(oldValue);
                        break;

                    case 'notifications_push':
                        setCheckedNotificationsPush(oldValue);
                        break;

                    case 'notifications_email':
                        setCheckedNotificationsEmail(oldValue);
                        break;

                    case 'notifications_types':
                        var newNotificationsTypes = notificationsTypes;
                        newNotificationsTypes[id].status = oldValue;
                        setNotificationsTypes(newNotificationsTypes);
                        break;

                    case 'darkmode':                        
                        setCheckedDarkMode(oldValue);                                
                        valueSetting = oldValue ? 1 : 0;         
                        setDarkMode(oldValue);       
                        break;

                    case 'authentication':                                                
                        setCheckedAuthentication(oldValue);                        
                        break;
                } 
                setError(t('trans.Saved-Error'));
                setMessage('');
                setOpenToast(true);
            }

            //setOpenToast(true);
        })
        .catch(function (error){
            switch(setting){

                case 'notifications':                        
                    setCheckedNotifications(oldValue);
                    break;

                case 'darkmode':                        
                    setCheckedDarkMode(oldValue);                                
                    valueSetting = oldValue ? 1 : 0;         
                    setDarkMode(oldValue);       
                    break;

                case 'authentication':                                                
                    setCheckedAuthentication(oldValue);                        
                    break;
            } 
            setError(t('trans.Saved-Error'));
            setMessage('');
            setOpenToast(true);
        }); 
    }

    const [ openToast, setOpenToast ] = useState(false);

    return (
        <>
        <Backdrop
            sx={(theme) => ({ color: '#FF8C00', zIndex: theme.zIndex.drawer + 1 })}
            open={loading}            
        >
            <CircularProgress color="warning"/>
        </Backdrop>  
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            error={error}
            message={message}
        />
        <div className='settings-div-box'>
            <Switch
                name="darkmode"                       
                checked={checkedDarkmode}
                onChange={handleSettings}
                label={t('user.profile.settings.dark-mode')}
            />            
        </div>
        {
            !isApp &&
            <div className='settings-div-box mt-2'>
                <Switch
                    name="authentication"                       
                    checked={checkedAuthentication}
                    onChange={handleSettings}
                    label={t('user.profile.settings.biometric')}
                />            
            </div>
        }
        <div className='settings-div-box mt-2'>                    
            <Switch
                name="notifications"
                checked={checkedNotifications}
                onChange={handleSettings}
                label={t('user.profile.settings.notifications.switch')}
            />

            {
                checkedNotifications &&
                <div className='pl-4'>                        
                    <Switch
                        name="notifications_push"
                        checked={checkedNotificationsPush}
                        onChange={handleSettings}
                        label={t('user.profile.settings.notifications.push')}
                    />
                    <Switch
                        name="notifications_email"
                        checked={checkedNotificationsEmail}
                        onChange={handleSettings}
                        label={t('user.profile.settings.notifications.email')}
                    />
                    {
                        (checkedNotificationsPush || checkedNotificationsEmail) &&
                        (notificationsTypes && notificationsTypes.length > 0) && 
                        <>
                        <div className='mt-4'>
                            {t('user.profile.settings.notifications.type')}
                        </div>
                        {                                
                            notificationsTypes.map((item,index) => (                                    
                                <Switch                      
                                    id={index}                  
                                    name="notifications_types"
                                    checked={item?.status}
                                    onChange={handleSettings}
                                    label={item?.label}
                                />
                            ))                                
                        }                            
                        </>
                    }
                </div>
            }
        </div>
        </>
    );
}
