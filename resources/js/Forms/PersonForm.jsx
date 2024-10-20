import Input from '@/Components/Input';

export default function PersonForm({t,data,setData,edit,filter,handleSubmit}){

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleSubmit(event);
		}
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
			                    handleKeyDown={filter ? handleKeyDown : ''}		                    
		                    />
			            </div>
			    	))
                }
                {
	            	!filter &&
		            <div className=''>
		                <Input
		                    id="description"
		                    name="description"
		                    type="text"
		                    multiline
		                    rows={5}
		                    value={data?.description}                        
		                    autoComplete="description"                        
		                    onChange={handleInput}                        
		                    placeholder={t('people.record.description')}                        
		                    error=''
	                    />
		            </div>
		        }
            </div>

        </form>
	)
}