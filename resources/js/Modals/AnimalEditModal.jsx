import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Input from '@/Components/Input';
import AnimalForm from '@/Forms/AnimalForm';

import { date } from "@/Utils/Format";

import Toast from '@/Components/Toast'; 

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import { modalStyle } from '@/Utils/Styles';

export default function AnimalEditModal({t,origin,show,setShow,items,setItems,item,setItem,position,
    options,subsection,imagesPaths,animals,setAnimals,filterUsed,setInternal,data,setData}){

    const { sx, sxIcon, sxIconClose } = modalStyle();

    const handleClose = () => {
        setShow(false);
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };

        /*
        const formData = new FormData();
        
        for(let i in data){          
            formData.append(i, data[i])            
        }  

        formData.append('id',item?.id ? item.id : null);
        */
        // {data,id: item?.id ? item.id : null}

        axios.post(route('animal.edit',[item?.id]),{data,id: item?.id ? item.id : null},config)
        .then(function (response){            
            
            if(response.data.result){                
                
                // update array to show directly on the list or info modal
                const newItem = data;
                newItem['updated_at'] = date(response.data.updated_at,false,false);
                newItem['birthdate'] = date(newItem['birthdate'],false,false);
                newItem['deathdate'] = date(newItem['deathdate'],false,false);
                newItem['date_entry'] = date(newItem['date_entry'],false,false);
                newItem['date_exit'] = date(newItem['date_exit'],false,false);
                newItem['date_entry2'] = date(newItem['date_entry2'],false,false);
                newItem['date_exit2'] = date(newItem['date_exit2'],false,false);

                if(response.data?.images?.image){
                    newItem['image'] = response.data.images.image;
                    data['image'] = newItem['image'];
                }

                if(response.data?.images?.image2){
                    newItem['image2'] = response.data.images.image2;
                    data['image2'] = newItem['image2'];
                }

                if(response.data?.images?.image_sponsored){
                    newItem['image_sponsored'] = response.data.images.image_sponsored;
                    data['image_sponsored'] = newItem['image_sponsored'];
                }

                // to see the updated info on the list
                // only if the status is the same as the subsection we are
                // if it is not the same, remove from list
                var sameStatus = false;

                // if dead it goes in heaven even if hidden
                if(newItem?.dead === 1){
                    if(subsection === 'heaven'){
                        sameStatus = true;
                    }
                }                
                else{
                    // dead null or false
                    if(newItem?.hidden === 1){
                        if(subsection === 'hidden'){
                            sameStatus = true;
                        }
                    }
                    else{
                        // hidden null or false
                        // dead null or false
                        if(                            
                            (
                                (
                                    !newItem?.status_id ||
                                    newItem?.status_id === ''  ||
                                    newItem?.status_id === 1
                                ) && 
                                subsection === 'adopt'
                            ) ||
                            (newItem?.status_id === 2 && subsection === 'adopted')
                        ){
                            sameStatus = true;
                        }
                    }
                }

                // edit                
                if(item){

                    if(sameStatus){

                        newItem['id'] = item?.id;                    
                        const editedItems = items;
                        editedItems[position] = newItem;
                        setItems(editedItems); 

                        setInternal(true);

                        // add to original items 
                        // if not using filters, position of the element is the same                    
                        if(filterUsed){
                            const findElementIndex = animals.findIndex((animal) => animal?.id === item?.id);
                            const newAnimals = animals;            
                            newAnimals[findElementIndex] = newItem; 
                            setAnimals(newAnimals);   
                        }
                        else{                           
                            setAnimals(editedItems);
                        }
                    }
                    else{
                        // remove element from list
                        const removeElement = items.filter((item, index) => index !== position);
                        setItems(removeElement);

                        // if filter applied it disappears from the list but when clicking remove filter
                        // it appears again. so we need to update original items
                        setInternal(true);

                        // if not using filters, the list is the same                  
                        if(filterUsed){
                            const removeElementOriginal = animals.filter((animal) => animal?.id !== item?.id);
                            setAnimals(removeElementOriginal);   
                        }
                        else{                    
                            setAnimals(removeElement);
                        }   
                    }
                    
                    // to see the updated info on the info modal
                    // the info modal is shown even if you change the status, so do always                    
                    setItem(data);
                }
                else{
                    // create

                    // to see the updated info on the list
                    // only if the status is the same as the subsection we are         
                    if(sameStatus){

                        // add to the filtered items even if it doesn't pass the filters
                        // because it would be strange not to be there when you create it
                        // it not we should check if it passes the filters
                        newItem['id'] = response.data.id;
                        newItem['code'] = response.data.code;                        
                        setItems([...items,newItem]);

                        // add to original items
                        setInternal(true);
                        setAnimals([...animals,newItem]);
                    }
                    else{                        
                        // do not add element to array
                    }
                }

                setShow(false);
            }
            else{
                // error                      
                setToastErrorMsg(response.data.error);
                setOpenToast(true);
            }                
        })
        .catch(function (error){            
            setToastErrorMsg(error);    
            setOpenToast(true);        
        }); 
    }

    const [ toastMsg, setToastMsg ] = useState('');
    const [ toastErrorMsg, setToastErrorMsg ] = useState('');
    const [ openToast, setOpenToast ] = useState(false);

    return (
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={toastMsg}
            error={toastErrorMsg}
        />
        <Modal open={show} onClose={handleClose}>

            <Box sx={sx} className='flex flex-col'>              
                
                <div className='modal-div'>
                    <h1 className='title-user-list'>
                        {item ? t('trans.Save') : t('trans.Create')}
                    </h1>
                    <AnimalForm                        
                        t={t}
                        origin={origin}
                        data={data}
                        setData={setData}                        
                        options={options}
                        edit={item ? true : false}
                        imagePath={                
                            item && item?.dead && (!item?.hidden || item?.hidden === null) ? 
                                imagesPaths?.animals_external
                            :
                                imagesPaths?.animals
                        }
                        handleSubmit={handleSubmit}
                    />
                </div>

                <div className={`w-full flex items-center justify-between border-t py-1`}>                    
                    <IconButton onClick={handleSubmit} className='saveIcon'>
                        <SaveIcon sx={sxIcon}/>
                    </IconButton> 
                    <IconButton onClick={handleClose} className='closeIcon'>
                        <CloseIcon sx={sxIconClose}/>
                    </IconButton>                         
                </div>
            </Box>
        
        </Modal>
        </>
    )
}