import { useState } from 'react';

import { styleSubTabs } from '@/Utils/Styles';

import Info from '@/Pages/Account/Info';
import Delete from '@/Pages/Account/Delete';
import Password from '@/Pages/Account/Password';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Account({ user, status, t, subsection }) {

    const [ tab, setTab ] = useState(subsection ? subsection : "info");

    const handleChange = (event,newValue) => {
        
        setTab(newValue);

        // change url on the browser
        var path = 'intranet';
        if(user && user?.admin){
            path = 'admin';
        }

        var url = route(path,['account',newValue]);
        window.history.pushState({path:url},'',url);
    };

    const { classes, sx, sxIcon } = styleSubTabs();

    return (
        <>
        {/*
        <h1 className='title-home'>
            {t('user.profile.title')}
        </h1>
        */}
        <div className='subtabs-container'>
            <Tabs 
                value={tab} 
                onChange={handleChange}
                className={classes.tabs}
                variant="scrollable"
            >
                <Tab icon={<InfoIcon sx={sxIcon}/>} value="info" sx={sx} iconPosition="top" label={t('user.profile.information.icon')}/>                
                <Tab icon={<LockIcon sx={sxIcon}/>} value="password" sx={sx} iconPosition="top" label={t('user.profile.password.icon')}/>
                <Tab icon={<DeleteIcon sx={sxIcon}/>} value="delete" sx={sx} iconPosition="top" label={t('user.profile.account.icon')}/>
            </Tabs>
            <div className='subcontent-container'>
            {
                
                tab === 'password' ?             
                    <Password 
                        t={t} 
                        user={user}                               
                    />
                :
                    tab === 'delete' ?
                        <Delete 
                            t={t}      
                            user={user}                              
                        />
                    :                        
                        <Info
                            t={t}
                            user={user}
                            status={status}                            
                        />
            }
            </div>
        </div>
        </>
    )
}
