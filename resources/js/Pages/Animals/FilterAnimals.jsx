import { useState } from 'react';
//import Box from '@mui/material/Box';
import { useForm } from '@inertiajs/react';

//import AnimalForm from '@/Forms/AnimalForm';

import FilterAnimalsModal from '@/Modals/FilterAnimalsModal';

import { validDBdate } from "@/Utils/Format";

export default function FilterAnimals({origin,t,originalItems,items,setItems,openSearch,setOpenSearch,options}){

    const fields = {
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
    /*
    const nullValues = {
        'code' : null,
        'status_id' : null,
        'status'    : null,
        'sponsor_id' : null,
        'sponsor'    : null,
        'type_id' : null,
        'type'    : null,
        'age_id' : null,
        'age'    : null,
        'gender_id' : null,
        'gender'    : null,
        'size_id' : null,
        'size'    : null,
        'breed_id' : null,
        'breed'    : null,
        'name' : null,
        'weight' : null,
        'birthdate' : null,
        'deathdate' : null,
        'description' : null,
        'location' : null,
        'image' : null,
        'image2' : null,
        'person_id' : null,
        'person'    : null,
        'person_name' : null
    };
    */

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

        /*
        var empty = true;
        Object.keys(data).map((key,index) => {
            
            if(
                (fields[key] === 'text' && data[key] && data[key].length > 0) ||
                (fields[key] === 'integer' && data[key]) ||
                (fields[key] === 'float' && data[key]) ||
                (fields[key] === 'date' && data[key] !== null)
            ){
                empty = false;
                return;
            }

        });
        */
        var empty = false;
        
        if(!empty){

	        itemsFiltered = originalItems.filter((item) => {

                var result = true;
                Object.keys(data).map((key,index) => {


                    switch(fields[key]){                        

                        case 'date':
                            if(validDBdate(data[key])){
                                if(
                                    !validDBdate(item[key]) ||
                                    (new Date(item[key]).getTime() !== new Date(data[key]).getTime())
                                ){
                                    result = false;
                                    return; // exit from map
                                }
                            }
                            break;

                        case 'integer':
                            if(data[key] !== null){
                                if(
                                    item[key] === null ||
                                    parseInt(item[key]) !== parseInt(data[key])
                                ){
                                    result = false;
                                    return; // exit from map
                                }
                            }
                            break;

                        case 'float':
                            if(data[key] !== null){
                                if(
                                    item[key] === null ||
                                    parseFloat(item[key]) !== parseFloat(data[key])
                                ){
                                    result = false;
                                    return; // exit from map
                                }
                            }
                            break;

                        case 'text':
                        default:
                            if(data[key] && data[key].length > 0){
                                if(
                                    !item[key] || 
                                    item[key].length === 0 ||
                                    !item[key].toLowerCase().includes(data[key].toLowerCase())
                                ){
                                    result = false;
                                    return; // exit from map
                                }
                            }
                            break;
                    }
                });

                return result;
			});
		}

        setItems(itemsFiltered);
        setOpenSearch(false);
    };

    const handleReset = (e) => {        
    	resetFields();
    	setItems(originalItems);
    	setOpenSearch(false);
    }

    /*
        <Collapse 
            in={openSearch}
            //onEntered={() => console.log("expand animation done")}
            //onExited={() => console.log("collapse animation done")}
        >
            <Box sx={{borderRadius: 1, boxShadow: 5, marginBottom: 2, padding: 1, bgcolor: '#F8F8F8'}}>
                <AnimalForm
                    origin={origin}
                    t={t}
                    submitButtonText={t('trans.Search')}
                    cancelButtonText={t('trans.Reset')}
                    handleSubmit={handleSubmit}
                    handleCancel={handleReset}
                    data={data}
                    setData={setData}
                    options={options}  
                    filter
                    buttonsTop                  
                />
            </Box>
        </Collapse>
    */

	return (
        <>	
        {
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
        />
        </>
    )
}