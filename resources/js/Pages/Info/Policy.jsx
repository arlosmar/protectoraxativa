
export default function Policy({t}){

    return (    	
    	<div>
    		<h1 className='title'>
    			{t('trans.Policy')}
    		</h1>
            <div className='mt-4 text-center'>
                <a href={route('home')} className='back-button'>
                    {t('trans.Back')}
                </a>
            </div>
    	</div>
    )
}