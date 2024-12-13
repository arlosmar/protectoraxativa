import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { date, videoFormat, yearsFormatted } from "@/Utils/Format"; 
import PersonModal from "@/Modals/PersonModal";

export default function Card({t,origin,animal,imagePath,imagesPaths}){

    const [ showPerson, setShowPerson ] = useState(false);
    const [ personItem, setPersonItem ] = useState(null);

    const handleInfo = (item) => {            
        setPersonItem(item);
        setShowPerson(true);
    };

    const columns = [
        {id:'code',text:t('animals.record.Code')},
        {id:'name',text:t('animals.record.Name')},
        {id:'status',text:t('animals.record.Status.title')},
        {id:'sponsor',text:t('animals.record.Sponsored.title')},
        {id:'location',text:t('animals.record.Location')},
        {id:'type',text:t('animals.record.Type.title')},
        {id:'breed',text:t('animals.record.Breed.title')},
        {id:'gender',text:t('animals.record.Gender.title')},
        {id:'size',text:t('animals.record.Size.title')},
        {id:'weight',text:t('animals.record.Weight')+' (Kg)'},
        {id:'age',text:t('animals.record.Age.title')},
        {id:'birthdate',text:t('animals.record.Birthdate')},
        {id:'deathdate',text:t('animals.record.Deathdate'),show:'heaven'}
    ];

    const columnsInternal = [
        {id:'vaccines',text:t('animals.record.vaccines')},
        {id:'treatment',text:t('animals.record.treatment')},
        {id:'castrated',text:t('animals.record.castrated')},
        {id:'date_entry',text:t('animals.record.date_entry')},
        {id:'date_exit',text:t('animals.record.date_exit')},
        {id:'date_entry2',text:t('animals.record.date_entry2')},
        {id:'date_exit2',text:t('animals.record.date_exit2')}        
    ];

    const potentiallySponsoredTitle = t('animals.record.Sponsored.potentially-sponsor');

    return (
        origin === 'adopted' ?
            <>
            {  
                animal?.name && animal.name.length > 0 &&
                <div className='title'>
                    {animal?.name}
                </div>
            }
            {    
                (                  
                    (animal?.image_sponsored && animal.image_sponsored.length > 0) ||
                    (animal?.image && animal.image.length > 0) ||
                    (animal?.image2 && animal.image2.length > 0)
                ) &&
                <div className='mb-4'>
                    <a href={
                        animal.image_sponsored && animal.image_sponsored.length > 0 ?
                            imagePath+animal.image_sponsored
                        :
                            animal.image && animal.image.length > 0 ?
                                imagePath+animal.image
                            :
                                imagePath+animal.image2
                    } target='_blank'>
                        <img src={
                            animal.image_sponsored && animal.image_sponsored.length > 0 ?
                                imagePath+animal.image_sponsored
                            :
                                animal.image && animal.image.length > 0 ?
                                    imagePath+animal.image
                                :
                                    imagePath+animal.image2
                        } className="mx-auto rounded"/>
                    </a>
                </div>
            }
            </>
        :
            <>
            {
                origin === 'user-animals' &&
                <PersonModal  
                    origin={origin}
                    t={t}
                    show={showPerson}
                    setShow={setShowPerson}      
                    person={personItem}  
                    imagesPaths={imagesPaths}
                />
            }
            {  
                animal?.name && animal.name.length > 0 &&
                <div className='title'>
                    {animal?.name}
                </div>
            }
            {  
                origin && origin === 'heaven' &&
                (
                    (animal?.location && animal.location.length > 0) ||
                    (animal?.birthdate) ||
                    (animal?.deathdate)
                ) &&
                <div className='mb-4 text-center'>
                    { 
                        animal?.location && animal.location.length > 0 &&
                        <div className=''>
                            {animal?.location}
                        </div>
                    }
                    <div className=''>
                        {yearsFormatted(animal?.birthdate_year,animal?.deathdate_year)}
                    </div>                                        
                </div>
            }
            {  
                animal?.image && animal.image.length > 0 &&
                <div className='mb-4'>
                    <a href={imagePath+animal.image} target='_blank'>
                        <img src={imagePath+animal.image} className="mx-auto rounded"/>
                    </a>
                </div>
            }
            {  
                animal?.image2 && animal.image2.length > 0 &&
                <div className='mb-4'>
                    <a href={imagePath+animal.image2} target='_blank'>
                        <img src={imagePath+animal.image2} className="mx-auto rounded"/>
                    </a>
                </div>
            }
            {  
                (
                    origin === 'user-animals' || origin === 'user-people' || 
                    origin === 'sponsored' || origin === 'intranet-sponsored' ||
                    origin === 'intranet-adopted' || origin === 'intranet-sponsored'
                ) &&
                animal?.image_sponsored && animal.image_sponsored.length > 0 &&
                <div className='mb-4 text-center'>
                    {
                        (origin === 'user-animals' || origin === 'user-people') &&
                        <span className='animal-record-title'>{t('animals.record.Image-Sponsored')}</span>
                    }
                    <a href={imagePath+animal.image_sponsored} target='_blank'>
                        <img src={imagePath+animal.image_sponsored} className="mx-auto rounded"/>
                    </a>
                </div>
            }
            {  
                animal?.video && animal.video.length > 0 &&
                <div className="mx-auto w-full mb-4">
                    <iframe
                        class='video'                       
                        src={videoFormat(animal.video)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen                        
                    />
                </div>
            }
            {  
                animal?.video2 && animal.video2.length > 0 &&
                <div className="mx-auto w-full mb-4">
                    <iframe
                        class='video'                       
                        src={videoFormat(animal.video2)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen                        
                    />
                </div>
            }
            {
                (
                    !origin || 
                    (origin === 'heaven' && animal?.description && animal.description.length > 0) ||
                    (origin !== 'heaven' && origin !== 'sponsored')
                ) &&
                <Grid container spacing={2} className='animal-record-div mb-2'> 
                    {
                        origin !== 'heaven' &&
                        columns && columns.length > 0 && columns.map((column,i) => (                        
                            (  
                                (
                                    origin && 
                                    (
                                        origin === 'user-animals' || 
                                        origin === 'user-people'
                                    )
                                ) ||
                                !column?.show || 
                                column.show === origin                                
                            ) &&
                            <Grid size={{ xs: 6, sm: 6 }} className=''>
                                <span className='animal-record-title'>{column?.text}:</span>
                                <br/>
                                {
                                    animal[column?.id] ? 

                                        // if sponsored column and not on the user
                                        // show potentially sponsored => no
                                        (
                                            origin !== 'user-animals' &&
                                            origin !== 'user-people' &&
                                            column?.id === 'sponsor' && 
                                            animal[column?.id] === potentiallySponsoredTitle
                                        ) ?
                                            'No'
                                        :
                                            animal[column?.id] 
                                    : 
                                        <br/>
                                }
                            </Grid>
                        ))
                    }     
                    {
                        animal?.description && animal.description.length > 0 &&
                        <Grid size={{ xs: 12 }} className={`${origin !== 'heaven' ? 'border-t' : ''} pt-2'`}>
                            <div 
                                className='text-center pt-2'
                                dangerouslySetInnerHTML={{__html: animal.description}}
                            >                
                            </div>                           
                        </Grid>  
                    }                                                      
                </Grid>
            }
            {
                (origin === 'user-animals' || origin === 'user-people') &&
                (
                    (columnsInternal && columnsInternal.length > 0) ||
                    (animal?.internal && animal.internal.length > 0)
                ) &&
                <>
                <h1 id='internal-info-title'>{t('animals.record.Internal-Info')}</h1>
                <Grid container spacing={2} className='animal-record-div mb-2'>                     
                    {                        
                        columnsInternal.map((column,i) => (
                            <Grid size={{ xs: 6, sm: 6 }} className=''>
                                <span className='animal-record-title'>{column?.text}:</span>
                                <br/>
                                {
                                    animal[column?.id] ?
                                        animal[column?.id]
                                    : 
                                        <br/>
                                }
                            </Grid>
                        ))
                    }     
                    {
                        animal?.internal && animal.internal.length > 0 &&
                        <Grid size={{ xs: 12 }} className='border-t pt-2'>
                            <div 
                                className='text-center'
                                dangerouslySetInnerHTML={{__html: animal.internal}}
                            >                
                            </div>                           
                        </Grid>  
                    }                                                      
                </Grid>
                </>
            }
            {  
                origin &&
                (                           
                    origin === 'heaven' ||
                    origin === 'sponsored' ||
                    origin === 'adopted' ||
                    origin === 'user-people' || 
                    origin === 'user-animals'
                ) && 
                (animal?.person)
                &&                        
                <div className='mb-4' id='animal-parents'>
                    <span className='animal-record-title'>
                        {
                            origin === 'sponsored' ? 
                                t('animals.record.Sponsors') 
                            : 
                                t('animals.record.Parents')
                        }:
                    </span>
                    <br/>
                    {
                        origin === 'user-animals' ?
                            <a 
                                className='cursor-pointer'
                                onClick={() => handleInfo(animal?.person)}
                            >
                                {animal?.person_name ? animal.person_name : animal?.person_id}
                            </a>
                        :
                            animal?.person_name ? animal.person_name : animal?.person_id
                    }
                </div>                        
            }
            </>
    )
}