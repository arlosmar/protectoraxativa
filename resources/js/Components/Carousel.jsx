import { useState, useEffect } from 'react';
import { date } from "@/Utils/Format"; 
// date()

// import * as format from "@/Utils/Format";
// format.date()
import Grid from '@mui/material/Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
//import ListSubheader from '@mui/material/ListSubheader';

import Pagination from '@/Components/Pagination';

import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import AnimalModal from "@/Modals/AnimalModal";

import { itemsPerPageCarousel } from "@/Utils/Variables";

import { getParameter } from "@/Utils/Variables";

export default function Carousel({t,origin,images_path,animals,page}){

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

        const itemsPerPage = itemsPerPageCarousel();
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

        return (
            <>             
            <AnimalModal
                origin={origin}         
                t={t}
                show={showAnimal}
                setShow={setShowAnimal}      
                animal={animalItem}  
                images_path={images_path}        
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

                            if(item?.birthdate || item?.deathdate){

                                if(item?.birthdate){
                                    subtitle = date(item?.birthdate,false,false);                                    
                                }
                                else{
                                    subtitle = '?';
                                }

                                if(item?.deathdate){
                                    subtitle = subtitle + ' - ' + date(item?.deathdate,false,false);                                    
                                }
                                else{
                                    subtitle = subtitle + ' - ?';
                                }
                            }
                        }
                        else{                        

                            var peopleArray = [];

                            if(item?.person?.name && item?.person?.name.length > 0){
                                
                                var person1 = item?.person?.name;

                                if(item?.person?.surname && item?.person?.surname.length > 0){
                                   person1 = person1 + ' ' + item?.person?.surname;
                                }

                                peopleArray.push(person1);
                            }

                            if(item?.person?.name2 && item?.person?.name2.length > 0){
                                
                                var person2 = item?.person?.name2;

                                if(item?.person?.surname2 && item?.person?.surname2.length > 0){
                                   person2 = person2 + ' ' + item?.person?.surname2;
                                }

                                peopleArray.push(person2);
                            }

                            subtitle = peopleArray.join(' / ');
                        }

                        return (
                            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                                <ImageListItem 
                                    key={images_path+item?.image}
                                    onClick={() => handleInfo(item)}
                                    className='cursor-pointer'
                                >
                                    <img
                                        srcSet={`${images_path+item?.image}`}
                                        src={`${images_path+item?.image}`}
                                        alt={item?.name}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar 
                                        title={item?.name}
                                        subtitle={subtitle}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}                                            
                                                onClick={() => handleInfo(item)}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
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