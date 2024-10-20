
export default function Info({t,email_info}){

    return (
        <>
        <h1 className='title-subsection'>
            {t('animals.heaven.info.title')}
        </h1>
        <div 
            dangerouslySetInnerHTML={{__html: t('animals.heaven.info.line1')}}
        >                
        </div>
        <div 
            className='paragraph-top-separation'
            dangerouslySetInnerHTML={{__html: t('animals.heaven.info.line2')}}
        >                
        </div>
        <div 
            className='paragraph-top-separation'
            dangerouslySetInnerHTML={{__html: t('animals.heaven.info.line3')}}
        >                
        </div>
        <div 
            className='paragraph-top-separation'
            dangerouslySetInnerHTML={{__html: t('animals.heaven.info.line4')}}
        >                
        </div>
         <div>
            <a href={`mailto:${email_info}`} target='_blank'>
                {email_info}
            </a>
        </div>
        <div 
            className='paragraph-top-separation'
            dangerouslySetInnerHTML={{__html: t('animals.heaven.info.line5')}}
        >                
        </div>
        <div 
            className='paragraph-top-separation'
            dangerouslySetInnerHTML={{__html: t('animals.heaven.info.line6')}}
        >                
        </div>
        <div 
            className='paragraph-top-separation'
            dangerouslySetInnerHTML={{__html: t('animals.heaven.info.line7')}}
        >                
        </div>
        <div className='home-div-box mt-8'>
            <h1 className='subtitle-home text-center'>
                {t('animals.heaven.info.poem-title')}
            </h1>
            <div 
                className='text-center paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.heaven.info.poem')}}
            >                
            </div>          
        </div>
        </>
    )
}