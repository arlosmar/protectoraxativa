import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
//import ListSubheader from '@mui/material/ListSubheader';

import Pagination from '@/Components/Pagination';

//import IconButton from '@mui/material/IconButton';
//import InfoIcon from '@mui/icons-material/Info';

import AnimalModal from "@/Modals/AnimalModal";

import { getParameter } from "@/Utils/Variables";

import { peopleNames, yearsFormatted } from "@/Utils/Format"; 

export default function Carousel({user,t,origin,imagePath,imagesPaths,animals,page,itemsPerPage}){

    if(animals && animals.length > 0){
      
        const [ showAnimal, setShowAnimal ] = useState(false);
        const [ animalItem, setAnimalItem ] = useState(null);

        // check if concrete item by parameter. it is the id of the element
        const parameter = parseInt(getParameter('view'));

        var parameterPos = false;
        if(parameter){
            
            parameterPos = animals.findIndex(animal => animal?.id === parameter);

            // add 1 because pos 0 means element 1
            if(parameterPos !== -1){
                parameterPos++;
            }
            else{
                parameterPos = false; // we can use 0
            }
        }

        const length = animals && animals.length ? animals.length : 0;    
        const pages = Math.ceil(length/itemsPerPage);
        const [ pageCurrent, setPageCurrent ] = useState(parameterPos ? Math.min(Math.ceil(parameterPos/itemsPerPage),pages) : page ? Math.min(page,pages) : 1);

        //const [ pageCurrent, setPageCurrent ] = useState(page ? Math.min(page,pages) : 1);

        // check if initial page on the url we are not out of the limits
        const [ from, setFrom ] = useState((pageCurrent-1)*itemsPerPage);
        const [ to, setTo ] = useState(Math.min((pageCurrent*itemsPerPage)-1,length-1));

        useEffect(() => {
            setFrom((pageCurrent-1)*itemsPerPage);
            setTo(Math.min((pageCurrent*itemsPerPage)-1,length-1));
        },[pageCurrent]);

        const handleInfo = (item) => {            
            setAnimalItem(item);
            setShowAnimal(true);
        };

        useEffect(() => {
            if(parameterPos){
                handleInfo(animals[parameterPos-1]);
            }
        },[]);

        const sxListItemBar = {
            "& .MuiImageListItemBar-titleWrap": { 
                padding: '5px 10px',
                textAlign: 'center'
            } 
        };

        return (
            <>             
            <AnimalModal
                user={user}
                origin={origin}         
                t={t}
                show={showAnimal}
                setShow={setShowAnimal}      
                animal={animalItem} 
                imagePath={imagePath} 
                imagesPaths={imagesPaths}        
            />
            <Pagination      
                origin={origin}
                pages={pages}
                pageCurrent={pageCurrent}
                setPageCurrent={setPageCurrent}
            /> 
            <Grid container spacing={2} className=''>            
            {/*<ImageList cols={4} rowHeight='auto'>*/}
                {
                    //Array.apply(null,Array(to-from+1)).map((x,i) => {
                    animals.slice(from,to+1).map((item,i) => {

                        var subtitle = '';
                        var action = '';
                        var imageClassname = '';

                        if(origin && origin === 'heaven'){
                            subtitle = yearsFormatted(item?.birthdate_year,item?.deathdate_year);                
                        }
                        else{
                            if(origin && origin === 'sponsored'){                        

                                subtitle = peopleNames(item?.person);

                                if(subtitle.length === 0){
                                    subtitle = '-';
                                }
                            }
                        }

                        var imgPath = '/images/animalgeneric.jpeg';
                        if(item?.image && item?.image.length > 0){
                            imgPath = imagePath+item?.image;
                        }

                        return (
                            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                                <ImageListItem 
                                    key={imgPath}
                                    onClick={() => handleInfo(item)}
                                    className='cursor-pointer'                                    
                                >
                                    <img
                                        srcSet={imgPath}
                                        src={imgPath}
                                        alt={item?.name}
                                        loading="lazy"
                                        className='carousel-image'
                                    />
                                    <ImageListItemBar 
                                        sx={sxListItemBar}
                                        title={item?.name}
                                        subtitle={subtitle}
                                        /*
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}                                            
                                                onClick={() => handleInfo(item)}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                        */
                                    />
                                </ImageListItem>
                            </Grid>
                        )
                    })
                }
            </Grid>
            {/*</ImageList>*/}                
            <Pagination      
                origin={origin}
                pages={pages}
                pageCurrent={pageCurrent}
                setPageCurrent={setPageCurrent}
            />
            </>
        )
    }
}