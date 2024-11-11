import { useState } from 'react';
//import Box from '@mui/material/Box';
import { useForm } from '@inertiajs/react';

//import AnimalForm from '@/Forms/AnimalForm';

import FilterAnimalsModal from '@/Modals/FilterAnimalsModal';

import { filter } from "@/Utils/Filter";

export default function FilterAnimals({origin,t,originalItems,items,setItems,openSearch,setOpenSearch,
    options,filterUsed,setFilterUsed,subsection}){

    const fields = {
        'hidden'    :   'boolean',
        'code'  :   'integer',
        'status_id' :   'integer',
        //'status',
        'sponsor_id' : 'integer',
        //'sponsor'    : 'text',
        'type_id' : 'integer',
        //'type'    : 'text',
        'age_id' : 'integer',
        //'age'    : 'text',
        'gender_id' : 'integer',
        //'gender'    : 'text',
        'size_id' : 'integer',
        //'size'    : 'text',
        'breed_id' : 'integer',
        //'breed'    : 'text',
        'name' : 'text',
        'weight' : 'float',
        'birthdate' : 'date',
        'deathdate' : 'date',
        //'description' : 'text',
        'location' : 'text',
        'image' : 'text',
        'image2' : 'text',
        'person_id' : 'integer'//,
        //'person'    : 'text',
        //'person_name' : ''
    };

    var nullValues = {};
    Object.keys(fields).map((key,index) => {
        nullValues[key] = null;
    });

    const { data, setData, reset } = useForm(nullValues);

    const resetFields = (e) => {
        reset();
        setData(nullValues);
    }

	const handleSubmit = (e) => {

        setFilterUsed(true);

        e.preventDefault();
        
        var itemsFiltered = filter('animals',originalItems,fields,data);

        setItems(itemsFiltered);
        setOpenSearch(false);
    };

    const handleReset = (e) => {    
        setFilterUsed(false);    
    	resetFields();
    	setItems(originalItems);
    	setOpenSearch(false);
    }

	return (
        <>	
        {
            filterUsed && 
            items && originalItems &&
            (items.length !== originalItems.length) &&
            <div className='text-center mb-4'>
                <a className='cursor-pointer' onClick={handleReset}>{t('trans.removeFilters')}</a>
            </div>
        }
        <FilterAnimalsModal
            origin={origin}
            t={t}
            show={openSearch}
            setShow={setOpenSearch}
            data={data}
            setData={setData}
            handleSubmit={handleSubmit}
            options={options}     
            subsection={subsection}      
        />
        </>
    )
}