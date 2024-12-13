import { useState } from 'react';
import { useTranslation } from "react-i18next";
import Header from '@/Pages/Header/Header';

import Terms from '@/Pages/Info/Terms';
import Policy from '@/Pages/Info/Policy';
import Cookies from '@/Pages/Info/Cookies';

import { styleTabs } from '@/Utils/Styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import TermsIcon from '@mui/icons-material/LibraryBooks';
import PolicyIcon from '@mui/icons-material/Lock';
import CookiesIcon from '@mui/icons-material/Cookie';

import Sticky from '@/Components/Sticky';

import { useSwipeable } from 'react-swipeable';

export default function Info({user,section}){

	const { t } = useTranslation('global');

    const [ tab, setTab ] = useState(section ? section : "terms");

    const { stickyRef, sticky, offset, height, isApplicationOrWebApp } = Sticky();

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);        

        if(sticky){            
            window.scrollTo({top: offset});
        }

        // change url on the browser
        var url = route(newValue);
        window.history.pushState({path:url},'',url);
    };

    const { sxTabs, sx, sxIcon } = styleTabs();

    const [ tabsArray , setTabsArray ] = useState(['terms','policy','cookies']);
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
    	<Header user={user} t={t} from='home'/>
        <main {...handlers}>

            <div className='tabs-container' style={{marginTop: sticky ? height+'px': '0px'}}>
                <Tabs 
                    id="tabs"
                    ref={stickyRef} 
                    sx={sxTabs}
                    className={`${sticky ? 'sticky-item' : ''}`}
                    value={tab} 
                    onChange={handleTabChange}
                    variant="scrollable"
                >
                    <Tab icon={<TermsIcon sx={sxIcon}/>} label={t('info.terms.icon')} iconPosition="top" value="terms" sx={sx}/>
                    <Tab icon={<PolicyIcon sx={sxIcon}/>} label={t('info.policy.icon')} iconPosition="top" value="policy" sx={sx}/>                    
                    <Tab icon={<CookiesIcon sx={sxIcon}/>} label={t('info.cookies.icon')} iconPosition="top" value="cookies" sx={sx}/>                    
                </Tabs>
                <div className='content-container'>
                {
                    tab === 'policy' ?
                        <Policy t={t}/>
                    :
                        tab === 'cookies' ?
                            <Cookies t={t}/>
                        :
                            <Terms t={t}/>
                }
                </div>
            </div>          
        </main>
    	</>
    )
}