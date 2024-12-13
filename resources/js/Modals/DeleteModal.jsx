import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { modalStyle } from '@/Utils/Styles';

export default function DeleteModal({t,show,setShow,handleDelete}){

    const { sx, sxIcon, sxIconClose } = modalStyle();

    const handleClose = () => {
        setShow(false)
    }

    return (
        <Modal
            open={show}
            onClose={handleClose}
        >
            <Box sx={sx} className='flex flex-col'>
                <div className='text-center'>
                    {t('trans.DeleteConfirm')}
                </div>
                <div className="flex justify-center my-2">
                    <div className='me-1'>
                        <button 
                            className='animal-link-delete' 
                            onClick={handleDelete}
                        >
                            {t('trans.Delete')}
                        </button>
                    </div>
                    <button className='cancel-button' onClick={handleClose}>
                        {t('trans.Close')}
                    </button>
                </div> 
            </Box>
        </Modal>
    )
}