import { useState } from 'react';

import { styleSubTabs } from '@/Utils/Styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';
import AnimalsIcon from '@mui/icons-material/Pets';
import AdoptedIcon from '@mui/icons-material/InsertEmoticon';

import Info from '@/Pages/Animals/Adopt/Info';
import CarouselAnimals from '@/Pages/Animals/CarouselAnimals';

export default function Adopt({user,t,subsection,setSubsection,animals,email_adoptions,
    social,baseUrl,imagesPaths,page,setPage,loading,options,forms,guides,prices,itemsPerPage}){

    const [ tab, setTab ] = useState(subsection ? subsection : "info");

    const { sxSubTabs, sx, sxIcon } = styleSubTabs();

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);
        
        // to inform the parent view and call by ajax to get animals
        setSubsection(newValue);

        // reset page in case it came by url
        setPage(1);

        // change url on the browser
        var url = route("animals")+'/adopt/'+newValue;
        window.history.pushState({path:url},'',url);
    };

    return (        
        <>
        {/*
        <h1 className='title-home'>
            {t('animals.adopt.title')}
        </h1>
        */}
        <div className='subtabs-container'>
            <Tabs                   
                value={tab} 
                sx={sxSubTabs}
                onChange={handleTabChange}                     
                variant="scrollable"
            >
                <Tab icon={<InfoIcon sx={sxIcon}/>} value="info" sx={sx} iconPosition="top" label={t('animals.adopt.info.icon')}/>
                <Tab icon={<AnimalsIcon sx={sxIcon}/>} value="animals" sx={sx} iconPosition="top" label={t('animals.adopt.animals.icon')}/>
                <Tab icon={<AdoptedIcon/>} value="adopted" sx={sx} iconPosition="top" label={t('animals.adopt.adopted.icon')}/>
            </Tabs>
            <div className='subcontent-container'>
            {                 
                tab === 'animals' ?
                    <CarouselAnimals
                        user={user}
                        origin='adopt' 
                        title={t('animals.adopt.animals.title')}
                        t={t} 
                        animals={animals}
                        imagePath={imagesPaths?.animals}
                        imagesPaths={imagesPaths}
                        page={page}
                        loading={loading}
                        options={options}
                        baseUrl={baseUrl}
                        itemsPerPage={itemsPerPage}
                    />
                :
                    tab === 'adopted' ?
                        <CarouselAnimals
                            user={user}
                            origin='adopted' 
                            title={t('animals.adopt.adopted.title')}
                            t={t} 
                            animals={animals}
                            imagePath={imagesPaths?.animals}
                            imagesPaths={imagesPaths}
                            page={page}
                            loading={loading}
                            options={options}
                            baseUrl={baseUrl}
                            itemsPerPage={itemsPerPage}
                        />
                    :
                        <Info 
                            t={t} 
                            email_adoptions={email_adoptions} 
                            social={social}
                            forms={forms}
                            guides={guides}
                            prices={prices}
                        />
            }
            </div>
        </div>
        </>
    )
}