import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Input from '@/Components/Input';

import WhatsappIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';

import { modalStyle } from '@/Utils/Styles';

export default function ShareModal({t,show,setShow,link}){

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
                    {t('share.title')}
                </div>
                <div className='mt-2'>
                    <Input
                        t={t}
                        type='copy'
                        readOnly
                        value={link}
                    />
                </div>
                <div className='mt-4 flex justify-between px-2'>                    
                    <div className='share-div-icon'>
                        <a href={'whatsapp://send/?text='+link} target='_blank'>
                            <WhatsappIcon id='social-icon-whatsapp' className="social-icon"/>
                        </a>
                    </div>
                    <div className='share-div-icon'>
                        <a href={'https://t.me/share/url?url='+link} target='_blank'>
                            <TelegramIcon id='social-icon-telegram' className="social-icon"/>
                        </a>
                    </div>                                         
                    <div className='share-div-icon'>
                        <a href={'https://www.facebook.com/sharer/sharer.php?u='+link} target='_blank'>
                            <FacebookIcon id='social-icon-facebook' className="social-icon"/>
                        </a>
                    </div>
                    <div className='share-div-icon'>
                        <a href={'https://twitter.com/intent/tweet?text='+link} target='_blank'>
                            <TwitterIcon id='social-icon-twitter' className="social-icon"/>
                        </a>
                    </div>
                    <div className='share-div-icon'>
                        <a href={'mailto:?subject='+t('share.title-email')+'&body='+link} target='_blank'>
                            <EmailIcon id='social-icon-email' className="social-icon"/>
                        </a>
                    </div> 
                </div>
                <div className="flex justify-center mt-8 mb-2">
                    <button className='cancel-button' onClick={handleClose}>
                        {t('trans.Close')}
                    </button>
                </div> 
            </Box>
        </Modal>
    )
}