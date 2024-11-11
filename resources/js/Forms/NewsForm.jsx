import { useState, useEffect } from 'react';
import Input from '@/Components/Input';
import InputSelect from '@/Components/InputSelect';
import InputRichText from '@/Components/InputRichText';
import Switch from '@/Components/Switch';

export default function NewsForm({origin,t,data,setData,options,edit,filter,handleSubmit,imagePath}){

	const [ optionsFormatted, setOptionsFormatted ] = useState([]);
	const [ preview, setPreview ] = useState(null);

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleSubmit(event);
		}
	}

	const handleInputRichText = (name,content) => {		
		setData(name,content);
	}

	const handleInput = (e) => {

		var name = e.target.name;		

		switch(name){

			case 'image':
				var value_file = e.target.files[0];				
				setData('image_file',value_file);

				var objectUrl = URL.createObjectURL(value_file);
				setPreview(objectUrl);
				break;
		
			case 'hidden':			
				var value = e.target.checked ? 1 : 0;
				setData(name,value);
				break;

			case 'description':
				var value = e.target.getContent();
				setData(name,value);

			default:
        		var value = e.target.value;
        		setData(name,value);
        		break;
        }        
    }

    // to set the value when chosen
    const [ valueUser, setValueUser ] = useState(null);

    const setValue = (field,newValue) => {

    	switch(field){

			case 'user_id':
				setValueUser(newValue);
				break;
		}
    }

    const handleValue = (field,newValue) => {        

        setValue(field,newValue);

    	// save data
    	var tag = null;
    	switch(field){

			case 'user_id':
				tag = 'user';
				break;
		}

		if(tag){

			var newData = data;
	        if(newValue?.value){        	
	        	//setData({...data,field:newValue.value,'status':newValue.label});        	
	        	newData[field] = newValue.value;
	        	newData[tag] = newValue.label;

	        	// search the object
	        	if(field === 'user_id'){
	        		var userOptions = options['user_id'];	        		
	        		newData['user'] = userOptions.find(user => user?.id === newValue.value);	        		
	        		newData['user_name'] = newData['user']?.name;
	        	}
	        }
	        else{
	        	newData[field] = null;
	        	newData[tag] = null;

	        	if(tag === 'user_id'){
	        		newData['user'] = null;
	        		newData['user_name'] = null;
	        	}
	        }

	        setData(newData);
	    }
    }

    const fields = [    	    	
    	{name: 'title',type:'text'},    	
    	{name: 'date',type: filter ? 'date' : 'datetime-local'}
    ];

    const [ inputValues, setInputValues ] = useState('');

    const handleInputValue = (field,newValue) => {        
        var newValues = inputValues;
        newValues[field] = newValue;
        setInputValues(newValues);
    }

    const handleFileRemove = (field) => {
    	
    	var name = field;

		setData('image_file',null);			
		setPreview(null);

		document.getElementsByName(field)[0].value = null;
    }

    const handleImageRemove = (e) => {
    	var name = e.target.name;
		setData('image',null);
    }

    useEffect(() => {
        
        var optsFormatted = [];
        //var optsDefault = [];
        var optsInputs = [];

        if(options){

        	var keys = Object.keys(options);

        	if(keys.length > 0){

        		// breed_id => [['id' => 1, 'name' => 'armando']]        		
        		keys.map((key) => {

	        		var valuesFormatted = [];

	        		var valuesKey = options[key];

	        		optsInputs[key] = '';
	        		
	        		if(valuesKey && valuesKey.length > 0){
	        			
	        			valuesKey.map((value,index) => {

	        				var trans = '';
        					switch(key){

        						case 'user_id':
            						trans = value?.name+' ('+value?.email+')';
        							break;
        					}        					
	        				
	        				var element = {value:value?.id,label:trans};
	        				
	            			if(edit && value?.id === data[key]){	            				
	            				setValue(key,element);
	            			}	            			

	            			valuesFormatted.push(element);
	        			
	        			});
	        		}

	        		optsFormatted[key] = valuesFormatted;

	        	});
        	}
        }

        setOptionsFormatted(optsFormatted);
        setInputValues(optsInputs);       
    }, [options,data]);

	return (

		<form onSubmit={handleSubmit}>

            <div className="">
            	{
            		origin === 'user-news' &&
	            	<div className='mb-2'>            		
		                <Switch
		                    name="hidden"	                    
		                    checked={data?.hidden}
		                    onChange={handleInput}
		                    label={t('news.record.hidden')}
	                    />
		            </div>
		        }
	            {
	            	!filter &&
		            <div className='mb-2'>
		                <Input		                    
		                    name="image"
		                    type="file"
		                    autoComplete="image"
		                    onChange={handleInput}		                    
		                    handleFileRemove={handleFileRemove}
		                    placeholder={t('news.record.image')}
		                    accept="image/*"
		                    error=''
	                    />
	                    {
	                    	preview && preview.length > 0 ?
	                    		<div className='text-center mt-2'>
	                    			<span className='text-sm font-bold'>{t('trans.newImage')}</span><br/>
	                    			<img src={preview} className="mx-auto rounded w-50 mt-2"/>
	                    		</div>
	                    	:
	                    		data?.image && data.image.length > 0 ?
	                    			<div className='text-center mt-2'>
	                    				<span className='text-sm font-bold'>
	                    					{t('trans.currentImage')} (<a 
	                    						name='image'
	                    						className='cursor-pointer'
	                    						onClick={handleImageRemove}
	                    					>
	                    						{t('trans.Remove')}
	                    					</a>)
	                    				</span>
	                    				<br/>
	                    				<img src={imagePath+data.image} className="mx-auto rounded w-50 mt-2"/>
	                    			</div>
	                    		:
	                    			''
	                    }
		            </div>
		        }
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
			                    placeholder={t('news.record.'+field.name)}
			                    error=''	
			                    handleKeyDown={filter ? handleKeyDown : null}
		                    />
			            </div>
			    	))
                }
                {
                	!filter &&
	                <div className='mt-2'>
		            	<InputSelect                        
	                        name="user_id"                        
	                        value={valueUser}
	                        onChange={(e,value) => handleValue('user_id',value)}
	                        inputValue={inputValues?.user_id}
	                        onInputChange={(e,value) => handleInputValue('user_id',value)}
	                        options={optionsFormatted?.user_id}
	                        placeholder={t('news.record.user')}
	                        error=''
	                        autoComplete                        
	                    />
		            </div>
		        }
                {
	            	!filter &&
		            <div className='mt-2'>
		            	<InputRichText
		            		name='description'
		            		value={data?.description}
		            		placeholder={t('news.record.description')}
		            		onChange={(content) => handleInputRichText('description',content)}
		            	/>		                
		            </div>
		        }		        
            </div>

        </form>
	)
}