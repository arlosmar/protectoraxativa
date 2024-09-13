import { useState } from 'react';
import Input from '@/Components/Input';
import InputSelect from '@/Components/InputSelect';
import Box from '@mui/material/Box';
import { useMemo } from 'react';

export default function GroupsSearch({ t, setOpenSearch, groups, setGroupsFiltered, tags, resetFields, data, setData }) {

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    const [ tagValue, setTagValue ] = useState();
    const [ tagInputValue, setTagInputValue ] = useState('');

    const handleTag = (event,newValue) => {        
        setTagValue(newValue);

        if(newValue?.id){
        	setData('tag_id',newValue.id);
        }
        else{
        	setData('tag_id',null);
        }
    }

    const handleTagInput = (event,newValue) => {     
        setTagInputValue(newValue);
    }

    const [ tagsOptions, setTagsOptions ] = useState([]);

    useMemo(() => {
        var tagsFormatted = [];
        tags && tags.length > 0 && 
        tags.map((tag,index) => {
            tagsFormatted.push({'label':t('tags.names.'+tag.name), 'id':tag.id});
        });
        setTagsOptions(tagsFormatted);
    }, []);

	const handleSearch = (e) => {

        e.preventDefault();

        var groupsFilter = groups;

        if(
        	(data.name && data.name.length > 0) ||
        	(data.description && data.description.length > 0) ||
        	(data.tag_id)
        ){

	        groupsFilter = groups.filter((group) => {
				
				if(data.name && data.name.length > 0 && !group.name.toLowerCase().includes(data.name.toLowerCase())){
					return false;
				}

				if(data.description && data.description.length > 0 && !group.description.toLowerCase().includes(data.description.toLowerCase())){
					return false;
				}

				if(data.tag_id && parseInt(group.tag_id) !== parseInt(data.tag_id)){
					return false;
				}

				return true;

			});
		}

        setGroupsFiltered(groupsFilter);
    };

    const handleReset = (e) => {
    	resetFields();
    	setGroupsFiltered(groups);
    	setOpenSearch(false);
    }

	return (		
		<Box sx={{borderRadius: 1, boxShadow: 5, marginBottom: 2, padding: 1, bgcolor: '#F8F8F8'}}>
            
            <form onSubmit={handleSearch}>

                <div className="mt-4">
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={data.name}                        
                        autoComplete="name"                        
                        onChange={handleInput}                        
                        placeholder={t('group.edit.name')}                        
                        error=''                        
                    />                    
                </div>

                <div className="mt-4">
                    <Input
                        id="description"
                        name="description"
                        type="text"
                        value={data.description}                        
                        autoComplete="description"                        
                        onChange={handleInput}                        
                        placeholder={t('group.edit.description')}                        
                        error=''                   
                    />
                </div>

                <div className="mt-4">                    

                    <InputSelect
                        id="tag_id"
                        name="tag_id"
                        value={tagValue}
                        inputValue={tagInputValue}
                        onInputChange={handleTagInput}
                        onChange={handleTag}
                        disablePortal                        
                        options={tagsOptions}
                        placeholder={t('group.edit.tag')}
                        error=''
                        autoComplete                        
                    />

                </div>

                <div className="flex justify-center mt-4">
                    
                    <div className='me-1'>
                    	<button className='login-button'>
                        	{t('trans.Search')}
                    	</button>
                	</div>

                	<button className='cancel-button' onClick={handleReset}>
                        {t('trans.Reset')}
                    </button>
                </div>
            </form>
                
        </Box>
    )
}