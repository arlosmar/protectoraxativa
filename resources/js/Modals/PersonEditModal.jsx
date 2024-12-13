import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useForm } from '@inertiajs/react';

import Input from '@/Components/Input';
import PersonForm from '@/Forms/PersonForm';

import { date } from "@/Utils/Format";

import Toast from '@/Components/Toast'; 

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import { modalStyle } from '@/Utils/Styles';

export default function PersonEditModal({t,show,setShow,items,setItems,item,setItem,position,people,
    setPeople,filterUsed,setInternal,options,data,setData}){

    const { sx, sxIcon, sxIconClose } = modalStyle();

    const handleClose = () => {
        setShow(false);
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        axios.patch(route('person.edit',[item?.id]),{data,id: item?.id ? item.id : null})
        .then(function (response){            
            
            if(response.data.result){

                setInternal(true);
                
                // update array to show directly on the list or info modal
                const newItem = data;
                newItem['birthdate'] = date(newItem['birthdate'],false,false);
                newItem['birthdate2'] = date(newItem['birthdate2'],false,false);
                newItem['users_items'] = newItem['users_ids'];

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
                        const findElementIndex = people.findIndex((person) => person?.id === item?.id);
                        const newPeople = people;            
                        newPeople[findElementIndex] = newItem; 
                        setPeople(newPeople);   
                    }
                    else{
                        setPeople(editedItems);
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
                    setPeople([...people,newItem]);      
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

            <Box sx={sx} className='flex flex-col'>
                
                <div className='modal-div'>
                    <h1 className='title-user-list'>
                        {item ? t('trans.Save') : t('trans.Create')}
                    </h1>
                    <PersonForm                        
                        t={t}                        
                        data={data}
                        setData={setData}                        
                        edit={item ? true : false}
                        handleSubmit={handleSubmit}
                        options={options}                        
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