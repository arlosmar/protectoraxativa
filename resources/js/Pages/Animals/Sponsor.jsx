import { useState } from 'react';

import { styleSubTabs } from '@/Utils/Styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';
import AnimalsIcon from '@mui/icons-material/Pets';
import SponsoredIcon from '@mui/icons-material/InsertEmoticon';
import ApuIcon from '@mui/icons-material/Handshake';

import Info from '@/Pages/Animals/Sponsor/Info';
import CarouselAnimals from '@/Pages/Animals/CarouselAnimals';

export default function Sponsor({user,t,subsection,setSubsection,animals,sponsored,
    baseUrl,imagesPaths,page,setPage,options,email_colaboration,forms,prices,itemsPerPage}){

    const [ tab, setTab ] = useState(subsection ? subsection : "info");

    const { sxSubTabs, sx, sxIcon } = styleSubTabs();

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);

        // to inform the parent view and call by ajax to get animals
        setSubsection(newValue);

        // reset page in case it came by url
        setPage(1);

        // change url on the browser
        var url = route("animals")+'/sponsor/'+newValue;
        window.history.pushState({path:url},'',url);
    };

    return (    	
        <>
        {/*
        <h1 className='title-home'>
            {t('animals.sponsor.title')}
        </h1>
        */}
        <div className='subtabs-container'>
            <Tabs 					
                value={tab} 
                sx={sxSubTabs}
                onChange={handleTabChange}                                     
                variant="scrollable"
            >
                <Tab icon={<InfoIcon sx={sxIcon}/>} value="info" sx={sx} iconPosition="top" label={t('animals.sponsor.info.icon')}/>
                <Tab icon={<AnimalsIcon sx={sxIcon}/>} value="animals" sx={sx} iconPosition="top" label={t('animals.sponsor.animals.icon')}/>
                <Tab icon={<SponsoredIcon sx={sxIcon}/>} value="sponsored" sx={sx} iconPosition="top" label={t('animals.sponsor.sponsored.icon')}/>                
            </Tabs>
            <div className='subcontent-container'>
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
                        <CarouselAnimals
                            user={user}
                            origin='sponsor' 
                            title={t('animals.sponsor.animals.title')}
                            t={t} 
                            animals={animals}
                            imagePath={imagesPaths?.animals}
                            imagesPaths={imagesPaths}
                            page={page}
                            options={options}
                            baseUrl={baseUrl}
                            itemsPerPage={itemsPerPage}
                        />
                    :
                        tab === 'sponsored' ?
                            <CarouselAnimals 
                                user={user}
                                origin='sponsored'
                                title={t('animals.sponsor.sponsored.title')}
                                t={t} 
                                animals={animals}
                                imagePath={imagesPaths?.animals}
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