import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { date, peopleNames } from "@/Utils/Format"; 
import AnimalModal from "@/Modals/AnimalModal";

export default function Card({t,origin,person,imagePath,imagesPaths}){

    const [ showAnimal, setShowAnimal ] = useState(false);
    const [ animalItem, setAnimalItem ] = useState(null);

    const handleInfo = (item) => {            
        setAnimalItem(item);
        setShowAnimal(true);
    };

    const columns = [
        {id:'name',text:t('people.record.name'),type:'text'},
        {id:'surname',text:t('people.record.surname'),type:'text'},
        {id:'dni',text:t('people.record.dni'),type:'text'},
        {id:'birthdate',text:t('people.record.birthdate'),type:'text'},
        {id:'email',text:t('people.record.email'),type:'email'},
        {id:'phone',text:t('people.record.phone'),type:'phone'},
        {id:'address',text:t('people.record.address'),type:'text'},
        {id:'name2',text:t('people.record.name2'),type:'text'},
        {id:'surname2',text:t('people.record.surname2'),type:'text'},
        {id:'dni2',text:t('people.record.dni2'),type:'text'},
        {id:'birthdate2',text:t('people.record.birthdate2'),type:'text'},
        {id:'email2',text:t('people.record.email2'),type:'email'},
        {id:'phone2',text:t('people.record.phone2'),type:'phone'},
        {id:'address2',text:t('people.record.address2'),type:'text'}
    ];

    return (
        <>
        <AnimalModal  
            origin='user-people'
            t={t}
            show={showAnimal}
            setShow={setShowAnimal}      
            animal={animalItem}      
            imagesPaths={imagesPaths}
        />
        <div className='title'>
            {peopleNames(person)}            
        </div>
        <Grid container spacing={2} className='person-record-div mb-2'> 
            {
                columns && columns.length > 0 && columns.map((column,i) => (
                    <>
                    {
                        column?.id === 'name2' &&
                        <Grid size={{ xs: 12 }} className='border-t'></Grid>
                    }
                    <Grid size={{ xs: 6, sm: 6 }}>
                        <span className='person-record-title'>{column?.text}:</span>
                        <br/>
                        {
                            person[column?.id] ? 
                                column?.type === 'phone' ?
                                    <a href={'tel:'+person[column?.id]} target='_blank'>
                                        {person[column?.id]}
                                    </a>
                                :
                                    column?.type === 'email' ?
                                        <a href={'mailto:'+person[column?.id]} target='_blank'>
                                            {person[column?.id]}
                                        </a>
                                    :
                                        person[column?.id] 
                            : 
                                <br/>
                        }
                    </Grid>                                                            
                    </>
                ))
            }
            {
                person?.other_people && person.other_people.length > 0 &&
                <Grid size={{ xs: 12 }} className='border-t pt-2'>
                    <span className='person-record-title'>{t('people.record.others')}:</span>
                    <br/>
                    {person.other_people}
                </Grid>       
            }
            {
            person?.description && person.description.length > 0 &&
                <Grid size={{ xs: 12 }} className='border-t pt-2'>
                    <div 
                        className='text-center'
                        dangerouslySetInnerHTML={{__html: person.description}}
                    >                
                    </div>
                </Grid>
            }                                                     
        </Grid>
        {
            origin === 'user-people' &&
            <div className='mb-4' id='animal-parents'>
                <span className='animal-record-title'>
                    {t('people.record.animals')}:
                </span>
                <br/>
                {
                    person?.animals && person.animals.length > 0 &&
                    person.animals.map((item,i) => (   
                        <>                    
                        <a 
                            className='cursor-pointer'
                            onClick={() => handleInfo(item)}
                        >
                            {
                                item?.name && item.name.length > 0 ? 
                                    item.name
                                :
                                    item?.code ?
                                        item.code
                                    :
                                        item?.id
                            }
                        </a>
                        <br/>
                        </>
                    ))
                }
            </div>
        }

        {
            person?.users_items && person.users_items.length > 0 &&
            <div className='mb-4' id='animal-parents'>
                <span className='animal-record-title'>
                    {t('people.record.users')}:
                </span>                
                {                    
                    person.users_items.map((item,i) => (   
                        <>
                        <br/>
                        {item.label}
                        </>
                    ))
                }
            </div>
        }
        </>
    )
}