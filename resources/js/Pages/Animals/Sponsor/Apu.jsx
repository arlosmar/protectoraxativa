import Grid from '@mui/material/Grid2';

export default function Apu({t,apus}){

    return (    	
        <>
        {
            apus?.logos && apus.logos.length > 0 && apus.logos.map((item,index) => {

                if(index % 2 === 0){

                    return (
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 12, md: 6 }} className='apu-div'>
                                {
                                    (apus.links[index] && apus.links[index].length > 0) ?
                                        <a href={apus.links[index]} target="_blank">
                                            <img
                                                className='apu-image'
                                                alt={apus.logos[index]}
                                                src={'/images/apu/'+apus.logos[index]}
                                            />
                                        </a>
                                    :
                                        <img
                                            className='apu-image'
                                            alt={apus.logos[index]}
                                            src={'/images/apu/'+apus.logos[index]}
                                        />
                                }
                            </Grid>
                            {
                                apus.logos[index+1] &&
                                <Grid size={{ xs: 12, md: 6 }} className='apu-div'>
                                    {
                                        (apus.links[index+1] && apus.links[index+1].length > 0) ?
                                            <a href={apus.links[index+1]} target="_blank">
                                                <img
                                                    className='apu-image'
                                                    alt={apus.logos[index+1]}
                                                    src={'/images/apu/'+apus.logos[index+1]}
                                                />
                                            </a>
                                        :
                                            <img
                                                className='apu-image'
                                                alt={apus.logos[index+1]}
                                                src={'/images/apu/'+apus.logos[index+1]}
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