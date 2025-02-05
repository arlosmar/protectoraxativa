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
        const [ parameter, setParameter ] = useState(parseInt(getParameter('view')));

        var parameterPos = false;
        if(parameter && animals && animals.length > 0){
            
            parameterPos = animals.findIndex(animal => animal?.id === parameter);

            // add 1 because pos 0 means element 1
            if(parameterPos !== -1){
                parameterPos++;
            }
            else{
                parameterPos = false; // we can use 0
            }
        }

        const [ length, setLength ] = useState(animals && animals.length ? animals.length : 0);
        const [ pages, setPages ] = useState(Math.ceil(length/itemsPerPage));
        const [ pageCurrent, setPageCurrent ] = useState(parameterPos ? Math.min(Math.ceil(parameterPos/itemsPerPage),pages) : page ? Math.min(page,pages) : 1);

        //const [ pageCurrent, setPageCurrent ] = useState(page ? Math.min(page,pages) : 1);

        // check if initial page on the url we are not out of the limits
        const [ from, setFrom ] = useState((pageCurrent-1)*itemsPerPage);
        const [ to, setTo ] = useState(Math.min((pageCurrent*itemsPerPage)-1,length-1));

        useEffect(() => {
            setFrom((pageCurrent-1)*itemsPerPage);
            setTo(Math.min((pageCurrent*itemsPerPage)-1,length-1));
        },[pageCurrent]);

        // when filtering
        const setValues = (list) => {

            var newLength = list && list.length ? list.length : 0;
            setLength(newLength);
            var newPages = Math.max(1,Math.ceil(newLength/itemsPerPage)); // in case 0 items
            setPages(newPages);
            
            // show initial value
            parameterPos = false;
            if(parameter && animals && animals.length > 0){
                
                parameterPos = animals.findIndex(item => item?.id === parameter);

                // add 1 because pos 0 means element 1
                if(parameterPos !== -1){
                    parameterPos++;
                    handleInfo(animals[parameterPos-1],parameterPos-1); 
                }
                else{
                    parameterPos = false; // we can use 0 instead of false
                }

                // remove parameter to avoid doing this every time we change a page or items per page
                setParameter(null);
            }    

            //setPageCurrent(parameterPos ? Math.min(Math.ceil(parameterPos/itemsPerPage),newPages) : page ? Math.min(page,newPages) : 1);            
            var newPageCurrent = parameterPos ? Math.min(Math.ceil(parameterPos/itemsPerPage),newPages) : Math.min(pageCurrent,newPages);
            setPageCurrent(newPageCurrent);

            // the useEffect for pageCurrent is not called, so changing from and to here
            // maybe you cannot call useEffect twice?
            setFrom((newPageCurrent-1)*itemsPerPage);
            setTo(Math.min((newPageCurrent*itemsPerPage)-1,newLength-1));
        }

        useEffect(() => {
            setValues(animals);
        },[animals]);

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
                        if(
                            (item?.image && item?.image.length > 0) ||
                            (item?.image2 && item?.image2.length > 0) ||
                            (item?.image_sponsored && item?.image_sponsored.length > 0)
                        ){
                            var imgToUse = null;
                            if(origin === 'adopted' || origin === 'sponsored'){
                                imgToUse = item?.image_sponsored;
                            }

                            // if adopted/sponsored but not image_sponsored OR
                            // if any other origin                            
                            if(!imgToUse || imgToUse.length === 0){                                
                                imgToUse = item?.image && item?.image.length > 0 ? item?.image : item?.image2;
                            }

                            imgPath = imagePath+imgToUse;
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