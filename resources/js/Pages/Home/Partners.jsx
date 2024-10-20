import Grid from '@mui/material/Grid2';

export default function Partners({t,partners}){

    const companies = partners?.companies;
    const friends = partners?.friends;

    return (    	
        <>
        <h1 className='title-home'>
            {t('introduction.partners.title')}
        </h1>
        {
            companies?.logos && companies.logos.length > 0 &&
            <> 
            <h1 className='title-subsection'>
                {t('introduction.partners.companies.title')}
            </h1>
            {
                companies.logos.map((item,index) => {

                    if(index % 2 === 0){

                        return (
                            <Grid container spacing={1}>
                                <Grid size={{ xs: 12, md: 6 }} className='partners-div'>
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
                            <Grid container spacing={1}>
                                <Grid size={{ xs: 12, md: 6 }} className='partners-div'>
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
        </>
    )
}