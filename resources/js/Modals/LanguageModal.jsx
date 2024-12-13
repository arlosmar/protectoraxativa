import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from '@/Utils/Styles';

export default function LanguageModal({show,setShow,language,languages,handleLanguage}){

    const { sx } = modalStyle(false);

    const handleClose = () => {
        setShow(false)
    }

    const languagesLength = languages ? languages.length : 0;
    const lastElement = languagesLength-1;

    return (
        <Modal open={show} onClose={handleClose}>
            <Box sx={sx} className=''>
                <div className='language-modal-div'>
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