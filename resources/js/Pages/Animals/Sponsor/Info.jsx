export default function Info({t,email_colaboration,forms,prices}){

    return (
        <>
        <h1 className='title-subsection'>
            {t('animals.sponsor.info.title')}
        </h1>
        <div className='home-div-box'>
            <h1 className='subtitle-home'>
                {t('animals.sponsor.info.title-details')}
            </h1>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.line1')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.line2')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.line3')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.line4')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.line5')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.line6')}}
            >                
            </div>
            <div 
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.line7')}}
            >                
            </div>
        </div>
        <div className='home-div-box mt-8 mb-8'>
            <h1 className='subtitle-home'>
                {t('animals.sponsor.info.title-steps')}
            </h1>
            <div 
                className='paragraph-top-separation'   
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.line8',{price_sponsorship:prices?.price_sponsorship})}}
            >                
            </div>
            <div
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.line9')}}
            >                
            </div>
            <div
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.form-sponsor-line1')}}
            >                
            </div>
            <div>
                <a href={forms?.sponsor} target='_blank'>
                    {t('animals.sponsor.info.form-sponsor-line2')}
                </a>
            </div>
            <div
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.form-sponsor-line3')}}
            >                
            </div>
            <div>
                <a href={forms?.sepa} target='_blank'>
                    {t('animals.sponsor.info.form-sponsor-line4')}
                </a>
            </div>  
            <div
                className='paragraph-top-separation'
                dangerouslySetInnerHTML={{__html: t('animals.sponsor.info.form-sponsor-line5')}}
            >                
            </div>              
            <div>
                <a href={'mailto:'+email_colaboration} target='_blank'>
                    {email_colaboration}
                </a>
            </div>            
        </div>
        </>
    )
}