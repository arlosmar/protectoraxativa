//import { useTranslation } from "react-i18next";
import Grid from '@mui/material/Grid2';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PetsIcon from '@mui/icons-material/Pets';
import ChairIcon from '@mui/icons-material/Chair';
import CasinoIcon from '@mui/icons-material/Casino';
import HomeIcon from '@mui/icons-material/Home';

export default function Colaboration({t,email_colaboration,email_volunteering,prices,forms,social,guides}){

    //const { i18n } = useTranslation('global');

    // guides are only in spanish
    //const lang = i18n.language;
    const lang = 'es';

    return (    	
        <>
        {/*
        <h1 className='title-home'>
            {t('introduction.colaboration.title')}
        </h1>
        */}
        <Grid container spacing={0} className='home-div-box'>
            <Grid size={{ xs: 12, md: 2 }} className='home-div-icon'>
                {/*
                <img
                    className='home-image-icon'
                    alt="bizum"
                    src='/images/bizum.jpg'
                    id='bizum'
                />
                */}
                <MobileScreenShareIcon className="home-icon"/>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }}>
                <h1 className='subtitle-colaboration'>
                    {t('introduction.colaboration.bizum')}
                </h1>
                <div 
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line1')}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line2')}}
                >                
                </div>
                <div 
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={
                        {__html: 
                            t('introduction.colaboration.line3')+'<br>'+
                            t('introduction.colaboration.line4')
                        }
                    }
                >                
                </div>
                <div 
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line5')}}
                >                
                </div>
                <div 
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line6')}}
                >                
                </div>  
            </Grid>           
        </Grid>
        <Grid container spacing={0} className='home-div-box'>
            <Grid size={{ xs: 12, md: 2 }} className='home-div-icon'>
                <AccountBalanceIcon className="home-icon"/>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }}>             
                <h1 className='subtitle-colaboration'>
                    {t('introduction.colaboration.bank')}
                </h1>
                <div 
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line7')}}
                >                
                </div>
                <div 
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line8')}}
                >                
                </div>
                <div 
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line9')}}
                >                
                </div>
                <div 
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line10')}}
                >                
                </div>
                <div 
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line11')}}
                >                
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={0} className='home-div-box'>
            <Grid size={{ xs: 12, md: 2 }} className='home-div-icon'>
                <ChairIcon className="home-icon"/>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }}>
                <h1 className='subtitle-colaboration'>
                    {t('introduction.colaboration.materials')}
                </h1>
                <div 
                    className='paragraph-top-separation'   
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line12')}}
                >                
                </div>
                <div
                    className='home-colaboration-list'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line13')}}
                >                
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={0} className='home-div-box'>
            <Grid size={{ xs: 12, md: 2 }} className='home-div-icon'>
                <HandshakeIcon className="home-icon"/>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }}>
                <h1 className='subtitle-colaboration'>
                    {t('introduction.colaboration.partner')}
                </h1>
                <div 
                    className='paragraph-top-separation'   
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line14',{price_partner:prices?.price_partner})}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line15',{price_retired:prices?.price_retired})}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line16',{price_child:prices?.price_child})}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line17')}}
                >                
                </div>
                <div>
                    <a href={forms?.partner} target='_blank'>
                        {t('introduction.colaboration.form-line1')}
                    </a>
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.form-line2')}}
                >                
                </div>
                <div>
                    <a href={forms?.sepa} target='_blank'>
                        {t('introduction.colaboration.form-line3')}
                    </a>
                </div>  
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.form-line4')}}
                >                
                </div>              
                <div>
                    <a href={'mailto:'+email_colaboration} target='_blank'>
                        {email_colaboration}
                    </a>
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={0} className='home-div-box'>
            <Grid size={{ xs: 12, md: 2 }} className='home-div-icon'>
                <PetsIcon className="home-icon"/>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }}>
                <h1 className='subtitle-colaboration'>
                    {t('introduction.colaboration.sponsorship')}
                </h1>
                <div 
                    className='paragraph-top-separation'   
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line18',{price_sponsorship:prices?.price_sponsorship})}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line19')}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.form-sponsor-line1')}}
                >                
                </div>
                <div>
                    <a href={forms?.sponsor} target='_blank'>
                        {t('introduction.colaboration.form-sponsor-line2')}
                    </a>
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.form-sponsor-line3')}}
                >                
                </div>
                <div>
                    <a href={forms?.sepa} target='_blank'>
                        {t('introduction.colaboration.form-sponsor-line4')}
                    </a>
                </div>  
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.form-sponsor-line5')}}
                >                
                </div>              
                <div>
                    <a href={'mailto:'+email_colaboration} target='_blank'>
                        {email_colaboration}
                    </a>
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line20')}}
                >                
                </div>
                <div
                    id='home-colaboration-sponsorship-list'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line21',
                        {shelter:t('introduction.colaboration.shelter'),
                        apu:t('introduction.colaboration.apu')})
                    }}
                >                
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={0} className='home-div-box'>
            <Grid size={{ xs: 12, md: 2 }} className='home-div-icon'>
                <VolunteerActivismIcon className="home-icon"/>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }}>
                <h1 className='subtitle-colaboration'>
                    {t('introduction.colaboration.volunteering')}
                </h1>
                <div 
                    className='paragraph-top-separation'   
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line22')}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line23')}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line24')}}
                >                
                </div>
                <div>
                    <a href={'mailto:'+email_volunteering} target='_blank'>
                        {email_volunteering}
                    </a>
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={0} className='home-div-box'>
            <Grid size={{ xs: 12, md: 2 }} className='home-div-icon'>
                <HomeIcon className="home-icon"/>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }}>
                <h1 className='subtitle-colaboration'>
                    {t('introduction.colaboration.hosting')}
                </h1>
                <div 
                    className='paragraph-top-separation'   
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line29')}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line30')}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line31')}}
                >                
                </div>                
                <div>
                    <a href={'https://wa.me/'+social?.whatsapp} target='_blank'>
                        {social?.whatsapp_noprefix}
                    </a>
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line32')}}
                >                
                </div>     
                <div>
                    <a href={forms?.hosting} target='_blank'>
                        {t('trans.Form')}
                    </a>
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line33')}}
                >                
                </div>     
                <div>
                    <a href={guides?.hosting[lang]} target='_blank'>
                        {t('trans.Link')}
                    </a>
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={0} className='home-div-box'>
            <Grid size={{ xs: 12, md: 2 }} className='home-div-icon'>
                <CasinoIcon className="home-icon"/>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }}>
                <h1 className='subtitle-colaboration'>
                    {t('introduction.colaboration.lottery')}
                </h1>
                <div 
                    className='paragraph-top-separation'   
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line25')}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line26')}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line27')}}
                >                
                </div>
                <div
                    className='paragraph-top-separation'
                    dangerouslySetInnerHTML={{__html: t('introduction.colaboration.line28')}}
                >                
                </div>
                <div>
                    <a href={'mailto:'+email_colaboration} target='_blank'>
                        {email_colaboration}
                    </a>
                </div>
            </Grid>
        </Grid>
        </>
    )
}