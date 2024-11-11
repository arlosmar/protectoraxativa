//import { useTranslation } from "react-i18next";

export default function Info({t,email_adoptions,social,forms,guides,prices}){

    //const { i18n } = useTranslation('global');

    // guides are only in spanish
    //const lang = i18n.language;
    const lang = 'es';

    return (    	
        <>
        {/*
        <h1 className='title-subsection'>
            {t('animals.adopt.info.title')}
        </h1>
        */}
        {/*
        <div className='home-div-box'>
            <h1 className='subtitle-home'>
                {t('animals.adopt.info.title-preadoptions')}
            </h1>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line1')}}
            >                
            </div>
            <div>
                <a href={forms?.adoption} target='_new'>
                    {t('animals.adopt.info.form')}
                </a>
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line2')}}
            >                
            </div>
            <div>
                <a href={`mailto:${email_adoptions}`} target='_blank'>
                    {email_adoptions}
                </a>
            </div>
        </div>
        */}
        <div className='home-div-box'>
            <h1 className='subtitle-home text-center'>
                {t('animals.adopt.info.title-protocol')}
            </h1>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line3')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line4')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line5',{email_adoptions:email_adoptions})}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line6')}}
            >                
            </div>
            <div>
                <a href={forms?.adoption} target='_new'>
                    {t('animals.adopt.info.form')}
                </a>
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line7')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line8',{price_donative:prices?.price_adoption+'€'})}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line9')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line10')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line11')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line12')}}
            >                
            </div>
            {
                guides?.adoption[lang]?.names && guides?.adoption[lang]?.names.length > 0 &&
                <div id='home-adopt-info-list'>
                    <ul>
                        {
                            guides?.adoption[lang]?.names.map((item,index) => (
                                <li>
                                    <a href={guides?.adoption[lang]?.links[index]} target='_blank'>
                                        {item}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
        </>
    )
}