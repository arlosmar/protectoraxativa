import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { date } from "@/Utils/Format"; 
import PersonCard from "@/Pages/People/Card";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';

import Toast from '@/Components/Toast'; 

import DeleteModal from '@/Modals/DeleteModal';
import ShareModal from '@/Modals/ShareModal';

import { modalStyle } from '@/Utils/Styles';

import { date2db } from "@/Utils/Format";

export default function PersonModal({origin,t,show,setShow,imagesPaths,person,
    setPersonEditItem,setShowEditPerson,items,setItems,people,setPeople,setInternal,filterUsed,setData}){

    const [ share , setShare ] = useState(false);

    const style = modalStyle();

    const sxIcon = {
        fontSize: '35px'
    };

    const handleClose = () => {
        setShow(false)
    }

    const handleEdit = (e) => {
        setData({ 
            'name' : person ? person?.name : null,
            'surname' : person ? person?.surname : null,
            'dni'    : person ? person?.dni : null,
            'birthdate' : person ? date2db(person?.birthdate) : null,        
            'email' : person ? person?.email : null,
            'phone' : person ? person?.phone : null,
            'address' : person ? person?.address : null,
            'name2' : person ? person?.name2 : null,
            'surname2' : person ? person?.surname2 : null,
            'dni2'    : person ? person?.dni2 : null,
            'birthdate2' : person ? date2db(person?.birthdate2) : null,        
            'email2' : person ? person?.email2 : null,
            'phone2' : person ? person?.phone2 : null,
            'address2' : person ? person?.address2 : null,
            'other_people' : person ? person?.other_people : null,
            'description' : person ? person?.description : null,
            'animals'   : person ? person?.animals : null,
            'users'   : person ? person?.users : null,
            'users_items'   : person ? person?.users_items : null,
            'users_ids'   : null
        });
        setPersonEditItem(person);        
        setShowEditPerson(true);
    }

    const [ toastMsg, setToastMsg ] = useState('');
    const [ toastErrorMsg, setToastErrorMsg ] = useState('');
    const [ openToast, setOpenToast ] = useState(false);

    const [ deleteConfirm , setDeleteConfirm ] = useState(false);

    const handleConfirmDelete = (e) => {
        setDeleteConfirm(true);
    }

    const handleDelete = (e) => {

        setDeleteConfirm(false);

        axios.post(route('person.delete',[person?.id]))
        .then(function (response){            
            
            if(response.data.result){

                // update array to remove it from the list
                const removeElement = items.filter((item, index) => item?.id !== person?.id);
                setItems(removeElement);

                // if filter applied it disappears from the list but when clicking remove filter
                // it appears again. so we need to update original items
                setInternal(true);

                // if not using filters, the list is the same                  
                if(filterUsed){
                    const removeElementOriginal = people.filter((item, index) => item?.id !== person?.id);
                    setPeople(removeElementOriginal);   
                }
                else{                    
                    setPeople(removeElement);
                }

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
        window.location = route('admin.people')+'?view='+person?.id;
    }

    const handleShare = async () => {

        // if native mobile share        
        if(navigator?.share) {
            
            try{
                const shareData = {
                    title: t('share.title-native'),
                    //text: t('trans.text'),
                    url: route('admin.people')+'?view='+person?.id
                };
                await navigator.share(shareData);
                onSuccess?.();
            }
            catch(err){           
                //onError?.(err);
                // if user cancels the sharing it goes here as well                
            }
        } 
        else{
            // if no native mobile share, show popup
            setShare(true);
        }
    }

    return (
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={toastMsg}
            error={toastErrorMsg}
        />
        <ShareModal
            t={t}
            show={share}
            setShow={setShare}
            link={route('admin.people')+'?view='+person?.id}          
        />
        <DeleteModal
            t={t}
            show={deleteConfirm}
            setShow={setDeleteConfirm}
            handleDelete={handleDelete}
        />
        <Modal
            open={show}
            onClose={handleClose}
        >
            <Box sx={style} className='flex flex-col'>
                {/*
                <div className={`w-full flex items-center mb-2`}>
                    <div className='w-full'>
                        {
                            origin === 'user-animals' && 
                            <IconButton onClick={handleView} id='viewIcon'>
                                <ViewIcon/>
                            </IconButton>
                        }
                        {
                            origin === 'user-people' &&
                            <>
                            <IconButton onClick={handleEdit} id='editIcon'>
                                <EditIcon/>
                            </IconButton>
                            <IconButton onClick={handleDelete} id='deleteIcon'>
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
                <div className='modal-div'>
                    <PersonCard 
                        t={t}
                        origin={origin} 
                        person={person}
                        imagePath={imagesPaths?.people}
                        imagesPaths={imagesPaths}                        
                    />
                </div>

                {
                    (origin === 'user-people' || origin === 'user-animals') &&
                    <div className={`w-full flex items-center justify-between border-t py-1`}>                    
                        <IconButton onClick={handleShare} className='shareIcon'>
                            <ShareIcon sx={sxIcon}/>
                        </IconButton> 
                        {
                            origin === 'user-animals' && 
                            <IconButton onClick={handleView} className='viewIcon'>
                                <ViewIcon sx={sxIcon}/>
                            </IconButton>
                        }
                        {
                            origin === 'user-people' &&
                            <>
                            <IconButton onClick={handleEdit} className='editIcon'>
                                <EditIcon sx={sxIcon}/>
                            </IconButton>
                            <IconButton onClick={handleConfirmDelete} className='deleteIcon'>
                                <DeleteIcon sx={sxIcon}/>
                            </IconButton>                          
                            </>
                        }
                        <IconButton onClick={handleClose} className='closeIcon'>
                            <CloseIcon sx={sxIcon}/>
                        </IconButton>                         
                    </div>
                }
            </Box>
        </Modal>
        </>
    )
}