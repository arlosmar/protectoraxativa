import { useState } from 'react';
import { makeStyles } from '@mui/styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';
import AnimalsIcon from '@mui/icons-material/Pets';
import AdoptedIcon from '@mui/icons-material/InsertEmoticon';

import Info from '@/Pages/Animals/Adopt/Info';
import Animals from '@/Pages/Animals/Adopt/Animals';
import Adopted from '@/Pages/Animals/Adopt/Adopted';

export default function Adopt({t,subsection,email_adoptions,social,animals,adopted,images_path}){

    const [ tab, setTab ] = useState(subsection ? subsection : "info");

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);

        // change url on the browser
        var url = route("animals")+'/adopt/'+newValue;
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
            {t('animals.adopt.title')}
        </h1>
        <div className='mt-4'>
            <Tabs 					
                value={tab} 
                onChange={handleTabChange}                     
                className={classes.tabs}
                centered
            >
                <Tab icon={<InfoIcon/>} value="info" sx={sx} iconPosition="top" label={t('animals.adopt.info.icon')}/>
                <Tab icon={<AnimalsIcon/>} value="animals" sx={sx} iconPosition="top" label={t('animals.adopt.animals.icon')}/>
                <Tab icon={<AdoptedIcon/>} value="adopted" sx={sx} iconPosition="top" label={t('animals.adopt.adopted.icon')}/>
            </Tabs>
            <div className='mt-4 pt-4'>
            {
                tab === 'info' ?
                    <Info t={t} email_adoptions={email_adoptions} social={social}/>
                :						
                    tab === 'animals' ?
                        <Animals 
                            t={t} 
                            animals={animals}
                            images_path={images_path}
                        />
                    :
                        tab === 'adopted' ?
                            <Adopted 
                                t={t} 
                                adopted={adopted}
                                images_path={images_path}
                            />
                        :
                            ''
            }
            </div>
        </div>
        </>
    )
}