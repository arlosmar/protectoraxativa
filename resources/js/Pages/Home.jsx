import { useState, useMemo } from 'react';
import { useTranslation } from "react-i18next";

import { makeStyles } from '@mui/styles';

//import i18n from 'i18next';
//const lang =  i18n.language // lang === 'es' etc.

import Header from '@/Pages/Header/Header';
import { setLanguage } from "@/Utils/Cookies";

import EuroIcon from '@mui/icons-material/Euro';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import HandshakeIcon from '@mui/icons-material/Handshake';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Colaboration from '@/Pages/Home/Colaboration';
import Social from '@/Pages/Home/Social';
import Partners from '@/Pages/Home/Partners';
import Info from '@/Pages/Home/Info';

export default function Home({user,language,section,email_colaboration,email_volunteering,
    social,partners,prices,forms}){

	const { t, i18n } = useTranslation('global');

	useMemo(() => {

        if(language){
			i18n.changeLanguage(language);
			setLanguage(language);
		}

    }, []);

	const [ tab, setTab ] = useState(section ? section : "colaboration");

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);

        // change url on the browser
        var url = route("home")+'/'+newValue;
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

	const sx = {minWidth: "fit-content", flex: 1 };

    return (
    	<>
    	<Header user={user} t={t} from='home'/>
    	<main>
    		<h1 className="title">
    			{t('introduction.title')}
    		</h1>
            {/*
			<div className='text-center'>
				<img
					className='mx-auto'
					alt=""
					src='/logo.png'
					id='logo-home'
				/>
			</div>
            */}
			<div className='mt-8'>
                <Tabs 					
                    value={tab} 
                    onChange={handleTabChange}                     
                    className={classes.tabs}
					variant="scrollable"
                >
                    <Tab icon={<EuroIcon/>} value="colaboration" sx={sx}/>
                    <Tab icon={<ShareIcon/>} value="social" sx={sx}/>
					<Tab icon={<HandshakeIcon/>} value="partners" sx={sx}/>
					<Tab icon={<InfoIcon/>} value="info" sx={sx}/>
                </Tabs>
                <div className='mt-4 pt-4'>
                {
                    tab === 'colaboration' ?
                        <Colaboration 
                            t={t} 
                            email_colaboration={email_colaboration}
                            email_volunteering={email_volunteering}
                            prices={prices}
                            forms={forms}
                        />
                    :						
						tab === 'social' ?
							<Social t={t} social={social}/>
						:
							tab === 'partners' ?
								<Partners t={t} partners={partners}/>
							:
								tab === 'info' ?
									<Info t={t}/>
								:
									''
                }
                </div>
            </div>
    	</main>
    	</>
    )
}