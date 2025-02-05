import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Input from '@/Components/Input';

import WhatsappIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';

import { modalStyle } from '@/Utils/Styles';

export default function ShareModal({t,show,setShow,title,link}){

    const { sx, sxIcon, sxIconClose } = modalStyle();

    const handleClose = () => {
        setShow(false)
    }

    //whatsapp://send/?text='+link

    return (
        <Modal
            open={show}
            onClose={handleClose}
        >
            <Box sx={sx} className='flex flex-col'>
                <div className='subtitle font-bold text-center mt-2'>
                    {t('share.title')}
                </div>
                {
                    title && title.length > 0 &&
                    <div className='text-center mt-4'>
                        {title}
                    </div>
                }
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
                        <a href={'https://wa.me/?text='+encodeURIComponent(title)+'%0a'+encodeURIComponent(link)} target='_blank'>
                            <WhatsappIcon id='social-icon-whatsapp' className="social-icon"/>
                        </a>
                    </div>
                    <div className='share-div-icon'>
                        <a href={'https://t.me/share/url?text='+encodeURIComponent(title)+'url='+encodeURIComponent(link)} target='_blank'>
                            <TelegramIcon id='social-icon-telegram' className="social-icon"/>
                        </a>
                    </div>                                         
                    <div className='share-div-icon'>
                        <a href={'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(link)} target='_blank'>
                            <FacebookIcon id='social-icon-facebook' className="social-icon"/>
                        </a>
                    </div>
                    <div className='share-div-icon'>
                        <a href={'https://twitter.com/intent/tweet?text='+encodeURIComponent(link)} target='_blank'>
                            <TwitterIcon id='social-icon-twitter' className="social-icon"/>
                        </a>
                    </div>
                    <div className='share-div-icon'>
                        <a href={'mailto:?subject='+encodeURIComponent(title)+'&body='+encodeURIComponent(link)} target='_blank'>
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