
export default function Terms({t}){

    return (    	
    	<div>
    		<h1 className='title'>
    			{t('trans.Terms')}
    		</h1>
            <div className='mt-4 text-center'>
                <a href={route('home')} className='back-button'>
                    {t('trans.Back')}
                </a>
            </div>
    	</div>
    )
}