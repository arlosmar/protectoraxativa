import Grid from '@mui/material/Grid2';

export default function Partners({t,partners}){

    return (    	
        <>
        <h1 className='title-home'>
            {t('introduction.partners.title')}
        </h1>
        {
            partners?.logos && partners.logos.length > 0 && partners.logos.map((item,index) => {

                if(index % 2 === 0){

                    return (
                        <Grid container spacing={0}>
                            <Grid size={{ xs: 12, md: 6 }} className='partners-div'>
                                {
                                    (partners.links[index] && partners.links[index].length > 0) ?
                                        <a href={partners.links[index]} target="_blank">
                                            <img
                                                className='partners-image'
                                                alt={partners.logos[index]}
                                                src={'/images/partners/'+partners.logos[index]}
                                            />
                                        </a>
                                    :
                                        <img
                                            className='partners-image'
                                            alt={partners.logos[index]}
                                            src={'/images/partners/'+partners.logos[index]}
                                        />
                                }
                            </Grid>
                            {
                                partners.logos[index+1] &&
                                <Grid size={{ xs: 12, md: 6 }} className='partners-div'>
                                    {
                                        (partners.links[index+1] && partners.links[index+1].length > 0) ?
                                            <a href={partners.links[index+1]} target="_blank">
                                                <img
                                                    className='partners-image'
                                                    alt={partners.logos[index+1]}
                                                    src={'/images/partners/'+partners.logos[index+1]}
                                                />
                                            </a>
                                        :
                                            <img
                                                className='partners-image'
                                                alt={partners.logos[index+1]}
                                                src={'/images/partners/'+partners.logos[index+1]}
                                            />
                                    }
                                </Grid>
                            }
                        </Grid>
                    )
                }
            })
        }
        </>
    )
}