import Carousel from '@/Components/Carousel';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useState, useEffect } from 'react';

import ButtonsActions from '@/Components/ButtonsActions';

import FilterAnimals from '@/Pages/Animals/FilterAnimals';
import { csv } from "@/Utils/Export";

export default function CarouselAnimals({user,origin,title,t,animals,baseUrl,
    imagePath,imagesPaths,page,loading,options,itemsPerPage}){

    const [ filterUsed, setFilterUsed ] = useState(false);

    const [ filteredAnimals, setFilteredAnimals ] = useState(animals);

    const [ openSearch, setOpenSearch ] = useState(false);

    const handleOpenSearch = (e) => {
        setOpenSearch(!openSearch);
    };

    // when loading animals each time when clicking the tab
    useEffect(() => {
        setFilteredAnimals(animals);
    },[animals]); 

    const sxIcon = { fontSize: '50px' };

    const handleExport = (e) => {          
        
        if(filteredAnimals && filteredAnimals.length > 0){

            var headerCols = [];

            switch(origin){

                case 'heaven':
                    headerCols = [                               
                        {id:'name',text:t('animals.record.Name')},
                        {id:'image',text:t('animals.record.Image')},
                        {id:'image2',text:t('animals.record.Image2')},
                        {id:'video',text:t('animals.record.Video')},
                        {id:'video2',text:t('animals.record.Video2')},
                        {id:'location',text:t('animals.record.Location')},
                        {id:'birthdate_year',text:t('animals.record.Birthdate')},
                        {id:'deathdate_year',text:t('animals.record.Deathdate')},
                        {id:'description',text:t('animals.record.Description')}
                    ];
                    break;

                case 'sponsored':
                    headerCols = [       
                        {id:'code',text:t('animals.record.Code')},
                        {id:'name',text:t('animals.record.Name')},  
                        {id:'person_name',text:t('animals.record.Sponsors')},
                        {id:'image',text:t('animals.record.Image')},
                        {id:'image2',text:t('animals.record.Image2')},
                        {id:'video',text:t('animals.record.Video')},
                        {id:'video2',text:t('animals.record.Video2')},
                        {id:'description',text:t('animals.record.Description')}
                    ];
                    //animal?.person_name ? animal.person_name : animal?.person_id
                    break;

                default:
                    headerCols = [       
                        {id:'code',text:t('animals.record.Code')},
                        {id:'name',text:t('animals.record.Name')},
                        {id:'status',text:t('animals.record.Status.title')},
                        {id:'sponsor',text:t('animals.record.Sponsored.title')},
                        {id:'location',text:t('animals.record.Location')},
                        {id:'type',text:t('animals.record.Type.title')},
                        {id:'breed',text:t('animals.record.Breed.title')},
                        {id:'gender',text:t('animals.record.Gender.title')},
                        {id:'size',text:t('animals.record.Size.title')},
                        {id:'weight',text:t('animals.record.Weight')+' (Kg)'},
                        {id:'age',text:t('animals.record.Age.title')},
                        {id:'birthdate_year',text:t('animals.record.Birthdate')},
                        {id:'image',text:t('animals.record.Image')},
                        {id:'image2',text:t('animals.record.Image2')},
                        {id:'video',text:t('animals.record.Video')},
                        {id:'video2',text:t('animals.record.Video2')},
                        {id:'description',text:t('animals.record.Description')}
                    ];
                    break;
            }

            csv('animals',t,title,baseUrl,imagesPaths,headerCols,filteredAnimals);
        }
    }

    /*
    <div className='loading mt-8'>
        <CircularProgress sx={{color:"#FF8C00"}}/>
    </div>
    */

    return (
        <>
        <h1 className='title-carousel'>   
            {title}
            {/*
                !loading && filteredAnimals?.length > 0 && ' ('+filteredAnimals?.length+')'                
            */}
        </h1>
        {
            !loading &&
            <ButtonsActions
                origin={origin}                
                handleExport={handleExport}
                handleOpenSearch={handleOpenSearch}
            />
        }
        <FilterAnimals
            origin={origin}
            t={t}                                
            openSearch={openSearch}                    
            setOpenSearch={setOpenSearch}
            originalItems={animals}
            items={filteredAnimals}
            setItems={setFilteredAnimals}
            options={options}
            filterUsed={filterUsed}
            setFilterUsed={setFilterUsed}
        />
        {
            loading ?
                <Backdrop
                    sx={(theme) => ({ color: '#FF8C00', zIndex: theme.zIndex.drawer + 1 })}
                    open={loading}            
                >
                    <CircularProgress color="warning"/>
                </Backdrop>                
            :                
                filteredAnimals && filteredAnimals.length > 0 ?
                    <Carousel 
                        user={user}
                        origin={origin}
                        t={t}
                        imagePath={imagePath}
                        imagesPaths={imagesPaths}
                        animals={filteredAnimals}
                        page={page}
                        itemsPerPage={itemsPerPage}
                    />
                :
                    <div className='text-center mt-4'>
                        {t('user.animals.empty')}
                    </div>
        }
        </>
    )
}