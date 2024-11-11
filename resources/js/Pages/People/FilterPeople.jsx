import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import { useForm } from '@inertiajs/react';

import FilterPeopleModal from '@/Modals/FilterPeopleModal';

import { filter } from "@/Utils/Filter";

export default function FilterPeople({origin,t,originalItems,items,setItems,openSearch,setOpenSearch,
filterUsed,setFilterUsed}){

    const fields = {
        'name'  :   'text',
        'surname'  :   'text',
        'dni'  :   'text',
        'birthdate'  :   'date',
        'phone'  :   'text',
        /*'name2'  :   'text',
        'surname2'  :   'text',
        'dni2'  :   'text',
        'birthdate2'  :   'date',
        'phone2'  :   'text',
        'description'   :   'text'*/
        'other_people'  :   'text'
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
        
        var itemsFiltered = filter('people',originalItems,fields,data);

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
            <div className='text-center mb-4'>
                <a className='cursor-pointer' onClick={handleReset}>{t('trans.removeFilters')}</a>
            </div>
        }
        <FilterPeopleModal
            origin={origin}
            t={t}
            show={openSearch}
            setShow={setOpenSearch}
            data={data}
            setData={setData}
            handleSubmit={handleSubmit}          
        />
        </>
    )
}