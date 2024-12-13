import { useState } from 'react';

import { styleSubTabs } from '@/Utils/Styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';
import AnimalsIcon from '@mui/icons-material/Pets';

import Info from '@/Pages/Animals/Heaven/Info';
import CarouselAnimals from '@/Pages/Animals/CarouselAnimals';

export default function Heaven({user,t,subsection,setSubsection,animals,
    baseUrl,imagesPaths,email_info,page,setPage,options,itemsPerPage}){

    const [ tab, setTab ] = useState(subsection ? subsection : "info");

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);

        // to inform the parent view and call by ajax to get animals
        setSubsection(newValue);

        // reset page in case it came by url
        setPage(1);

        // change url on the browser
        var url = route("animals")+'/heaven/'+newValue;
        window.history.pushState({path:url},'',url);
    };

   const { sxSubTabs, sx, sxIcon } = styleSubTabs();

    return (        
        <>
        {/*
        <h1 className='title-home'>
            {t('animals.heaven.title')}
        </h1>
        */}
        <div className='subtabs-container'>
            <Tabs
                value={tab}
                sx={sxSubTabs} 
                onChange={handleTabChange}                                     
                variant="scrollable"
            >
                <Tab icon={<InfoIcon sx={sxIcon}/>} value="info" sx={sx} iconPosition="top" label={t('animals.heaven.info.icon')}/>
                <Tab icon={<AnimalsIcon sx={sxIcon}/>} value="animals" sx={sx} iconPosition="top" label={t('animals.heaven.animals.icon')}/>                
            </Tabs>
            <div className='subcontent-container'>
            {
                tab === 'info' ?
                    <Info t={t} email_info={email_info}/>
                :                       
                    tab === 'animals' ?
                        <CarouselAnimals 
                            user={user}
                            origin='heaven'
                            title={t('animals.heaven.animals.title')}
                            t={t} 
                            animals={animals}
                            imagePath={imagesPaths?.animals_external}
                            imagesPaths={imagesPaths}
                            page={page}
                            options={options}
                            baseUrl={baseUrl}
                            itemsPerPage={itemsPerPage}
                        />
                    :                       
                        ''
            }
            </div>
        </div>
        </>
    )
}