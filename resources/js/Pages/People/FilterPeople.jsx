import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import { useForm } from '@inertiajs/react';

import FilterPeopleModal from '@/Modals/FilterPeopleModal';

import { validDBdate } from "@/Utils/Format";

export default function FilterPeople({origin,t,originalItems,items,setItems,openSearch,setOpenSearch}){

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

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        
        var itemsFiltered = originalItems;

        itemsFiltered = originalItems.filter((item) => {

            var result = true;
            Object.keys(data).map((key,index) => {

                var key2 = key+'2';
                switch(fields[key]){                        

                    case 'date':
                        if(validDBdate(data[key])){ 

                            if(validDBdate(item[key])){ 

                                if(new Date(item[key]).getTime() !== new Date(data[key]).getTime()){
                                    
                                    if(validDBdate(item[key2])){ 

                                        if(new Date(item[key2]).getTime() !== new Date(data[key]).getTime()){
                                            result = false;
                                            return;
                                        }                                        
                                    }
                                    else{
                                        result = false;
                                        return;
                                    }
                                }                                
                            }
                            else{
                                if(validDBdate(item[key2])){ 

                                    if(new Date(item[key2]).getTime() !== new Date(data[key]).getTime()){
                                        result = false;
                                        return;
                                    }                                        
                                }
                                else{
                                    result = false;
                                    return;
                                }
                            }                       
                        }
                        break;

                    case 'integer':
                        if(data[key] !== null){ 

                            if(item[key] !== null){ 

                                if(parseInt(item[key]) !== parseInt(data[key])){
                                    
                                    if(item[key2] !== null){ 

                                        if(parseInt(item[key2]) !== parseInt(data[key])){
                                            result = false;
                                            return;
                                        }                                        
                                    }
                                    else{
                                        result = false;
                                        return;
                                    }
                                }                                
                            }
                            else{
                                if(item[key2] !== null){ 

                                    if(parseInt(item[key2]) !== parseInt(data[key])){
                                        result = false;
                                        return;
                                    }                                        
                                }
                                else{
                                    result = false;
                                    return;
                                }
                            }                       
                        }
                        break;

                    case 'float':
                        if(data[key] !== null){ 

                            if(item[key] !== null){ 

                                if(parseFloat(item[key]) !== parseFloat(data[key])){
                                    
                                    if(item[key2] !== null){ 

                                        if(parseFloat(item[key2]) !== parseFloat(data[key])){
                                            result = false;
                                            return;
                                        }                                        
                                    }
                                    else{
                                        result = false;
                                        return;
                                    }
                                }                                
                            }
                            else{
                                if(item[key2] !== null){ 

                                    if(parseFloat(item[key2]) !== parseFloat(data[key])){
                                        result = false;
                                        return;
                                    }                                        
                                }
                                else{
                                    result = false;
                                    return;
                                }
                            }                       
                        }
                        break;

                    case 'text':
                    default:
                        if(data[key] && data[key].length > 0){ 

                            if(item[key] && item[key].length > 0){ 

                                if(!item[key].toLowerCase().includes(data[key].toLowerCase())){
                                    
                                    if(item[key2] && item[key2].length > 0){ 

                                        if(!item[key2].toLowerCase().includes(data[key].toLowerCase())){
                                            result = false;
                                            return;
                                        }                                        
                                    }
                                    else{
                                        result = false;
                                        return;
                                    }
                                }                                
                            }
                            else{
                                if(item[key2] && item[key2].length > 0){ 

                                    if(!item[key2].toLowerCase().includes(data[key].toLowerCase())){
                                        result = false;
                                        return;
                                    }                                        
                                }
                                else{
                                    result = false;
                                    return;
                                }
                            }                       
                        }
                        break;
                }
            });

            return result;
        });

        setItems(itemsFiltered);
        setOpenSearch(false);
    };

    const handleReset = (e) => {        
        resetFields();
        setItems(originalItems);
        setOpenSearch(false);
    }

    return (
        <>  
        {
            items && originalItems &&
            (items.length !== originalItems.length) &&
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