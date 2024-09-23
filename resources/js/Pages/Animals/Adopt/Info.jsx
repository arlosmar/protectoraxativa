
export default function Info({t,email_adoptions,social}){

    return (    	
        <>
        <h1 className='title-subsection'>
            {t('animals.adopt.info.title')}
        </h1>
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
                <a href='/forms/form-adop.doc' target='_new'>
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
        <div className='home-div-box mt-8 mb-8'>
            <h1 className='subtitle-home'>
                {t('animals.adopt.info.title-protocol')}
            </h1>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line3')}}
            >                
            </div>
            <div className='font-bold'>
                <a href={`mailto:${email_adoptions}`} target='_blank'>
                    {email_adoptions}
                </a>
            </div>
            <div className='font-bold'>
                <a href={`tel:${social?.phone}`} target='_blank'>
                    {social?.phone}
                </a>
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line4')}}
            >                
            </div>
            <div>
                <a href='/forms/form-adop.doc' target='_new'>
                    {t('animals.adopt.info.form')}
                </a>
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line5')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line6')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line7')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.adopt.info.line8')}}
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
        </div>
        </>
    )
}