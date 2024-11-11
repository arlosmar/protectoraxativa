import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Input from '@/Components/Input';
import NewsForm from '@/Forms/NewsForm';

import { date, date2db, inputDateWithOffsetToDbDate } from "@/Utils/Format";

import Toast from '@/Components/Toast'; 

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import { modalStyle } from '@/Utils/Styles';

export default function NewsEditModal({origin,t,show,setShow,data,setData,items,setItems,item,setItem,position,
    options,news,setNews,filterUsed,setInternal,imagesPaths}){

    const style = modalStyle();

    const sxIcon = {
        fontSize: '35px'
    };

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

        // remove offset from date

        // 2024-12-01T12:00
        var dateWithOffset = data?.date;
        var dbDateUTC = inputDateWithOffsetToDbDate(dateWithOffset);

        data['date_db'] = dbDateUTC;

        axios.post(route('news.edit',[item?.id]),{data,id: item?.id ? item.id : null},config)        
        .then(function (response){            
            
            if(response.data.result){

                setInternal(true);
                
                // update array to show directly on the list or info modal
                const newItem = data;                
                newItem['date'] = date(newItem['date'],true);

                if(response.data?.images?.image){
                    newItem['image'] = response.data.images.image;
                    data['image'] = newItem['image'];
                }

                // edit
                if(item){
                    
                    // add to the filtered items even if it doesn't pass the filters
                    // because it would be strange not to be there when you edit it
                    // it not we should check if it passes the filters
                    newItem['id'] = item?.id;                    
                    const editedItems = items;            
                    editedItems[position] = newItem; 
                    setItems(editedItems);          

                    // add to original items 
                    // if not using filters, position of the element is the same                    
                    if(filterUsed){
                        const findElementIndex = news.findIndex((element) => element?.id === item?.id);
                        const newNews = news;            
                        newNews[findElementIndex] = newItem; 
                        setNews(newNews);   
                    }
                    else{
                        setNews(editedItems);
                    }
                        
                    // to see the updated info on the info modal
                    setItem(data);
                }
                else{
                    // create      

                    // add to the filtered items even if it doesn't pass the filters
                    // because it would be strange not to be there when you create it
                    // it not we should check if it passes the filters
                    newItem['id'] = response.data.id;                     
                    setItems([...items,newItem]);    

                    // add to original items
                    setNews([...news,newItem]);      
                }

                setShow(false);
            }
            else{
                // error  
                setToastMsg('');                    
                setToastErrorMsg(response.data.error);
                setOpenToast(true);
            }                
        })
        .catch(function (error){  
            setToastMsg('');          
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

            <Box sx={style} className='flex flex-col'>
                
                <div className='modal-div'>
                    <h1 className='title-user-list'>
                        {item ? t('trans.Save') : t('trans.Create')}
                    </h1>
                    <NewsForm                        
                        origin={origin}
                        t={t}                        
                        data={data}
                        setData={setData}   
                        options={options}                     
                        edit={item ? true : false}                        
                        imagePath={imagesPaths?.news}
                        handleSubmit={handleSubmit}
                    />
                </div>

                <div className={`w-full flex items-center justify-between border-t py-1`}>                    
                    <IconButton onClick={handleSubmit} className='saveIcon'>
                        <SaveIcon sx={sxIcon}/>
                    </IconButton> 
                    <IconButton onClick={handleClose} className='closeIcon'>
                        <CloseIcon sx={sxIcon}/>
                    </IconButton>                         
                </div>               
            </Box>
        
        </Modal>
        </>
    )
}