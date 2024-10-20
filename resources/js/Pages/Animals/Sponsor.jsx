import { useState } from 'react';
import { makeStyles } from '@mui/styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';
import AnimalsIcon from '@mui/icons-material/Pets';
import SponsoredIcon from '@mui/icons-material/InsertEmoticon';
import ApuIcon from '@mui/icons-material/Handshake';

import Info from '@/Pages/Animals/Sponsor/Info';
import Animals from '@/Pages/Animals/Sponsor/Animals';
import Sponsored from '@/Pages/Animals/Sponsor/Sponsored';
import Apu from '@/Pages/Animals/Sponsor/Apu';

export default function Sponsor({t,subsection,setSubsection,apus,animals,sponsored,
    images_path,page,options,email_colaboration,forms,prices}){

    const [ tab, setTab ] = useState(subsection ? subsection : "info");

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);

        // to inform the parent view and call by ajax to get animals
        setSubsection(newValue);

        // change url on the browser
        var url = route("animals")+'/sponsor/'+newValue;
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
        <h1 className='title-home'>
            {t('animals.sponsor.title')}
        </h1>
        <div className='mt-4'>
            <Tabs 					
                value={tab} 
                onChange={handleTabChange}                     
                className={classes.tabs}
                variant="scrollable"
            >
                <Tab icon={<InfoIcon/>} value="info" sx={sx} iconPosition="top" label={t('animals.sponsor.info.icon')}/>
                <Tab icon={<AnimalsIcon/>} value="animals" sx={sx} iconPosition="top" label={t('animals.sponsor.animals.icon')}/>
                <Tab icon={<SponsoredIcon/>} value="sponsored" sx={sx} iconPosition="top" label={t('animals.sponsor.sponsored.icon')}/>
                <Tab icon={<ApuIcon/>} value="apu" sx={sx} iconPosition="top" label={t('animals.sponsor.apu.icon')}/>
            </Tabs>
            <div className='mt-4 pt-4'>
            {
                tab === 'info' ?
                    <Info 
                        t={t}
                        email_colaboration={email_colaboration}
                        forms={forms}
                        prices={prices}
                    />
                :						
                    tab === 'animals' ?
                        <Animals 
                            t={t} 
                            animals={animals}
                            images_path={images_path}
                            page={page}
                            options={options}
                        />
                    :
                        tab === 'sponsored' ?
                            <Sponsored 
                                t={t} 
                                animals={animals}
                                images_path={images_path}
                                page={page}
                                options={options}
                            />
                        :
                            tab === 'apu' ?
                                <Apu t={t} apus={apus}/>
                            :
                                ''
            }
            </div>
        </div>
        </>
    )
}