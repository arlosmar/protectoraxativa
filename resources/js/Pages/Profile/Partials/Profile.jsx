import { useState } from 'react';

//import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import UserSettings from '@/Pages/Profile/Partials/UserSettings';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

import { makeStyles } from '@mui/styles';

/*
<AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
>
    <Head title="Profile" />

    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                />
            </div>

            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <UpdatePasswordForm className="max-w-xl" />
            </div>

            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <DeleteUserForm className="max-w-xl" />
            </div>
        </div>
    </div>
</AuthenticatedLayout>
*/

export default function Profile({ user, status, t, subsection }) {

    const [ value, setValue ] = useState(subsection ? subsection : "information");

    const handleChange = (event,newValue) => {
        
        setValue(newValue);

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

    const sxIcon = { };

    /*
    <Tab label={t('user.profile.sections.Information')} value="information"/>
    <Tab label={t('user.profile.sections.Password')} value="password"/>
    <Tab label={t('user.profile.sections.Account')} value="account"/>
    */

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    centered
                    className={classes.tabs}
                >
                    <Tab icon={<InfoIcon sx={sxIcon}/>} value="information"/>
                    {/*<Tab icon={<SettingsIcon sx={sxIcon}/>} value="settings"/>*/}
                    <Tab icon={<LockIcon sx={sxIcon}/>} value="password"/>
                    <Tab icon={<DeleteIcon sx={sxIcon}/>} value="account"/>
                </Tabs>
            </Box>
            <div>
                {
                    value === 'information' ?
                        <UpdateProfileInformationForm
                            t={t}
                            user={user}                            
                            status={status}                            
                        />
                    :
                        value === 'settings' ? 
                            <UserSettings
                                t={t}     
                                user={user}                       
                            />
                        :
                            value === 'password' ?             
                                <UpdatePasswordForm 
                                    t={t}                                
                                />
                            :
                                value === 'account' ?
                                    <DeleteUserForm 
                                        t={t}                                    
                                    />
                                :
                                    ''
                }
            </div>
        </Box>
    );
}
