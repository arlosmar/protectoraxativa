import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { date } from "@/Utils/Format"; 
import AnimalCard from "@/Pages/Animals/Card";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';

import Toast from '@/Components/Toast'; 

import DeleteModal from '@/Modals/DeleteModal';
import ShareModal from '@/Modals/ShareModal';

import { modalStyle } from '@/Utils/Styles';
import { date2db } from "@/Utils/Format";

export default function AnimalModal({user,origin,t,show,setShow,imagePath,imagesPaths,
    animal,setAnimalEditItem,setShowEditAnimal,items,setItems,
    animals,setAnimals,setInternal,filterUsed,setData}){

    const [ link , setLink ] = useState('');
    const [ adminLink , setAdminLink ] = useState('');

    const style = modalStyle();

    const sxIcon = {
        fontSize: '35px'
    };

    const handleClose = () => {
        setShow(false)
    }

    const handleEdit = (e) => {
        setData({
            'updated_at' : animal ? date2db(animal?.updated_at) : null,
            'code' : animal ? animal?.code : null,
            'hidden' : animal ? animal?.hidden : 0,
            'status_id' : animal ? animal?.status_id : null,
            'status'    : animal ? animal?.status : null,
            'sponsor_id' : animal ? animal?.sponsor_id : null,
            'sponsor'    : animal ? animal?.sponsor : null,
            'type_id' : animal ? animal?.type_id : null,
            'type'    : animal ? animal?.type : null,
            'age_id' : animal ? animal?.age_id : null,
            'age'    : animal ? animal?.age : null,
            'gender_id' : animal ? animal?.gender_id : null,
            'gender'    : animal ? animal?.gender : null,
            'size_id' : animal ? animal?.size_id : null,
            'size'    : animal ? animal?.size : null,
            'breed_id' : animal ? animal?.breed_id : null,
            'breed'    : animal ? animal?.breed : null,
            'name' : animal ? animal?.name : null,
            'weight' : animal ? animal?.weight : null,
            'birthdate' : animal ? date2db(animal?.birthdate) : null,
            'dead' : animal ? animal?.dead : 0,
            'deathdate' : animal ? date2db(animal?.deathdate) : null,
            'description' : animal ? animal?.description : null,
            'location' : animal ? animal?.location : null,
            'image' : animal ? animal?.image : null,
            'image_file' : null,
            'image2' : animal ? animal?.image2 : null,
            'image2_file' : null,
            'image_sponsored' : animal ? animal?.image_sponsored : null,
            'image_sponsored_file' : null,
            'video' : animal ? animal?.video : null,
            'video2' : animal ? animal?.video2 : null,
            'person_id' : animal ? animal?.person_id : null,
            'person'    : animal ? animal?.person : null,
            'person_name' : animal ? animal?.person_name : null,
            'vaccines' : animal ? animal?.vaccines : null,
            'treatment' : animal ? animal?.treatment : null,
            'castrated' : animal ? animal?.castrated : 0,
            'date_entry' : animal ? date2db(animal?.date_entry) : null,
            'date_exit' : animal ? date2db(animal?.date_exit) : null,
            'date_entry2' : animal ? date2db(animal?.date_entry2) : null,
            'date_exit2' : animal ? date2db(animal?.date_exit2) : null,            
            'internal' : animal ? animal?.internal : null,
        });
        setAnimalEditItem(animal);        
        setShowEditAnimal(true);
    }

    const [ toastMsg, setToastMsg ] = useState('');
    const [ toastErrorMsg, setToastErrorMsg ] = useState('');
    const [ openToast, setOpenToast ] = useState(false);

    const [ deleteConfirm , setDeleteConfirm ] = useState(false);
    const [ share , setShare ] = useState(false);

    const handleConfirmDelete = (e) => {
        setDeleteConfirm(true);
    }

    const getShareLink = () => {

        var tag = '';
        var subtag = '';
        var tagAdmin = '';

        // if coming from user
        if(origin === 'user-animals' || origin === 'user-people'){

            /*
            share external link because maybe you want to share with general public
            if(animal?.hidden){
                tag = 'hidden';
            }
            else{
                if(animal?.dead){
                    tag = 'heaven';
                }
                else{

                    switch(animal?.status_id){

                        case 2: // adopted            
                            tag = 'adopted';
                            break;

                        case 1: //'adopt'
                            tag = 'adopt';
                            break;
                    }
                }
            }

            setLink(route('admin.animals',[tag])+'?view='+animal?.id);
            */

            if(animal?.dead){
                // private link
                if(animal?.hidden){
                    tag = 'heaven';
                    setLink(route('admin.animals',[tag])+'?view='+animal?.id);
                }
                else{
                    // public link
                    tag = 'heaven';
                    subtag = 'animals';
                    setLink(route('animals',[tag,subtag])+'?view='+animal?.id);
                }
            }            
            else{
                // if hidden, internal link
                if(animal?.hidden){
                    tag = 'hidden';
                    setLink(route('admin.animals',[tag])+'?view='+animal?.id);
                }
                else{

                    switch(animal?.status_id){

                        case 2: // adopted    
                            // internal link        
                            tag = 'adopted';
                            setLink(route('admin.animals',[tag])+'?view='+animal?.id);
                            break;

                        case 1: //'adopt'
                        default:

                            // potentially sponsor
                            if(animal?.sponsor_id === 3){
                                tag = 'sponsor';
                                subtag = 'animals';
                                setLink(route('animals',[tag,subtag])+'?view='+animal?.id);
                            }
                            else{
                                // sponsored
                                if(animal?.sponsor_id === 2){
                                    tag = 'sponsor';
                                    subtag = 'sponsored';
                                    setLink(route('animals',[tag,subtag])+'?view='+animal?.id);
                                }
                                else{
                                    // sponsor_id 1 is not sponsored but you not see publicly
                                    // internal link in adopt section
                                    tag = 'adopt';
                                    setLink(route('admin.animals',[tag])+'?view='+animal?.id);
                                }
                            }
                            break;
                    }
                }
            }
        }
        else{
           
            switch(origin){

                case 'adopt':           
                    tag = 'adopt';
                    subtag = 'animals';
                    tagAdmin = 'adopt';                    
                    break;

                case 'sponsor':           
                    tag = 'sponsor';
                    subtag = 'animals';
                    tagAdmin = 'adopt';
                    break;

                case 'sponsored':           
                    tag = 'sponsor';
                    subtag = 'sponsored';
                    tagAdmin = 'adopt';
                    break;

                case 'heaven':           
                    tag = 'heaven';
                    subtag = 'animals';
                    tagAdmin = 'heaven';
                    break;
            }
            
            setLink(route('animals',[tag,subtag])+'?view='+animal?.id);
            setAdminLink(route('admin.animals',[tagAdmin])+'?view='+animal?.id);
        }
    }

    useEffect(() => {        
        getShareLink();
    },[animal]);

    const handleShare = async () => {

        // if native mobile share        
        if(navigator?.share) {
            
            try{
                const shareData = {
                    title: t('share.title-native'),
                    //text: t('trans.text'),
                    url: link
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

    const goAdmin = (e) => {
        window.location = adminLink;
    }

    const handleDelete = (e) => {

        setDeleteConfirm(false);

        axios.post(route('animal.delete',[animal?.id]))
        .then(function (response){            
            
            if(response.data.result){

                // update array to remove it from the list
                const removeElement = items.filter((item, index) => item?.id !== animal?.id);
                setItems(removeElement);

                // if filter applied it disappears from the list but when clicking remove filter
                // it appears again. so we need to update original items
                setInternal(true);

                // if not using filters, the list is the same                  
                if(filterUsed){
                    const removeElementOriginal = animals.filter((item, index) => item?.id !== animal?.id);
                    setAnimals(removeElementOriginal);   
                }
                else{                    
                    setAnimals(removeElement);
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
        
        var tag = '';

        if(animal?.hidden){
            tag = 'hidden';
        }
        else{
            if(animal?.dead){
                tag = 'heaven';
            }
            else{

                switch(animal?.status_id){

                    case 2: // adopted            
                        tag = 'adopted';
                        break;

                    case 1: //'adopt'
                        tag = 'adopt';
                        break;
                }
            }
        }

        window.location = route('admin.animals',[tag])+'?view='+animal?.id;
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
            link={link}          
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
                <div className='modal-div'>
                    <AnimalCard 
                        t={t}
                        origin={origin}                     
                        animal={animal}                        
                        imagePath={ 
                            imagePath ?
                                imagePath
                            :               
                                animal && animal?.dead && (!animal?.hidden || animal?.hidden === null) ? 
                                    imagesPaths?.animals_external
                                :
                                    imagesPaths?.animals
                        }
                        imagesPaths={imagesPaths}
                    />
                </div>

                {
                    (origin === 'user-people' || origin === 'user-animals') ?
                        <div className={`w-full flex items-center justify-between border-t py-1`}> 
                            <IconButton onClick={handleShare} className='shareIcon'>
                                <ShareIcon sx={sxIcon}/>
                            </IconButton>                            
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
                                <IconButton onClick={handleConfirmDelete} className='deleteIcon'>
                                    <DeleteIcon sx={sxIcon}/>
                                </IconButton>                          
                                </>
                            }
                            <IconButton onClick={handleClose} className='closeIcon'>
                                <CloseIcon sx={sxIcon}/>
                            </IconButton>                         
                        </div>
                    :
                        <div className={`w-full flex items-center justify-between border-t py-1`}>
                            <IconButton onClick={handleShare} className='shareIcon'>
                                <ShareIcon sx={sxIcon}/>
                            </IconButton>
                            {
                                (user && user?.admin === 1) &&
                                <IconButton onClick={goAdmin} className='editIcon'>
                                    <SettingsIcon sx={sxIcon}/>
                                </IconButton> 
                            }
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