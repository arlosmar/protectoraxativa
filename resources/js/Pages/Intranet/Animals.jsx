import { useState, useEffect } from 'react';

import { styleSubTabs } from '@/Utils/Styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import SponsoredIcon from '@mui/icons-material/Pets';
import AdoptedIcon from '@mui/icons-material/InsertEmoticon';

import CarouselAnimals from '@/Pages/Animals/CarouselAnimals';

import { formatAnimals } from "@/Utils/Format";

export default function Animals({t,user,subsection,imagesPaths,options,baseUrl,itemsPerPage,page}) {

    const [ tab, setTab ] = useState(subsection ? subsection : "adopted");
    const [ animals, setAnimals ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const handleChange = (event,newValue) => {
        
        setTab(newValue);

        // change url on the browser
        var url = route('intranet',['animals',newValue]);
        window.history.pushState({path:url},'',url);
    };

    useEffect(() => {

        // adopted => Animal::where('hidden',false)->where('dead',false)->where('status_id','2')
        // sponsored => Animal::where('hidden',false)->where('dead',false)->where('status_id','1')->where('sponsor_id','2')

        if(user?.person?.animals && user?.person?.animals.length > 0){

            setLoading(true);

            if(tab === 'adopted'){
                var filtered = user.person.animals.filter((animal) => animal?.status_id === 2);
            }
            else{
                if(tab === 'sponsored'){
                    var filtered = user.person.animals.filter((animal) => animal?.status_id === 1 && animal?.sponsor_id === 2);
                }
            }

            var animalsFormatted = formatAnimals(t,filtered);
            setAnimals(animalsFormatted);

            setLoading(false);
        }

    },[tab])

    const { classes, sx, sxIcon } = styleSubTabs();

    return (
        <>
        {/*
        <h1 className='title-home'>
            {t('user.profile.animals.title')}
        </h1>
        */}
        <div className='subtabs-container'>
            <Tabs 
                value={tab} 
                onChange={handleChange}
                className={classes.tabs}
                variant="scrollable"
            >
                <Tab icon={<AdoptedIcon sx={sxIcon}/>} value="adopted" sx={sx} iconPosition="top" label={t('animals.adopt.adopted.title')}/>                
                <Tab icon={<SponsoredIcon sx={sxIcon}/>} value="sponsored" sx={sx} iconPosition="top" label={t('animals.sponsor.sponsored.title')}/>                
            </Tabs>
            <div className='subcontent-container'>
                <CarouselAnimals
                    user={user}
                    origin={
                        tab === 'adopted' ? 
                            'intranet-adopted' 
                        : 
                            tab === 'sponsored' ? 
                                'intranet-sponsored' 
                            : 
                                ''
                    }
                    title={
                        tab === 'adopted' ? 
                            t('animals.adopt.adopted.title') 
                        : 
                            tab === 'sponsored' ? 
                                t('animals.sponsor.sponsored.title')
                            :
                                ''
                    }
                    t={t} 
                    animals={animals}
                    imagePath={imagesPaths?.animals}
                    imagesPaths={imagesPaths}
                    page={page}                    
                    options={options}
                    baseUrl={baseUrl}
                    itemsPerPage={itemsPerPage}
                    loading={loading}
                />
            </div>
        </div>
        </>
    )
}
