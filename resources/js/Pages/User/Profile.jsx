import { useState } from 'react';

//import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from '@/Pages/User/Profile/DeleteUserForm';
import UpdatePasswordForm from '@/Pages/User/Profile/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/User/Profile/UpdateProfileInformationForm';
//import UserSettings from '@/Pages/User/Profile/UserSettings';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

import { makeStyles } from '@mui/styles';

/*
tab === 'settings' ? 
    <UserSettings
        t={t}     
        user={user}                       
    />
:
*/

export default function Profile({ user, status, t, subsection }) {

    const [ tab, setTab ] = useState(subsection ? subsection : "information");

    const handleChange = (event,newValue) => {
        
        setTab(newValue);

        // change url on the browser
        var url = route("user")+'/profile/'+newValue;
        window.history.pushState({path:url},'',url);
    };

    const useStyles = makeStyles({

        tabs: {
            "& .MuiTabs-indicator": {
                backgroundColor: "#FF8C00",
                height: 3,
            },
            "& .MuiTab-root.Mui-selected": {
                color: '#FF8C00'
            }
        }
    });

    const classes = useStyles();

    const sx = {};

    return (
        <>
        <h1 className='title-home'>
            {t('user.profile.title')}
        </h1>
        <div className='mt-4'>
            <Tabs 
                value={tab} 
                onChange={handleChange}                 
                className={classes.tabs}
                centered
            >
                <Tab icon={<InfoIcon/>} value="information" sx={sx} iconPosition="top" label={t('user.profile.information.icon')}/>
                {/*<Tab icon={<SettingsIcon sx={sxIcon}/>} value="settings"/>*/}
                <Tab icon={<LockIcon/>} value="password" sx={sx} iconPosition="top" label={t('user.profile.password.icon')}/>
                <Tab icon={<DeleteIcon/>} value="account" sx={sx} iconPosition="top" label={t('user.profile.account.icon')}/>
            </Tabs>
            <div className='mt-4 pt-4'>
            {
                tab === 'information' ?
                    <UpdateProfileInformationForm
                        t={t}
                        user={user}                            
                        status={status}                            
                    />
                :
                    tab === 'password' ?             
                        <UpdatePasswordForm 
                            t={t}                                
                        />
                    :
                        tab === 'account' ?
                            <DeleteUserForm 
                                t={t}                                    
                            />
                        :
                            ''
            }
            </div>
        </div>
        </>
    )
}
