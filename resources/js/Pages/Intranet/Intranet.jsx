import { useState } from 'react';
import { useTranslation } from "react-i18next";
import Header from '@/Pages/Header/Header';

import { styleTabs } from '@/Utils/Styles';

import AnimalsIcon from '@mui/icons-material/Pets';
import AccountIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Animals from '@/Pages/Intranet/Animals';
import Account from '@/Pages/Account/Account';
import Settings from '@/Pages/Settings/Settings';

import Toast from '@/Components/Toast';

import Sticky from '@/Components/Sticky';

import { useSwipeable } from 'react-swipeable';

import { applyDarkMode } from "@/Utils/Cookies";

export default function Intranet({auth,user,section,subsection,status,msg,
    options,imagesPaths,baseUrl,itemsPerPage,page}){

    // when logged in, it does not reload the page, so we have to force here the darkmode
    // for the rest of pages, it is on the app.jsx
    const darkmode = applyDarkMode();

    const { t } = useTranslation('global');

    const [ tab, setTab ] = useState(section ? section : "animals");
    const [ subtab, setSubtab ] = useState(subsection ? subsection : '');

    const { stickyRef, sticky, offset } = Sticky();

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);
        setSubtab('');

        if(sticky){            
            window.scrollTo({top: offset});
        }

        // change url on the browser
        var url = route('intranet',newValue);
        window.history.pushState({path:url},'',url);
    };

    const { classes, sx, sxIcon } = styleTabs();

    const [ openToast, setOpenToast ] = useState(msg && msg.length > 0 ? true : false);
    const [ toastMsg, setToastMsg ] = useState(msg && msg.length > 0 ? t(msg) : '');
    const [ toastErrorMsg, setToastErrorMsg ] = useState('');

    const [ tabsArray , setTabsArray ] = useState(['animals','settings','account']);
    const [ tabsLength , setTabsLength ] = useState(3);
    const [ posTab , setPosTab ] = useState(0);

    const handleSwipe = (e,move) => {

        var newPos = posTab+move;

        if(newPos >= 0 && newPos < tabsLength){
            setPosTab(newPos);
            handleTabChange(e,tabsArray[newPos]);
        }
    }

    // https://commerce.nearform.com/open-source/react-swipeable/
    const handlers = useSwipeable({
        onSwipedRight: (e) => handleSwipe(e,-1),
        onSwipedLeft: (e) => handleSwipe(e,1),        
        //onTouchEndOrOnMouseUp: (e) => handleSwipe("User Touched!", e),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    return (
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={toastMsg}
            error={toastErrorMsg}
        />
        <Header user={user} t={t} from='user'/>
        <main {...handlers}>
            {/*
            <h1 className="title">
                {t('user.title')}
            </h1>            
            */}
            <div className='tabs-container'>
                <Tabs 
                    id="tabs"
                    ref={stickyRef} 
                    className={`${classes.tabs} ${sticky && 'sticky'}`}
                    sx={{zIndex:1}} 
                    value={tab} 
                    onChange={handleTabChange}
                    variant="scrollable"
                >
                    <Tab icon={<AnimalsIcon sx={sxIcon}/>} label={t('user.profile.animals.icon')} iconPosition="top" value="animals" sx={sx}/>
                    <Tab icon={<SettingsIcon sx={sxIcon}/>} label={t('user.profile.settings.icon')} iconPosition="top" value="settings" sx={sx}/>
                    <Tab icon={<AccountIcon sx={sxIcon}/>} label={t('user.profile.icon')} iconPosition="top" value="account" sx={sx}/>
                </Tabs>
                <div className='content-container'>
                {
                    tab === 'settings' ?
                        <Settings
                            t={t}     
                            user={user}                       
                        />
                    :
                        tab === 'account' ?
                            <Account
                                user={user}                                
                                status={status}
                                t={t}
                                subsection={subtab}
                            />
                        :
                            <Animals
                                t={t}     
                                user={user}  
                                subsection={subtab}
                                options={options}                  
                                imagesPaths={imagesPaths}
                                baseUrl={baseUrl}
                                itemsPerPage={itemsPerPage}
                                page={page}
                            />
                }
                </div>
            </div>          
        </main>
        </>
    )
}