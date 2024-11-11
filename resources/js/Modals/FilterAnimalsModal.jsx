import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import AnimalForm from '@/Forms/AnimalForm';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import { modalStyle } from '@/Utils/Styles';

export default function FilterAnimalsModal({origin,t,show,setShow,data,setData,options,handleSubmit,subsection}){

    const style = modalStyle();

    const sxIcon = {
        fontSize: '35px'
    };

    const handleClose = () => {
        setShow(false)
    }

    return (
        <Modal open={show} onClose={handleClose}>

            <Box sx={style} className='flex flex-col'>              
                
                <div className='modal-div'>
                    <h1 className='title-user-list'>
                        {t('trans.Filter')}
                    </h1>
                    <AnimalForm
                        origin={origin}
                        t={t}                        
                        data={data}
                        setData={setData}
                        options={options}  
                        filter
                        handleSubmit={handleSubmit}  
                        subsection={subsection}                
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