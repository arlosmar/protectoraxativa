import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { getDarkMode } from "@/Utils/Cookies";
import { useForm } from '@inertiajs/react';

import Input from '@/Components/Input';
import PersonForm from '@/Forms/PersonForm';

import { date, date2db } from "@/Utils/Format";

import Toast from '@/Components/Toast'; 

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

export default function PersonEditModal({t,show,setShow,items,setItems,item,setItem,position}){

    const { data, setData, reset } = useForm(/*{
        'name' : item ? item?.name : null,
        'surname' : item ? item?.surname : null,
        'dni'    : item ? item?.dni : null,
        'birthdate' : item ? date2db(item?.birthdate) : null,        
        'email' : item ? item?.email : null,
        'phone' : item ? item?.phone : null,
        'address' : item ? item?.address : null,
        'name2' : item ? item?.name2 : null,
        'surname2' : item ? item?.surname2 : null,
        'dni2'    : item ? item?.dni2 : null,
        'birthdate2' : item ? date2db(item?.birthdate2) : null,        
        'email2' : item ? item?.email2 : null,
        'phone2' : item ? item?.phone2 : null,
        'address2' : item ? item?.address2 : null,
        'description' : item ? item?.description : null,
        'animals'   : item ? item?.animals : null
    }*/);

    useEffect(() => {
        setData({...data, 
            'name' : item ? item?.name : null,
            'surname' : item ? item?.surname : null,
            'dni'    : item ? item?.dni : null,
            'birthdate' : item ? date2db(item?.birthdate) : null,        
            'email' : item ? item?.email : null,
            'phone' : item ? item?.phone : null,
            'address' : item ? item?.address : null,
            'name2' : item ? item?.name2 : null,
            'surname2' : item ? item?.surname2 : null,
            'dni2'    : item ? item?.dni2 : null,
            'birthdate2' : item ? date2db(item?.birthdate2) : null,        
            'email2' : item ? item?.email2 : null,
            'phone2' : item ? item?.phone2 : null,
            'address2' : item ? item?.address2 : null,
            'description' : item ? item?.description : null,
            'animals'   : item ? item?.animals : null
        });
    },[item]);

    const darkmode = getDarkMode();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '98%',
        maxWidth: 600,
        maxHeight: '99%',
        bgcolor: darkmode ? "black" : "background.paper",
        border: darkmode ? "1px solid #fff" : "1px solid #000",
        borderRadius: '5px',
        boxShadow: 24,
        px: 1,
        pt: 1,
        pb: 0,
        m: 0
    };

    const sxIcon = {
        fontSize: '35px'
    };

    const handleClose = () => {
        setShow(false);
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        axios.patch(route('person.edit',[item?.id]),{data,id: item?.id ? item.id : null})
        .then(function (response){            
            
            if(response.data.result){
                
                // update array to show directly on the list or info modal
                const newItem = data;
                newItem['birthdate'] = date(newItem['birthdate']);
                newItem['birthdate2'] = date(newItem['birthdate2']);

                // edit
                if(item){
                    
                    newItem['id'] = item?.id;                    
                    const editedItems = items;            
                    editedItems[position] = newItem; 
                    setItems(editedItems);             
                    
                    // to see the updated info on the info modal
                    setItem(data);
                }
                else{
                    // create            
                    setItems([...items,newItem]);
                }

                setShow(false);
            }
            else{
                // error                      
                setToastMsg(response.data.error);
                setOpenToast(true);
            }                
        })
        .catch(function (error){            
            setToastMsg(error);    
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
                <div className='flex flex-col overflow-y-auto hide-scroll'>
                    <h1 className='title-user-list'>
                        {item ? t('trans.Save') : t('trans.Create')}
                    </h1>
                    <PersonForm                        
                        t={t}                        
                        data={data}
                        setData={setData}                        
                        edit={item ? true : false}
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