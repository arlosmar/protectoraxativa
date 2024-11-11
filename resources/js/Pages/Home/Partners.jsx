import Grid from '@mui/material/Grid2';

export default function Partners({t,partners}){

    const companies = partners?.companies;
    const friends = partners?.friends;
    const apus = partners?.apus;
    const subsidized = partners?.subsidized;

    return (    	
        <>
        {/*
        <h1 className='title-home'>
            {t('introduction.partners.title')}
        </h1>
        */}
        {
            companies?.logos && companies.logos.length > 0 &&
            <> 
            {/*
            <h1 className='title-subsection'>
                {t('introduction.partners.companies.title')}
            </h1>
            */}
            {
                companies.logos.map((item,index) => {

                    if(index % 2 === 0){

                        return (
                            <Grid container spacing={0}>
                                <Grid size={{ xs: 12, md: 6 }} className='partners-div'>
                                    {
                                        companies.names[index] && companies.names[index].length > 0 &&
                                        <h1 className='partners-title'>{companies.names[index]}</h1>
                                    }
                                    {
                                        (companies.links[index] && companies.links[index].length > 0) ?
                                            <a href={companies.links[index]} target="_blank">
                                                <img
                                                    className='partners-image'
                                                    alt={companies.logos[index]}
                                                    src={'/images/partners/'+companies.logos[index]}
                                                />
                                            </a>
                                        :
                                            <img
                                                className='partners-image'
                                                alt={companies.logos[index]}
                                                src={'/images/partners/'+companies.logos[index]}
                                            />
                                    }
                                </Grid>
                                {
                                    companies.logos[index+1] &&                                    
                                    <Grid size={{ xs: 12, md: 6 }} className='partners-div'>
                                        {
                                            companies.names[index+1] && companies.names[index+1].length > 0 &&
                                            <h1 className='partners-title'>{companies.names[index+1]}</h1>
                                        }
                                        {
                                            (companies.links[index+1] && companies.links[index+1].length > 0) ?
                                                <a href={companies.links[index+1]} target="_blank">
                                                    <img
                                                        className='partners-image'
                                                        alt={companies.logos[index+1]}
                                                        src={'/images/partners/'+companies.logos[index+1]}
                                                    />
                                                </a>
                                            :
                                                <img
                                                    className='partners-image'
                                                    alt={companies.logos[index+1]}
                                                    src={'/images/partners/'+companies.logos[index+1]}
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
        }
        {
            friends?.logos && friends.logos.length > 0 &&
            <>
            <h1 className='title-subsection pt-4'>
                {t('introduction.partners.friends.title')}
            </h1>
            {
                friends.logos.map((item,index) => {

                    if(index % 2 === 0){

                        return (
                            <Grid container spacing={0}>
                                <Grid size={{ xs: 12, md: 6 }} className='partners-div'>
                                    {
                                        friends.names[index] && friends.names[index].length > 0 &&
                                        <h1 className='partners-title'>{friends.names[index]}</h1>
                                    }
                                    {
                                        (friends.links[index] && friends.links[index].length > 0) ?
                                            <a href={friends.links[index]} target="_blank">
                                                <img
                                                    className='partners-image'
                                                    alt={friends.logos[index]}
                                                    src={'/images/friends/'+friends.logos[index]}
                                                />
                                            </a>
                                        :
                                            <img
                                                className='partners-image'
                                                alt={friends.logos[index]}
                                                src={'/images/friends/'+friends.logos[index]}
                                            />
                                    }
                                </Grid>
                                {
                                    friends.logos[index+1] &&
                                    <Grid size={{ xs: 12, md: 6 }} className='partners-div'>
                                        {
                                            friends.names[index+1] && friends.names[index+1].length > 0 &&
                                            <h1 className='partners-title'>{friends.names[index+1]}</h1>
                                        }
                                        {
                                            (friends.links[index+1] && friends.links[index+1].length > 0) ?
                                                <a href={friends.links[index+1]} target="_blank">
                                                    <img
                                                        className='partners-image'
                                                        alt={friends.logos[index+1]}
                                                        src={'/images/friends/'+friends.logos[index+1]}
                                                    />
                                                </a>
                                            :
                                                <img
                                                    className='partners-image'
                                                    alt={friends.logos[index+1]}
                                                    src={'/images/friends/'+friends.logos[index+1]}
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
        }
        {
            apus?.logos && apus.logos.length > 0 &&
            <>
            <h1 className='title-subsection pt-4'>
                {t('introduction.partners.apu.title')}
            </h1>
            {
                apus.logos.map((item,index) => {

                    if(index % 2 === 0){

                        return (
                            <Grid container spacing={0}>
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
        }
        {
            subsidized?.logos && subsidized.logos.length > 0 &&
            <>
            <h1 className='title-subsection pt-4'>
                {t('introduction.partners.subsidized.title')}
            </h1>
            <div className='text-center mb-2'>
                {t('introduction.partners.subsidized.line1')}                
            </div>
            {
                subsidized.logos.map((item,index) => {

                    if(index % 2 === 0){

                        return (
                            <Grid container spacing={0}>
                                <Grid size={{ xs: 12, md: 6 }} className='partners-div'>
                                    {
                                        (subsidized.links[index] && subsidized.links[index].length > 0) ?
                                            <a href={subsidized.links[index]} target="_blank">
                                                <img
                                                    className='partners-image'
                                                    alt={subsidized.logos[index]}
                                                    src={'/images/subsidized/'+subsidized.logos[index]}
                                                />
                                            </a>
                                        :
                                            <img
                                                className='partners-image'
                                                alt={subsidized.logos[index]}
                                                src={'/images/subsidized/'+subsidized.logos[index]}
                                            />
                                    }
                                </Grid>
                                {
                                    subsidized.logos[index+1] &&
                                    <Grid size={{ xs: 12, md: 6 }} className='partners-div'>
                                        {
                                            (subsidized.links[index+1] && subsidized.links[index+1].length > 0) ?
                                                <a href={subsidized.links[index+1]} target="_blank">
                                                    <img
                                                        className='partners-image'
                                                        alt={subsidized.logos[index+1]}
                                                        src={'/images/subsidized/'+subsidized.logos[index+1]}
                                                    />
                                                </a>
                                            :
                                                <img
                                                    className='partners-image'
                                                    alt={subsidized.logos[index+1]}
                                                    src={'/images/subsidized/'+subsidized.logos[index+1]}
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
        }
        </>
    )
}