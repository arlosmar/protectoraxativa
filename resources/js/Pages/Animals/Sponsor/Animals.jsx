import Carousel from '@/Components/Carousel';
import CircularProgress from '@mui/material/CircularProgress';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';

import FilterAnimals from '@/Pages/Animals/FilterAnimals';

export default function Animals({t,animals,images_path,page,loading,options}){

    const [ filteredAnimals, setFilteredAnimals ] = useState(animals);

    const [ openSearch, setOpenSearch ] = useState(false);

    const handleOpenSearch = (e) => {
        setOpenSearch(!openSearch);
    };

    // when loading animals each time when clicking the tab
    useEffect(() => {
        setFilteredAnimals(animals);
    },[animals]);

    return (
        <>
       <h1 className='title-carousel'>            
            <IconButton className='hiddenIcon'>
                <AddCircleIcon sx={{ fontSize: '50px' }}/>
            </IconButton>
            <Box sx={{ flexGrow: 1 }}/>
            {t('animals.sponsor.animals.title')}
            {
                !loading && filteredAnimals?.length > 0 && ' ('+filteredAnimals?.length+')'                
            }            
            <Box sx={{ flexGrow: 1 }}/>
            <IconButton onClick={handleOpenSearch} id='filter'>
                <FilterListIcon sx={{ fontSize: '50px' }}/>
            </IconButton>
        </h1>
        <FilterAnimals
            origin='sponsor'
            t={t}                                
            openSearch={openSearch}                    
            setOpenSearch={setOpenSearch}
            originalItems={animals}
            items={filteredAnimals}
            setItems={setFilteredAnimals}
            options={options}
        />
        {
            loading ?
                <div className='text-center'>
                    <CircularProgress sx={{color:"#FF8C00"}}/>
                </div>
            :
                <Carousel 
                    origin='sponsor'
                    t={t}
                    images_path={images_path}
                    animals={filteredAnimals}
                    page={page}
                />
        }
        </>
    )
}