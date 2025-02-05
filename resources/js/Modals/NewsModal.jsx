import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import NewsCard from "@/Pages/News/Card";

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

export default function NewsModal({user,origin,t,show,setShow,imagesPaths,newsItem,
    setNewsEditItem,setShowEditNews,items,setItems,news,setNews,setInternal,filterUsed,setData}){

    const [ share , setShare ] = useState(false);

    const { sx, sxIcon, sxIconClose } = modalStyle();

    const handleClose = () => {
        setShow(false)
    }

    const handleEdit = (e) => {
        setData({ 
            'hidden' : newsItem?.hidden ? newsItem.hidden : 0,
            'date' : newsItem?.date ? date2db(newsItem.date,true,true) : null,
            'title' : newsItem?.title ? newsItem.title : null,
            'description' : newsItem?.description ? newsItem.description : null,/*
            'user_id' : newsItem?.user_id ? newsItem.user_id : null,
            'user'    : newsItem?.user ? newsItem.user : null,
            'user_name' : newsItem?.user_name ? newsItem.user_name : null,*/
            'image' : newsItem?.image ? newsItem.image : null,
            'image_file' : null
        });
        setNewsEditItem(newsItem);        
        setShowEditNews(true);
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

        axios.post(route('news.delete',[newsItem?.id]))
        .then(function (response){            
            
            if(response.data.result){

                // update array to remove it from the list
                const removeElement = items.filter((item, index) => item?.id !== newsItem?.id);
                setItems(removeElement);

                // if filter applied it disappears from the list but when clicking remove filter
                // it appears again. so we need to update original items
                setInternal(true);

                // if not using filters, the list is the same                  
                if(filterUsed){
                    const removeElementOriginal = news.filter((item, index) => item?.id !== newsItem?.id);
                    setNews(removeElementOriginal);   
                }
                else{                    
                    setNews(removeElement);
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
        window.location = route('admin.news')+'?view='+newsItem?.id;
    }

    const [ link, setLink ] = useState('');
    const [ shareTitle, setShareTitle ] = useState('');

    const handleShare = async () => {

        var itemTitle = newsItem?.title && newsItem.title.length > 0 ? newsItem.title : t('Title.News');

        // if native mobile share        
        if(navigator?.share || window?.AndroidHandler?.share){
            
            try{
                const shareData = {
                    //title: t('share.title-native'),
                    title: itemTitle,
                    //text: t('trans.text'),
                    url: route('news')+'?view='+newsItem?.id
                };

                if(newsItem?.image && newsItem.image.length > 0){
                    shareData.image = window.location.protocol+'//'+window.location.host+imagesPaths?.news+newsItem.image;
                }
                /*
                await navigator.share(shareData);
                onSuccess?.();
                */
                if(window?.AndroidHandler?.share){                    
                    window.AndroidHandler.share(JSON.stringify(shareData));                    
                }
                else {     
                    if(shareData.image && shareData.image.length > 0){

                        var split = shareData.image.split('/');   
                        var imageName = split.slice(-1);                     
                        let blob = await fetch(shareData.image).then(r => r.blob());
                        var file = new File([blob],imageName, {
                            type: blob.type,
                        });

                        if(navigator.canShare(file)){
                            shareData.files = [file];
                        }
                    }     
                    await navigator.share(shareData);
                }
            }
            catch(err){           
                //onError?.(err);
                // if user cancels the sharing it goes here as well                
            }
        } 
        else{
            // if no native mobile share, show popup
            setShareTitle(itemTitle);
            setLink(route('news')+'?view='+newsItem?.id);
            setShare(true);
        }
    }

    const goAdmin = (e) => {
        window.location = route('admin.news')+'?view='+newsItem?.id;
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
            title={shareTitle}
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
            <Box sx={sx} className='flex flex-col'>
            
                <div className='modal-div'>
                    <NewsCard 
                        t={t}
                        origin={origin} 
                        news={newsItem}
                        imagePath={imagesPaths?.news}
                        imagesPaths={imagesPaths}   
                    />
                </div>

                {
                    origin === 'user-news' ?
                        <div className={`w-full flex items-center justify-between border-t py-1`}>                    
                            
                            <IconButton onClick={handleShare} className='shareIcon'>
                                <ShareIcon sx={sxIcon}/>
                            </IconButton> 

                            <IconButton onClick={handleEdit} className='editIcon'>
                                <EditIcon sx={sxIcon}/>
                            </IconButton>
                            
                            <IconButton onClick={handleConfirmDelete} className='deleteIcon'>
                                <DeleteIcon sx={sxIcon}/>
                            </IconButton>                          
                               
                            <IconButton onClick={handleClose} className='closeIcon'>
                                <CloseIcon sx={sxIconClose}/>
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
                                <CloseIcon sx={sxIconClose}/>
                            </IconButton>                         
                        </div>
                }
            </Box>
        </Modal>
        </>
    )
}