import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { date } from "@/Utils/Format"; 

export default function Card({t,origin,news,imagePath,imagesPaths}){

    const columns = [
        {id:'date',text:t('news.record.date'),type:'text'},
        {id:'hidden',text:t('news.record.hidden'),type:'boolean'},
        //{id:'user_name',text:t('news.record.user'),type:'text'},        
    ];

    return (
        <>
        {  
            news?.title && news.title.length > 0 &&
            <div className='title'>
                {news?.title}
            </div>
        }
        {  
            news?.image && news.image.length > 0 &&
            <div className='mb-4'>
                <a href={imagePath+news.image} target='_blank'>
                    <img src={imagePath+news.image} className="mx-auto rounded"/>
                </a>
            </div>
        }
        {
            news?.description && news.description.length > 0 &&
            <Grid size={{ xs: 12 }} className='mb-4'>
                <div 
                    className='text-center'
                    dangerouslySetInnerHTML={{__html: news.description}}
                >                
                </div>
            </Grid>
        }  
        <Grid container spacing={2} className='news-record-div mb-2'> 
            {
                columns && columns.length > 0 && columns.map((column,i) => (
                    <>                    
                    <Grid size={{ xs: 12, md: 6 }}>
                        <span className='news-record-title'>{column?.text}:</span>
                        <br/>
                        {
                            news[column?.id] !== null ? 
                                column?.type === 'phone' ?
                                    <a href={'tel:'+news[column?.id]} target='_blank'>
                                        {news[column?.id]}
                                    </a>
                                :
                                    column?.type === 'email' ?
                                        <a href={'mailto:'+news[column?.id]} target='_blank'>
                                            {news[column?.id]}
                                        </a>
                                    :
                                        column?.type === 'boolean' ?
                                            !news[column?.id] ? t('trans.No') : t('trans.Yes')
                                        :
                                            news[column?.id] 
                            : 
                                <br/>
                        }
                    </Grid>                                                            
                    </>
                ))
            }                                                   
        </Grid>
        </>
    )
}