import { modalStyle } from '@/Utils/Styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function GenericModal({show,setShow,text}){

    const { sx, sxIcon, sxIconClose } = modalStyle();

    const handleClose = () => {
        setShow(false)
    }

    return (
        <Modal open={show} onClose={handleClose}>

            <Box sx={style} className='flex flex-col'>              
                
                <div className='modal-div'>
                    {text}
                </div>

                <div className={`w-full flex items-center justify-end border-t py-1`}>
                    <IconButton onClick={handleClose} className='closeIcon'>
                        <CloseIcon sx={sxIconClose}/>
                    </IconButton>                         
                </div>
            </Box>
        
        </Modal>
    );
}