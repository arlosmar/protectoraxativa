import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

import { modalStyle } from '@/Utils/Styles';

export default function LanguageModal({show,setShow,language,languages,handleLanguage}){

    const style = modalStyle();

    const handleClose = () => {
        setShow(false)
    }

    const languagesLength = languages ? languages.length : 0;
    const lastElement = languagesLength-1;

    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="language"
            aria-describedby="language"
        >
            <Box sx={style}>
                <div className='text-center'>
                    {
                        languagesLength > 0 && languages.map((item,index) => (
                            <div 
                                className={`language-item ${index !== lastElement ? 'border-b' : ''}`} 
                                id={item.value} 
                                onClick={handleLanguage}
                            >
                                <button className={item.value === language ? "language-item-selected" : ""}>
                                    {item.name}
                                </button>
                            </div>
                        ))
                    }
                </div>
            </Box>
        </Modal>
    )
}