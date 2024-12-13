import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import NewsForm from '@/Forms/NewsForm';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import { modalStyle } from '@/Utils/Styles';

export default function FilterNewsModal({origin,t,show,setShow,data,setData,options,handleSubmit}){

    const { sx, sxIcon, sxIconClose } = modalStyle();

    const handleClose = () => {
        setShow(false)
    }

    return (
        <Modal open={show} onClose={handleClose}>

            <Box sx={sx} className='flex flex-col'>              
                
                <div className='modal-div'>
                    <h1 className='title-user-list'>
                        {t('trans.Filter')}
                    </h1>
                    <NewsForm
                        origin={origin}
                        t={t}                                                
                        data={data}
                        setData={setData}
                        filter
                        handleSubmit={handleSubmit}
                        options={options}
                    />                   
                </div>

                <div className={`w-full flex items-center justify-between border-t py-1`}>                    
                    <IconButton onClick={handleSubmit} className='searchIcon'>
                        <SearchIcon sx={sxIcon}/>
                    </IconButton> 
                    <IconButton onClick={handleClose} className='closeIcon'>
                        <CloseIcon sx={sxIconClose}/>
                    </IconButton>                         
                </div>
            </Box>
        
        </Modal>
    )
}