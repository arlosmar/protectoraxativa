import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import { useForm } from '@inertiajs/react';

import FilterNewsModal from '@/Modals/FilterNewsModal';
import { filter } from "@/Utils/Filter";

export default function FilterNews({origin,t,originalItems,items,setItems,openSearch,setOpenSearch,
filterUsed,setFilterUsed,options}){

    const fields = {
        //'user_name'  :   'text',
        'title'  :   'text',
        'description'  :   'text',
        'date'  :   'date',
        'hidden'  :   'boolean'
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
        
        // if coming from public news, call by ajax to get all the news
        if(origin === 'news'){
            var allItems = originalItems;
            var itemsFiltered = filter('news',allItems,fields,data);
        }
        else{
            var itemsFiltered = filter('news',originalItems,fields,data);
        }

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
        <FilterNewsModal
            origin={origin}
            t={t}
            show={openSearch}
            setShow={setOpenSearch}
            data={data}
            setData={setData}
            handleSubmit={handleSubmit}    
            options={options}      
        />
        </>
    )
}