import { useState } from 'react';
import { makeStyles } from '@mui/styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';
import AnimalsIcon from '@mui/icons-material/Pets';

import Info from '@/Pages/Animals/Heaven/Info';
import Animals from '@/Pages/Animals/Heaven/Animals';

export default function Heaven({t,subsection,setSubsection,animals,images_path,email_info,page,options}){

    const [ tab, setTab ] = useState(subsection ? subsection : "info");

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);

        // to inform the parent view and call by ajax to get animals
        setSubsection(newValue);

        // change url on the browser
        var url = route("animals")+'/heaven/'+newValue;
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
            {t('animals.heaven.title')}
        </h1>
        <div className='mt-4'>
            <Tabs                   
                value={tab} 
                onChange={handleTabChange}                     
                className={classes.tabs}
                centered
            >
                <Tab icon={<InfoIcon/>} value="info" sx={sx} iconPosition="top" label={t('animals.heaven.info.icon')}/>
                <Tab icon={<AnimalsIcon/>} value="animals" sx={sx} iconPosition="top" label={t('animals.heaven.animals.icon')}/>                
            </Tabs>
            <div className='mt-4 pt-4'>
            {
                tab === 'info' ?
                    <Info t={t} email_info={email_info}/>
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
                        ''
            }
            </div>
        </div>
        </>
    )
}