import Input from '@/Components/Input';
import InputSelect from '@/Components/InputSelect';
import InputRichText from '@/Components/InputRichText';
import Switch from '@/Components/Switch';
import { useState, useEffect } from 'react';
import { videoFormat, peopleNames } from "@/Utils/Format"; 

export default function AnimalForm({origin,t,data,setData,options,edit,filter,
	imagePath,handleSubmit,subsection}){

	const [ optionsFormatted, setOptionsFormatted ] = useState([]);
	const [ preview, setPreview ] = useState(null);
	const [ preview2, setPreview2 ] = useState(null);
	const [ previewSponsored, setPreviewSponsored ] = useState(null);

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
		
			case 'image2':
				var value_file = e.target.files[0];
				setData('image2_file',value_file);

				var objectUrl = URL.createObjectURL(value_file);
				setPreview2(objectUrl);
				break;

			case 'image_sponsored':
				var value_file = e.target.files[0];
				setData('image_sponsored_file',value_file);

				var objectUrl = URL.createObjectURL(value_file);
				setPreviewSponsored(objectUrl);
				break;

			case 'hidden':
			case 'dead':
			case 'castrated':
				var value = e.target.checked ? 1 : 0;
				setData(name,value);
				break;

			default:
        		var value = e.target.value;        		
        		setData(name,value);
        		break;
        }
    }

    // to set the value when chosen
    const [ valueStatus, setValueStatus ] = useState(null);
    const [ valueSponsor, setValueSponsor ] = useState(null);
    const [ valueType, setValueType ] = useState(null);
    const [ valueAge, setValueAge ] = useState(null);
    const [ valueGender, setValueGender ] = useState(null);
    const [ valueSize, setValueSize ] = useState(null);
    const [ valueBreed, setValueBreed ] = useState(null);
    const [ valuePerson, setValuePerson ] = useState(null);

    const setValue = (field,newValue) => {

    	switch(field){

			case 'status_id':
				setValueStatus(newValue);
				break;
			
			case 'sponsor_id':
				setValueSponsor(newValue);
				break;

			case 'type_id':
				setValueType(newValue);
				break;

			case 'age_id':
				setValueAge(newValue);
				break;

			case 'gender_id':
				setValueGender(newValue);
				break;

			case 'size_id':
				setValueSize(newValue);
				break;

			case 'breed_id':
				setValueBreed(newValue);
				break;

			case 'person_id':
				setValuePerson(newValue);
				break;
		}

    }

    const handleValue = (field,newValue) => {        

        setValue(field,newValue);

    	// save data
    	var tag = null;
    	switch(field){

			case 'status_id':
				tag = 'status';
				break;
			
			case 'sponsor_id':
				tag = 'sponsor';
				break;

			case 'type_id':
				tag = 'type';
				break;

			case 'age_id':
				tag = 'age';
				break;

			case 'gender_id':
				tag = 'gender';
				break;

			case 'size_id':
				tag = 'size';
				break;

			case 'breed_id':
				tag = 'breed';
				break;

			case 'person_id':
				tag = 'person_name';
				break;
		}

		if(tag){

			var newData = data;
	        if(newValue?.value){        	
	        	//setData({...data,field:newValue.value,'status':newValue.label});        	
	        	newData[field] = newValue.value;
	        	newData[tag] = newValue.label;

	        	// search the person object
	        	if(field === 'person_id'){
	        		var peopleOptions = options['person_id'];	        		
	        		newData['person'] = peopleOptions.find(person => person?.id === newValue.value);	        		
	        	}
	        }
	        else{
	        	newData[field] = null;
	        	newData[tag] = null;

	        	if(tag === 'person_id'){
	        		newData['person'] = null;
	        	}
	        }

	        setData(newData);
	    }
    }

    // to autocomplete when typing  
    const [ inputValues, setInputValues ] = useState('');

    const handleInputValue = (field,newValue) => {        
        var newValues = inputValues;
        newValues[field] = newValue;
        setInputValues(newValues);
    }

    const handleFileRemove = (field) => {
    	
    	var name = field;

		if(name === 'image'){			
			setData('image_file',null);			
			setPreview(null);
		}
		else{
			if(name === 'image2'){			
				setData('image2_file',null);
				setPreview2(null);
			}
			else{
				if(name === 'image_sponsored'){			
					setData('image_sponsored_file',null);
					setPreviewSponsored(null);
				}
			}
		}

		document.getElementsByName(field)[0].value = null;
    }

    const handleImageRemove = (e) => {
    	
    	var name = e.target.name;

		if(name === 'image'){			
			setData('image',null);
		}
		else{
			if(name === 'image2'){			
				setData('image2',null);				
			}
			else{
				if(name === 'image_sponsored'){			
					setData('image_sponsored',null);				
				}
			}
		}
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

        						case 'status_id':
        							trans = t('animals.record.Status.'+value?.name);
        							break;
            					
            					case 'sponsor_id':
            						trans = t('animals.record.Sponsored.'+value?.name);
            						break;

            					case 'type_id':
            						trans = t('animals.record.Type.'+value?.name);
            						break;

            					case 'age_id':
            						trans = t('animals.record.Age.'+value?.name);
            						break;

            					case 'gender_id':
            						trans = t('animals.record.Gender.'+value?.name);
            						break;

            					case 'size_id':
            						trans = t('animals.record.Size.'+value?.name);
            						break;

            					case 'breed_id':
            						trans = value?.name;
            						break;

            					case 'person_id':            						
            						trans = peopleNames(value);
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

			{/*
				buttonsTop &&
				<div className="flex justify-center mb-8">
	            
	                <div className='me-1'>
	                    <button className='animal-link-edit'>
	                        {submitButtonText}
	                    </button>
	                </div>

	                <button className='cancel-button' onClick={handleCancel}>
	                    {
	                    	cancelButtonText && cancelButtonText.length > 0 ?
	                    		cancelButtonText
	                    	:
	                    		t('trans.Close')
	                    }
	                </button>
	            </div>
	        */}

            <div className="">
            	{
	            	(
	            		!filter ||
	            		(origin && origin === 'user-animals' && subsection && subsection === 'heaven')
	            	) &&
	            	<div className=''>            		
		                <Switch
		                    name="hidden"	                    
		                    checked={data?.hidden}
		                    onChange={handleInput}
		                    label={t('animals.record.Hidden')}
	                    />
		            </div>
		        }
                {
                	edit ?
		                <div className='mt-2'>
			                <Input	                    
			                    name="code"
			                    type="integer"
			                    value={data?.code}	                    
			                    placeholder={t('animals.record.Code')}                        	                    
			                    readOnly
		                    />
			            </div>
			        :
			        	filter ? 
			        		<div className=''>
				                <Input	                    
				                    name="code"
				                    type="integer"
				                    value={data?.code}	                    
				                    placeholder={t('animals.record.Code')}                        	                    
				                    autoComplete="code"
				                    onChange={handleInput}
				                    error=''
	                    			handleKeyDown={handleKeyDown}
	                    			isFocused
				                />
				            </div>
				        :
				        	''   
	        	}

	            <div className='mt-2'>
	            {
	            	!filter &&
	            	<InputSelect                        
                        name="status_id"                        
                        value={valueStatus}
                        onChange={(e,value) => handleValue('status_id',value)}
                        inputValue={inputValues?.status_id}
                        onInputChange={(e,value) => handleInputValue('status_id',value)}
                        options={optionsFormatted?.status_id}
                        placeholder={t('animals.record.Status.title')}
                        error=''
                        autoComplete      
                    />
                }
	            </div>

	            {
	            	!filter &&
		            <div className='mt-2'>
		            	<InputSelect                        
	                        name="sponsor_id"                        
	                        value={valueSponsor}
	                        onChange={(e,value) => handleValue('sponsor_id',value)}
	                        inputValue={inputValues?.sponsor_id}
	                        onInputChange={(e,value) => handleInputValue('sponsor_id',value)}
	                        options={optionsFormatted?.sponsor_id}
	                        placeholder={t('animals.record.Sponsored.title')}
	                        error=''
	                        autoComplete                        
	                    />
		            </div>
		        }

	            <div className='mt-2'>
	            	<InputSelect                        
                        name="type_id"                        
                        value={valueType}
                        onChange={(e,value) => handleValue('type_id',value)}
                        inputValue={inputValues?.type_id}
                        onInputChange={(e,value) => handleInputValue('type_id',value)}
                        options={optionsFormatted?.type_id}
                        placeholder={t('animals.record.Type.title')}
                        error=''
                        autoComplete                        
                    />
	            </div>

	            <div className='mt-2'>
	            	<InputSelect                        
                        name="age_id"                        
                        value={valueAge}
                        onChange={(e,value) => handleValue('age_id',value)}
                        inputValue={inputValues?.age_id}
                        onInputChange={(e,value) => handleInputValue('age_id',value)}
                        options={optionsFormatted?.age_id}
                        placeholder={t('animals.record.Age.title')}
                        error=''
                        autoComplete                        
                    />
	            </div>

	            <div className='mt-2'>
	            	<InputSelect                        
                        name="gender_id"                        
                        value={valueGender}
                        onChange={(e,value) => handleValue('gender_id',value)}
                        inputValue={inputValues?.gender_id}
                        onInputChange={(e,value) => handleInputValue('gender_id',value)}
                        options={optionsFormatted?.gender_id}
                        placeholder={t('animals.record.Gender.title')}
                        error=''
                        autoComplete                        
                    />
	            </div>

	            <div className='mt-2'>
	            	<InputSelect                        
                        name="size_id"                        
                        value={valueSize}
                        onChange={(e,value) => handleValue('size_id',value)}
                        inputValue={inputValues?.size_id}
                        onInputChange={(e,value) => handleInputValue('size_id',value)}
                        options={optionsFormatted?.size_id}
                        placeholder={t('animals.record.Size.title')}
                        error=''
                        autoComplete                        
                    />
	            </div>

	            <div className='mt-2'>
	            	<InputSelect                        
                        name="breed_id"                        
                        value={valueBreed}
                        onChange={(e,value) => handleValue('breed_id',value)}
                        inputValue={inputValues?.breed_id}
                        onInputChange={(e,value) => handleInputValue('breed_id',value)}
                        options={optionsFormatted?.breed_id}
                        placeholder={t('animals.record.Breed.title')}
                        error=''
                        autoComplete                        
                    />
	            </div>

	            <div className='mt-2'>
	                <Input	                    
	                    name="name"
	                    type="text"
	                    value={data.name}                        
	                    autoComplete="name"                        
	                    onChange={handleInput}                        
	                    placeholder={t('animals.record.Name')}                        
	                    error=''
	                    handleKeyDown={filter ? handleKeyDown : null} 
	                    isFocused={!filter}                   
                    />
	            </div>

	            <div className='mt-2'>
	                <Input
	                    name="weight"
	                    type="float"
	                    value={data?.weight}                        
	                    autoComplete="weight"                        
	                    onChange={handleInput}                        
	                    placeholder={t('animals.record.Weight')}                        
	                    error=''   
	                    handleKeyDown={filter ? handleKeyDown : null}                 
                    />
	            </div>

	            <div className='mt-2'>
	                <Input	                    
	                    name="birthdate"
	                    type="date"
	                    value={data?.birthdate}                        
	                    autoComplete="birthdate"                        
	                    onChange={handleInput}                        
	                    placeholder={t('animals.record.Birthdate')}                        
	                    error=''
	                    handleKeyDown={filter ? handleKeyDown : null}
                    />
	            </div>

	            {
	            	!filter &&
		            <div className='mt-2'>            		
		                <Switch
		                    name="dead"	                    
		                    checked={data?.dead}
		                    onChange={handleInput}
		                    label={t('animals.record.Dead')}
	                    />
		            </div>
		        }

	            {
	            	(
	            		(!filter && data?.dead) ||
	            		(
	            			filter && 	            			
	            			(
	            				(origin && origin === 'heaven') ||
	            				(origin && origin === 'user-animals' && subsection && subsection === 'heaven')
	            			)
	            		)
	            	) ?
			            <div className='mt-2'>
			                <Input	                    
			                    name="deathdate"
			                    type="date"
			                    value={data?.deathdate}                        
			                    autoComplete="deathdate"                        
			                    onChange={handleInput}                        
			                    placeholder={t('animals.record.Deathdate')}                        
			                    error=''
			                    handleKeyDown={filter ? handleKeyDown : null}

		                    />
			            </div>
			        :
			        	''
		        }
		        {
	            	!filter &&
		            <div className='mt-2'>
		            	<InputRichText
		            		name='description'
		            		value={data?.description}
		            		placeholder={t('animals.record.description')}
		            		onChange={(content) => handleInputRichText('description',content)}
		            	/>		                
		            </div>
		        }

	            <div className='mt-2'>
	                <Input	                    
	                    name="location"
	                    type="text"
	                    value={data?.location}                        
	                    autoComplete="location"                        
	                    onChange={handleInput}                        
	                    placeholder={t('animals.record.Location')}
	                    error=''
	                    handleKeyDown={filter ? handleKeyDown : null}
                    />
	            </div>

	            {
	            	(origin === 'user-animals' || origin === 'user-people') &&
		            <div className='mt-2'>
		            	<InputSelect                        
	                        name="person_id"                        
	                        value={valuePerson}
	                        onChange={(e,value) => handleValue('person_id',value)}
	                        inputValue={inputValues?.person_id}
	                        onInputChange={(e,value) => handleInputValue('person_id',value)}
	                        options={optionsFormatted?.person_id}
	                        placeholder={t('animals.record.Person')}
	                        error=''
	                        autoComplete                        
	                    />
		            </div>
		        }
	            {
	            	!filter &&
	            	<h1 className='border-b mt-4 text-center'>{t('trans.Images')}</h1>
	            }

	            {
	            	!filter &&
		            <div className='mt-2'>
		                <Input		                    
		                    name="image"
		                    type="file"
		                    autoComplete="image"
		                    onChange={handleInput}		                    
		                    handleFileRemove={handleFileRemove}
		                    placeholder={t('animals.record.Image')}
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
	            	!filter &&
		            <div className='mt-2'>
		                <Input		                    
		                    name="image2"
		                    type="file"
		                    autoComplete="image2"
		                    onChange={handleInput}		                    
		                    handleFileRemove={handleFileRemove}
		                    placeholder={t('animals.record.Image2')}
		                    error=''
		                    accept="image/*"
	                    />
	                    {
	                    	preview2 && preview2.length > 0 ?
	                    		<div className='text-center mt-2'>
	                    			<span className='text-sm font-bold'>{t('trans.newImage')}</span><br/>
	                    			<img src={preview2} className="mx-auto rounded w-50 mt-2"/>
	                    		</div>
	                    	:
	                    		data?.image2 && data.image2.length > 0 ?
	                    			<div className='text-center mt-2'>
	                    				<span className='text-sm font-bold'>
	                    					{t('trans.currentImage')} (<a 
	                    						name='image2'
	                    						className='cursor-pointer'
	                    						onClick={handleImageRemove}
	                    					>
	                    						{t('trans.Remove')}
	                    					</a>)
	                    				</span>
	                    				<br/>
	                    				<img src={imagePath+data.image2} className="mx-auto rounded w-50 mt-2"/>
	                    			</div>
	                    		:
	                    			''
	                    }
		            </div>
		        }

		        {
	            	!filter &&
		            <div className='mt-2'>
		                <Input		                    
		                    name="image_sponsored"
		                    type="file"
		                    autoComplete="image_sponsored"
		                    onChange={handleInput}		                    
		                    handleFileRemove={handleFileRemove}
		                    placeholder={t('animals.record.Image-Sponsored')}
		                    error=''
		                    accept="image/*"
	                    />
	                    {
	                    	previewSponsored && previewSponsored.length > 0 ?
	                    		<div className='text-center mt-2'>
	                    			<span className='text-sm font-bold'>{t('trans.newImage')}</span><br/>
	                    			<img src={previewSponsored} className="mx-auto rounded w-50 mt-2"/>
	                    		</div>
	                    	:
	                    		data?.image_sponsored && data.image_sponsored.length > 0 ?
	                    			<div className='text-center mt-2'>
	                    				<span className='text-sm font-bold'>
	                    					{t('trans.currentImage')} (<a 
	                    						name='image_sponsored'
	                    						className='cursor-pointer'
	                    						onClick={handleImageRemove}
	                    					>
	                    						{t('trans.Remove')}
	                    					</a>)
	                    				</span>
	                    				<br/>
	                    				<img src={imagePath+data.image_sponsored} className="mx-auto rounded w-50 mt-2"/>
	                    			</div>
	                    		:
	                    			''
	                    }
		            </div>
		        }

		        {
	            	!filter &&
	            	<h1 className='border-b mt-4 text-center'>{t('trans.Videos')}</h1>
	            }

		        {
	            	!filter &&
	            	<div className='mt-4'>
		                <Input	                    
		                    name="video"
		                    type="text"
		                    value={data?.video}                        
		                    autoComplete="video"                        
		                    onChange={handleInput}                        
		                    placeholder={t('animals.record.Video')}
		                    error=''
	                    />
	                    {
	                    	data?.video && data.video.length > 0 &&
	                    	<div className="mx-auto w-full mt-2">
			                    <iframe
			                        class='video'                       
			                        src={videoFormat(data.video)}
			                        frameBorder="0"
			                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			                        allowFullScreen                        
			                    />
			                </div>
	                    }
		            </div>
	            }

	            {
	            	!filter &&
	            	<div className='mt-8'>
		                <Input	                    
		                    name="video2"
		                    type="text"
		                    value={data?.video2}                        
		                    autoComplete="video2"                        
		                    onChange={handleInput}                        
		                    placeholder={t('animals.record.Video2')}
		                    error=''
	                    />
	                    {
	                    	data?.video2 && data.video2.length > 0 &&
	                    	<div className="mx-auto w-full mt-2">
			                    <iframe
			                        class='video'                       
			                        src={videoFormat(data.video2)}
			                        frameBorder="0"
			                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			                        allowFullScreen                        
			                    />
			                </div>
	                    }
		            </div>
	            }

	            {
	            	!filter &&
	            	<>
	            	<h1 id='internal-info-title'>{t('animals.record.Internal-Info')}</h1>
	            	<div className='mt-2'>
		                <Switch
		                    name="castrated"	                    
		                    checked={data?.castrated}
		                    onChange={handleInput}
		                    label={t('animals.record.castrated')}
	                    />
		            </div>
	            	<div className='mt-2'>
		            	<InputRichText
		            		name='vaccines'
		            		value={data?.vaccines}
		            		placeholder={t('animals.record.vaccines')}
		            		onChange={(content) => handleInputRichText('vaccines',content)}
		            	/>		                
		            </div>
		            <div className='mt-2'>
		            	<InputRichText
		            		name='treatment'
		            		value={data?.treatment}
		            		placeholder={t('animals.record.treatment')}
		            		onChange={(content) => handleInputRichText('treatment',content)}
		            	/>		                
		            </div>
		            <div className='mt-2'>
		                <Input	                    
		                    name="date_entry"
		                    type="date"
		                    value={data?.date_entry}                        
		                    autoComplete="date_entry"                        
		                    onChange={handleInput}                        
		                    placeholder={t('animals.record.date_entry')}                        
		                    error=''		                    
	                    />
		            </div>
		            <div className='mt-2'>
		                <Input	                    
		                    name="date_exit"
		                    type="date"
		                    value={data?.date_exit}                        
		                    autoComplete="date_exit"                        
		                    onChange={handleInput}                        
		                    placeholder={t('animals.record.date_exit')}                        
		                    error=''		                    
	                    />
		            </div>
		            <div className='mt-2'>
		                <Input	                    
		                    name="date_entry2"
		                    type="date"
		                    value={data?.date_entry2}                        
		                    autoComplete="date_entry2"                        
		                    onChange={handleInput}                        
		                    placeholder={t('animals.record.date_entry2')}                        
		                    error=''		                    
	                    />
		            </div>
		            <div className='mt-2'>
		                <Input	                    
		                    name="date_exit2"
		                    type="date"
		                    value={data?.date_exit2}                        
		                    autoComplete="date_exit2"                        
		                    onChange={handleInput}                        
		                    placeholder={t('animals.record.date_exit2')}                        
		                    error=''		                    
	                    />
		            </div>
	            	<div className='mt-2'>
		            	<InputRichText
		            		name='internal'
		            		value={data?.internal}
		            		placeholder={t('animals.record.internal')}
		            		onChange={(content) => handleInputRichText('internal',content)}
		            	/>		                
		            </div>		        
	            	</>
	            }

            </div>
            {/*
            <div className="flex justify-center mt-8">
            
                <div className='me-1'>
                    <button className='animal-link-edit'>
                        {submitButtonText}
                    </button>
                </div>

                <button className='cancel-button' onClick={handleCancel}>
                    {
                    	cancelButtonText && cancelButtonText.length > 0 ?
                    		cancelButtonText
                    	:
                    		t('trans.Close')
                    }
                </button>
            </div> 
			*/}
        </form>
	)
}