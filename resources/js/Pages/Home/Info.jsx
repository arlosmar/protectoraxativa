import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

export default function Info({t}){

    return (    	
        <>
        {/*
        <h1 className='title-home'>
            {t('introduction.info.title')}
        </h1>
        */}
        <div className='home-div-box'>
            <div 
                className='text-center'
                dangerouslySetInnerHTML={{__html: t('introduction.info.paragraph1')}}
            >                
            </div>
            <h1 className='subtitle-home mt-8 text-center'>
                {t('introduction.info.paragraph2-title')}
            </h1>
            <div 
                className='text-center'
                dangerouslySetInnerHTML={{__html: t('introduction.info.paragraph2')}}
            >                
            </div>
            <div className='mt-4'>
                <img
                    className='info-image mx-auto'
                    alt="info"
                    src='/images/info/image1.jpg'
                    id='info-image'
                />
            </div>
            <div 
                className='text-center'
                dangerouslySetInnerHTML={{__html: t('introduction.info.paragraph2-footer')}}
            >
            </div>
            <div 
                className='mt-8 text-center'
                dangerouslySetInnerHTML={{__html: t('introduction.info.paragraph3')}}
            >
            </div>
            {/*
            <div className='home-div-box mt-8'>
                <h1 className='subtitle-home text-center'>
                    {t('introduction.info.poem-title')}
                </h1>
                <div 
                    className='text-center mt-4'
                    dangerouslySetInnerHTML={{__html: t('introduction.info.poem')}}
                >                
                </div>
                <div 
                    className='text-right font-bold mt-4'
                    dangerouslySetInnerHTML={{__html: t('introduction.info.poem-footer')}}
                >                
                </div>
            </div>
            */}
        </div>
        </>
    )
}