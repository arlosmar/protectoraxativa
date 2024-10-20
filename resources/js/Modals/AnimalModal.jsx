import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { getDarkMode } from "@/Utils/Cookies";
import Grid from '@mui/material/Grid2';
import { date } from "@/Utils/Format"; 
import AnimalCard from "@/Pages/Animals/Card";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Search';

import Toast from '@/Components/Toast'; 

export default function AnimalModal({origin,t,show,setShow,images_path,animal,setAnimalEditItem,setShowEditAnimal,items,setItems}){

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
        setShow(false)
    }

    const handleEdit = (e) => {
        setAnimalEditItem(animal);        
        setShowEditAnimal(true);
    }

    const [ toastMsg, setToastMsg ] = useState('');
    const [ toastErrorMsg, setToastErrorMsg ] = useState('');
    const [ openToast, setOpenToast ] = useState(false);

    const handleDelete = (e) => {

        axios.delete(route('animal.delete',[animal?.id]))
        .then(function (response){            
            
            if(response.data.result){

                // update array to remove it from the list
                const removeElement = items.filter((item, index) => item?.id !== animal?.id);
                setItems(removeElement);

                // close modal
                setShow(false);

                // show message
                setToastMsg(t('trans.Deleted'));
                setOpenToast(true);
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

    const handleView = (e) => {
        
        var tag = '';
        switch(animal?.status_id){

            case 2: // adopted            
                tag = 'adopted';
                break;

            case 3: //'heaven':
                tag = 'heaven';
                break;

            case 1: //'adopt'
            default:
                tag = 'adopt';
                break;
        }

        window.location = route('user.animals',[tag])+'?view='+animal?.id;
    }

    return (
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={toastMsg}
            error={toastErrorMsg}
        />
        <Modal
            open={show}
            onClose={handleClose}
        >
            <Box sx={style} className='flex flex-col'>
                {/*
                <div className={`w-full flex items-center border-b`}>
                    <div className='w-full'>
                        {
                            origin === 'user-people' && 
                            <IconButton onClick={handleView} className='viewIcon'>
                                <ViewIcon/>
                            </IconButton>
                        }
                        {
                            origin === 'user-animals' &&
                            <>
                            <IconButton onClick={handleEdit} className='editIcon'>
                                <EditIcon/>
                            </IconButton>
                            <IconButton onClick={handleDelete} className='deleteIcon'>
                                <DeleteIcon/>
                            </IconButton>                          
                            </>
                        }
                    </div>
                    <div className=''>
                        <button 
                            type="button" 
                            className=""
                            data-modal-toggle="popup-modal"
                            onClick={handleClose}
                        >
                            <CloseIcon/>
                        </button>
                    </div>
                </div> 
                */}     
                <div className='flex flex-col overflow-y-auto hide-scroll'>
                    <AnimalCard 
                        t={t}
                        origin={origin}                     
                        animal={animal}
                        images_path={images_path}
                    />
                </div>

                {
                    (origin === 'user-people' || origin === 'user-animals') ?
                        <div className={`w-full flex items-center justify-between border-t py-1`}>                    
                            {
                                origin === 'user-people' && 
                                <IconButton onClick={handleView} className='viewIcon'>
                                    <ViewIcon sx={sxIcon}/>
                                </IconButton>
                            }
                            {
                                origin === 'user-animals' &&
                                <>
                                <IconButton onClick={handleEdit} className='editIcon'>
                                    <EditIcon sx={sxIcon}/>
                                </IconButton>
                                <IconButton onClick={handleDelete} className='deleteIcon'>
                                    <DeleteIcon sx={sxIcon}/>
                                </IconButton>                          
                                </>
                            }
                            <IconButton onClick={handleClose} className='closeIcon'>
                                <CloseIcon sx={sxIcon}/>
                            </IconButton>                         
                        </div>
                    :
                        <div className={`w-full flex items-center justify-end border-t py-1`}>
                            <IconButton onClick={handleClose} className='closeIcon'>
                                <CloseIcon sx={sxIcon}/>
                            </IconButton>                         
                        </div>
                }
                {/*
                <div className="flex justify-center mt-8">
                    {/*
                        origin === 'user-animals' ?
                            <div className='me-1'>
                                <button 
                                    className='animal-link-edit' 
                                    onClick={handleEdit}
                                >
                                    {t('trans.Edit')}
                                </button>
                            </div>
                        :
                            ''
                    */}
                {/*
                    <button className='cancel-button' onClick={handleClose}>
                        {t('trans.Close')}
                    </button>
                </div> 
                */}
            </Box>
        </Modal>
        </>
    )
}