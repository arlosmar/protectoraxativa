import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { getDarkMode } from "@/Utils/Cookies";
import { useForm } from '@inertiajs/react';

import Input from '@/Components/Input';
import AnimalForm from '@/Forms/AnimalForm';

import { date, date2db } from "@/Utils/Format";

import Toast from '@/Components/Toast'; 

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

export default function AnimalEditModal({origin,t,show,setShow,items,setItems,
    item,setItem,position,options,subsection,images_path}){

    const { data, setData, reset } = useForm(/*{
        'code' : item ? item?.code : null,
        'status_id' : item ? item?.status_id : null,
        'status'    : item ? item?.status : null,
        'sponsor_id' : item ? item?.sponsor_id : null,
        'sponsor'    : item ? item?.sponsor : null,
        'type_id' : item ? item?.type_id : null,
        'type'    : item ? item?.type : null,
        'age_id' : item ? item?.age_id : null,
        'age'    : item ? item?.age : null,
        'gender_id' : item ? item?.gender_id : null,
        'gender'    : item ? item?.gender : null,
        'size_id' : item ? item?.size_id : null,
        'size'    : item ? item?.size : null,
        'breed_id' : item ? item?.breed_id : null,
        'breed'    : item ? item?.breed : null,
        'name' : item ? item?.name : null,
        'weight' : item ? item?.weight : null,
        'birthdate' : item ? date2db(item?.birthdate) : null,
        'deathdate' : item ? date2db(item?.deathdate) : null,
        'description' : item ? item?.description : null,
        'location' : item ? item?.location : null,
        'image' : item ? item?.image : null,
        'image_file' : null,
        'image2' : item ? item?.image2 : null,
        'image2_file' : null,
        'person_id' : item ? item?.person_id : null,
        'person'    : item ? item?.person : null,
        'person_name' : item ? item?.person_name : null
    }*/);

    useEffect(() => {
        //setData('name', item ? item?.name : '');        
        setData({...data, 
            'code' : item ? item?.code : null,
            'status_id' : item ? item?.status_id : null,
            'status'    : item ? item?.status : null,
            'sponsor_id' : item ? item?.sponsor_id : null,
            'sponsor'    : item ? item?.sponsor : null,
            'type_id' : item ? item?.type_id : null,
            'type'    : item ? item?.type : null,
            'age_id' : item ? item?.age_id : null,
            'age'    : item ? item?.age : null,
            'gender_id' : item ? item?.gender_id : null,
            'gender'    : item ? item?.gender : null,
            'size_id' : item ? item?.size_id : null,
            'size'    : item ? item?.size : null,
            'breed_id' : item ? item?.breed_id : null,
            'breed'    : item ? item?.breed : null,
            'name' : item ? item?.name : null,
            'weight' : item ? item?.weight : null,
            'birthdate' : item ? date2db(item?.birthdate) : null,
            'deathdate' : item ? date2db(item?.deathdate) : null,
            'description' : item ? item?.description : null,
            'location' : item ? item?.location : null,
            'image' : item ? item?.image : null,
            'image_file' : null,
            'image2' : item ? item?.image2 : null,
            'image2_file' : null,
            'video' : item ? item?.video : null,
            'video2' : item ? item?.video2 : null,
            'person_id' : item ? item?.person_id : null,
            'person'    : item ? item?.person : null,
            'person_name' : item ? item?.person_name : null
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
        //m: 1,
        m: 0,
        // to have scroll
        /*
        display: "flex",
        flexDirection: "column",
        //height: 700,
        //overflow: "hidden",
        overflowY: "auto",
        // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        */
    };

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
                newItem['birthdate'] = date(newItem['birthdate']);
                newItem['deathdate'] = date(newItem['deathdate']);

                if(response.data?.images?.image){
                    newItem['image'] = response.data.images.image;
                    data['image'] = newItem['image'];
                }

                if(response.data?.images?.image2){
                    newItem['image2'] = response.data.images.image2;
                    data['image2'] = newItem['image2'];
                }

                // to see the updated info on the list
                // only if the status is the same as the subsection we are
                // if it is not the same, remove from list
                var sameStatus = false;

                if(
                    (newItem?.status_id === 1 && subsection === 'adopt') ||
                    (newItem?.status_id === 2 && subsection === 'adopted') ||
                    (newItem?.status_id === 3 && subsection === 'heaven')
                ){
                    sameStatus = true;
                }

                // edit
                if(item){

                    if(sameStatus){
                        newItem['id'] = item?.id;                    
                        const editedItems = items;            
                        editedItems[position] = newItem; 
                        setItems(editedItems);            
                    }
                    else{
                        // remove element from list
                        const removeElement = items.filter((item, index) => index !== position);
                        setItems(removeElement);
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
                        setItems([...items,newItem]);
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

            <Box sx={style} className='flex flex-col'>              
                <div className='flex flex-col overflow-y-auto hide-scroll'>
                    <h1 className='title-user-list'>
                        {item ? t('trans.Save') : t('trans.Create')}
                    </h1>
                    <AnimalForm
                        origin={origin}
                        t={t}
                        data={data}
                        setData={setData}                        
                        options={options}
                        edit={item ? true : false}
                        images_path={images_path}
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