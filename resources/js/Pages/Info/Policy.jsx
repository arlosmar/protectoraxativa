
export default function Policy({t}){

    return (        
        <div>
            <h1 className='title mt-4'>
                {t('info.policy.title')}
            </h1>
            <div className='text-center'>
                <a href={route('home')} className='back-button'>
                    {t('trans.Back')}
                </a>
            </div>
            <div 
                className='mt-8'
                dangerouslySetInnerHTML={{__html: t('info.policy.content')}}
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