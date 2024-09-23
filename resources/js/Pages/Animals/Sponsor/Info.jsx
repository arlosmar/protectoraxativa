export default function Info({t}){

    return (
        <>
        <h1 className='title-subsection'>
            {t('animals.sponsor.info.title')}
        </h1>
        <div 
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
        </>
    )
}