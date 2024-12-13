
export default function Terms({t}){

    return (    	
    	<div>
    		<h1 className='title mt-4'>
    			{t('info.terms.title')}
    		</h1>
            <div className='text-center'>
                <a href={route('home')} className='back-button'>
                    {t('trans.Back')}
                </a>
            </div>
            <div 
                className='mt-8'
                dangerouslySetInnerHTML={{__html: t('info.terms.content')}}
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