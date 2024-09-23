import Header from '@/Pages/Header/Header';
import { useState } from 'react';
import { useTranslation } from "react-i18next";

import { makeStyles } from '@mui/styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AdoptIcon from '@mui/icons-material/Home';
import SponsorIcon from '@mui/icons-material/Savings';

import Adopt from '@/Pages/Animals/Adopt';
import Sponsor from '@/Pages/Animals/Sponsor';

export default function Animals({user,section,subsection,emails,social,apus,animals_adopt,
    animals_adopted,animals_sponsor,animals_sponsored,images_path}){

    const { t } = useTranslation('global');

    const [ tab, setTab ] = useState(section ? section : "adopt");

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);

        // change url on the browser
        var url = route("animals")+'/'+newValue;
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
    	<Header user={user} t={t} from='animals'/>
    	<main>
            <h1 className="title">
    			{t('animals.title')}
    		</h1>
            <div className='mt-4'>
                <Tabs 					
                    value={tab} 
                    onChange={handleTabChange}                     
                    className={classes.tabs}
                    centered
                >					
                    <Tab icon={<AdoptIcon/>} value="adopt" sx={sx} iconPosition="top" label={t('animals.adopt.icon')}/>
					<Tab icon={<SponsorIcon/>} value="sponsor" sx={sx} iconPosition="top" label={t('animals.sponsor.icon')}/>
                </Tabs>
                <div className='mt-4 pt-4'>
                {				
                    tab === 'adopt' ?
                        <Adopt
                            subsection={subsection}
                            t={t}
                            email_adoptions={emails?.email_adoptions}
                            social={social}
                            animals={animals_adopt}
                            adopted={animals_adopted}
                            images_path={images_path}
                        />
                    :
                        tab === 'sponsor' ?
                            <Sponsor
                                subsection={subsection}
                                t={t}
                                apus={apus}
                                animals={animals_sponsor}
                                sponsored={animals_sponsored}
                                images_path={images_path}
                            />
                        :
                            ''
                }
                </div>
            </div>
        </main>
        </>
    )
}