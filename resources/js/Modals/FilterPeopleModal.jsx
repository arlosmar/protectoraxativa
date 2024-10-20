import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { getDarkMode } from "@/Utils/Cookies";

import PersonForm from '@/Forms/PersonForm';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export default function FilterAnimalsModal({origin,t,show,setShow,data,setData,options,handleSubmit}){

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
        setShow(false)
    }

    return (
        <Modal open={show} onClose={handleClose}>

            <Box sx={style} className='flex flex-col'>              
                <div className='flex flex-col overflow-y-auto hide-scroll'>
                    <h1 className='title-user-list'>
                        {t('trans.Filter')}
                    </h1>
                    <PersonForm
                        origin={origin}
                        t={t}                                                
                        data={data}
                        setData={setData}
                        filter
                        handleSubmit={handleSubmit}
                    />                   
                </div>

                <div className={`w-full flex items-center justify-between border-t py-1`}>                    
                    <IconButton onClick={handleSubmit} className='searchIcon'>
                        <SearchIcon sx={sxIcon}/>
                    </IconButton> 
                    <IconButton onClick={handleClose} className='closeIcon'>
                        <CloseIcon sx={sxIcon}/>
                    </IconButton>                         
                </div>
            </Box>
        
        </Modal>
    )
}