import WhatsappIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
//import TwitterIcon from '@mui/icons-material/X';
import YoutubeIcon from '@mui/icons-material/YouTube';
//import BlogIcon from '@mui/icons-material/Pets';
import SoundcloudIcon from '@mui/icons-material/MusicNote';
//import LadridosIcon from '@mui/icons-material/RssFeed';
import TikTokIcon from '@mui/icons-material/Videocam';

export default function Social({t,social}){

    return (    	
        <>
        {/*
        <h1 className='title-home'>
            {t('introduction.social.title')}
        </h1>
        */}
        <div className='social-div-box'>
            <div className='social-div'>
                <div className='social-div-icon'>
                    <a href={'https://wa.me/'+social?.whatsapp} target='_blank'>
                        <WhatsappIcon id='social-icon-whatsapp' className="social-icon"/>
                    </a>
                </div>
                <div className=''>                
                    <a href={'https://wa.me/'+social?.whatsapp} target='_blank' className='social-link'>
                        <div 
                            dangerouslySetInnerHTML={{__html: t('introduction.social.whatsapp')}}
                        >                
                        </div>
                    </a>
                </div>
            </div>
            <div className='social-div paragraph-top-separation'>
                <div className='social-div-icon'>
                    <a href={social?.instagram} target='_blank'>
                        <InstagramIcon id='social-icon-instagram' className="social-icon"/>
                    </a>
                </div>
                <div className=''>                
                    <a href={social?.instagram} target='_blank' className='social-link'>
                        <div 
                            dangerouslySetInnerHTML={{__html: t('introduction.social.instagram')}}
                        >                
                        </div>
                    </a>
                </div>
            </div>
            <div className='social-div paragraph-top-separation'>
                <div className='social-div-icon'>
                    <a href={social?.facebook} target='_blank'>
                        <FacebookIcon id='social-icon-facebook' className="social-icon"/>
                    </a>
                </div>
                <div className=''>                
                    <a href={social?.facebook} target='_blank' className='social-link'>
                        <div 
                            dangerouslySetInnerHTML={{__html: t('introduction.social.facebook')}}
                        >                
                        </div>
                    </a>
                </div>
            </div>
            {/*
            <div className='social-div paragraph-top-separation'>
                <div className='social-div-icon'>
                    <a href={social?.twitter} target='_blank'>
                        <TwitterIcon id='social-icon-twitter' className="social-icon"/>
                    </a>
                </div>
                <div className=''>                
                    <a href={social?.twitter} target='_blank' className='social-link'>
                        <div 
                            dangerouslySetInnerHTML={{__html: t('introduction.social.twitter')}}
                        >                
                        </div>
                    </a>
                </div>
            </div>
            */}
            <div className='social-div paragraph-top-separation'>
                <div className='social-div-icon'>
                    <a href={social?.youtube} target='_blank'>
                        <YoutubeIcon id='social-icon-youtube' className="social-icon"/>
                    </a>
                </div>
                <div className=''>                
                    <a href={social?.youtube} target='_blank' className='social-link'>
                        <div 
                            dangerouslySetInnerHTML={{__html: t('introduction.social.youtube')}}
                        >                
                        </div>
                    </a>
                </div>
            </div>
            <div className='social-div paragraph-top-separation'>
                <div className='social-div-icon'>
                    <a href={social?.soundcloud} target='_blank'>
                        <SoundcloudIcon id='social-icon-soundcloud' className="social-icon"/>
                    </a>
                </div>
                <div className=''>                
                    <a href={social?.soundcloud} target='_blank' className='social-link'>
                        <div 
                            dangerouslySetInnerHTML={{__html: t('introduction.social.soundcloud')}}
                        >                
                        </div>
                    </a>
                </div>
            </div>
            <div className='social-div paragraph-top-separation'>
                <div className='social-div-icon'>
                    <a href={social?.tiktok} target='_blank'>
                        <TikTokIcon id='social-icon-tiktok' className="social-icon"/>
                    </a>
                </div>
                <div className=''>                
                    <a href={social?.tiktok} target='_blank' className='social-link'>
                        <div 
                            dangerouslySetInnerHTML={{__html: t('introduction.social.tiktok')}}
                        >                
                        </div>
                    </a>
                </div>
            </div>
            {/*
            <div className='social-div paragraph-top-separation'>
                <div className='social-div-icon'>
                    <a href={social?.blog} target='_blank'>
                        <BlogIcon id='social-icon-blog' className="social-icon"/>
                    </a>
                </div>
                <div className=''>                
                    <a href={social?.blog} target='_blank' className='social-link'>
                        <div 
                            dangerouslySetInnerHTML={{__html: t('introduction.social.blog')}}
                        >                
                        </div>
                    </a>
                </div>
            </div>
            <div className='social-div paragraph-top-separation'>
                <div className='social-div-icon'>
                    <a href={social?.ladridos} target='_blank'>
                        <LadridosIcon id='social-icon-ladridos' className="social-icon"/>
                    </a>
                </div>
                <div className=''>                
                    <a href={social?.ladridos} target='_blank' className='social-link'>
                        <div 
                            dangerouslySetInnerHTML={{__html: t('introduction.social.ladridos')}}
                        >                
                        </div>
                    </a>
                </div>
            </div>
            */
            }
        </div>
        </>
    )
}