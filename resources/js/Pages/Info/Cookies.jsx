
export default function Cookies({t}){

    return (        
        <div>
            <h1 className='title mt-4'>
                {t('info.cookies.title')}
            </h1>
            <div className='text-center'>
                <a href={route('home')} className='back-button'>
                    {t('trans.Back')}
                </a>
            </div>
            <div 
                className='mt-8'
                dangerouslySetInnerHTML={{__html: t('info.cookies.content')}}
            >                
            </div>
            <div className='mt-4 text-center'>
                <a href={route('home')} className='back-button'>
                    {t('trans.Back')}
                </a>
            </div>
        </div>
    )
}