import Input from '@/Components/Input';
import InputRichText from '@/Components/InputRichText';
import InputSelect from '@/Components/InputSelect';
import { useState, useEffect } from 'react';
import { userName } from "@/Utils/Format"; 

export default function PersonForm({t,data,setData,edit,filter,handleSubmit,options}){

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleSubmit(event);
		}
	}

	const handleInputRichText = (name,content) => {		
		setData(name,content);
	}

	const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    const fields = [
    	{name: 'name',type:'text'},
    	{name: 'surname',type:'text'},
    	{name: 'dni',type:'text'},
    	{name: 'birthdate',type:'date'},
    	{name: 'email',type:'email'},
    	{name: 'phone',type:'phone'},
    	{name: 'address',type:'text'}/*,
    	{name: 'name2',type:'text'},
    	{name: 'surname2',type:'text'},
    	{name: 'dni2',type:'text'},
    	{name: 'birthdate2',type:'date'},
    	{name: 'phone2',type:'text'}*/
    ];

    if(!filter){
    	fields.push({name: 'name2',type:'text'});
    	fields.push({name: 'surname2',type:'text'});
    	fields.push({name: 'dni2',type:'text'});
    	fields.push({name: 'birthdate2',type:'date'});
    	fields.push({name: 'email2',type:'email'});
    	fields.push({name: 'phone2',type:'phone'});
    	fields.push({name: 'address2',type:'text'});
    }

    fields.push({name: 'other_people',type:'text'});

    const [ usersFormatted, setUsersFormatted ] = useState([]);
    const [ valueUser, setValueUser ] = useState(null);
    const [ valuesUsers, setValuesUsers ] = useState([]);

    // to autocomplete when typing  
    const [ inputValueUser, setInputValueUser] = useState('');

    // user@protectoraxativa.org (User)
    const handleInputValueUser = (newValue) => {        
       	setInputValueUser(newValue);
    }

    const handleValueDelete = (item) => {

    	var newValuesUsers = valuesUsers.filter((v) => v.value !== item.value);
    	setValuesUsers(newValuesUsers);

    	// remove from data
    	setData('users_ids',newValuesUsers);

    	// add to options to select
    	setUsersFormatted([...usersFormatted,item]);
  	};

  	const handleEnter = (e) => {
  		
    	if(e.keyCode === 13){ // key === 'Enter'
    		
    		// check if value on list of options and add it
    		var label = e.target.value;
    		var included = false;
    		
	    	usersFormatted.map((val,index) => {
	        	if(val.label === label){
	        		included = val;
	        		return;
	        	}		     	
		    });

	    	if(included){
	    		handleValueUser(included);
	    	}
    	}
  	};

    // {value: 2, label: 'user@protectoraxativa.org (User)'}
    const handleValueUser = (newValue) => {
    	        
        var included = false;
        /*
        not necessary to check if option already selected because if selected
        id disappears from list of options

    	valuesUsers.map((val,index) => {
        	if(val.value === newValue.value){
        		included = true;
        		return;
        	}		     	
	    });

    	if(!included){

    		setValuesUsers([...valuesUsers,newValue]);

    		// remove from options to select
    		setUsersFormatted(usersFormatted.filter((v) => v.value !== newValue.value));
    	} 
    	*/
    	var newValuesUsers = [...valuesUsers,newValue];
    	setValuesUsers(newValuesUsers);

    	// add to data
    	setData('users_ids',newValuesUsers);

    	// remove from options to select
    	setUsersFormatted(usersFormatted.filter((v) => v.value !== newValue.value));

    	setValueUser(null);
    	setInputValueUser('')
    }
    
    useEffect(() => {
        setUsersFormatted(options);
    }, [options]);
    

    useEffect(() => {
        
        // add users to initial values if editing
        if(edit && data?.users_items){
			
			setValuesUsers(data.users_items);

			// remove from options
			//if(data.users_items.length > 0){

				var filterUsers = options;
				data.users_items.map((userItem,index) => {
					filterUsers = filterUsers.filter((v) => v.value !== userItem.value)
				});
				
				setUsersFormatted(filterUsers);
			//}
		}	

    }, [data?.users_items]);

	return (

		<form onSubmit={handleSubmit}>

            <div className="">
                {
                	fields && fields.length > 0 && 
                	fields.map((field) => (
		                <div className='mb-2'>
			                <Input
			                    id={field.name}
			                    name={field.name}
			                    type={field.type}
			                    value={data[field.name]}                        
			                    autoComplete={field.name}
			                    onChange={handleInput}                        
			                    placeholder={t('people.record.'+field.name)}
			                    error=''	
			                    handleKeyDown={filter ? handleKeyDown : null}
		                    />
			            </div>
			    	))
                }
                {
	            	!filter &&
		            <div className='mt-2'>
		            	<InputRichText
		            		name='description'
		            		value={data?.description}
		            		placeholder={t('people.record.description')}
		            		onChange={(content) => handleInputRichText('description',content)}
		            	/>		                
		            </div>
		        }

		        {
	            	!filter &&
		            <div className='mt-2'>
		            	<InputSelect                        
	                        name="users"                        
	                        value={valueUser}
	                        values={valuesUsers}
	                        onChange={(e,value) => handleValueUser(value)}
	                        inputValue={inputValueUser}
	                        onInputChange={(e,value) => handleInputValueUser(value)}
	                        handleValueDelete={handleValueDelete}
	                        onKeyUp={handleEnter}
	                        options={usersFormatted}
	                        placeholder={t('people.record.users')}
	                        error=''
	                        multiple	                        
	                    />
		            </div>
		        }
            </div>

        </form>
	)
}