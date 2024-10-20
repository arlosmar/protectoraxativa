import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { date, videoFormat } from "@/Utils/Format"; 
import PersonModal from "@/Modals/PersonModal";

export default function Card({t,origin,animal,images_path}){

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
        {id:'deathdate',text:t('animals.record.Deathdate')}
    ];

    return (
        <>
            {
                origin === 'user-animals' &&
                <PersonModal  
                    origin={origin}
                    t={t}
                    show={showPerson}
                    setShow={setShowPerson}      
                    person={personItem}  
                    images_path={images_path}        
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
                    {
                        (animal?.birthdate || animal?.deathdate) &&                   
                        <div className=''>
                            {
                                animal?.birthdate ?
                                    animal.birthdate
                                :
                                    '?'
                            }
                            {
                                animal?.deathdate ?
                                    ' - ' + animal.deathdate
                                :
                                    ' - ?'
                            }
                        </div>                    
                    }
                </div>
            }
            {  
                animal?.image && animal.image.length > 0 &&
                <div className='mb-4'>
                    <img src={images_path+animal.image} className="mx-auto rounded"/>
                </div>
            }
            {  
                animal?.image2 && animal.image2.length > 0 &&
                <div className='mb-4'>
                    <img src={images_path+animal.image2} className="mx-auto rounded"/>
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
            <Grid container spacing={2} className='animal-record-div mb-2'> 
                {
                    columns && columns.length > 0 && columns.map((column,i) => (
                        <Grid size={{ xs: 12, md: 6 }} className=''>
                            <span className='animal-record-title'>{column?.text}:</span>
                            <br/>
                            {animal[column?.id] ? animal[column?.id] : <br/>}                            
                        </Grid>                                                            
                    ))
                }     
                {
                    animal?.description && animal.description.length > 0 &&
                    <Grid size={{ xs: 12 }} className='border-t pt-2'>
                        <div 
                            className='text-center'
                            dangerouslySetInnerHTML={{__html: animal.description}}
                        >                
                        </div>                           
                    </Grid>  
                }                                                      
            </Grid>
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