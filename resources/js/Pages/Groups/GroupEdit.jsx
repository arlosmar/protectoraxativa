import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Header from '@/Pages/Header/Header';

import Input from '@/Components/Input';
import InputSelect from '@/Components/InputSelect';

import Toast from '@/Components/Toast';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import InputLabel from '@/Components/InputLabel';

import { useMemo } from 'react';

export default function GroupEdit({user,group,tags,types,from}){

	const { t } = useTranslation('global');

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        id: group ? group.id : null,
        name: group ? group.name : null,
        description: group ? group.description : null,
        tag_id: group ? group.tag_id : null,
        type_id: group ? group.type_id : null,
        link: group ? group.link : null,
        from: from
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('group.edit.save'));
    };

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    const [ tagValue, setTagValue ] = useState(group ? {'label':t('tags.names.'+group.tag.name), 'id':group.tag.id} : '');
    const [ typeValue, setTypeValue ] = useState(group ? group.type_id : 1);
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

    const handleType = (event) => {
        setTypeValue(event.target.value);
        setData('type_id',event.target.value);
    }

    // what you type
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

    const [ open, setOpen ] = useState(recentlySuccessful);

    return (
    	<>
        <Toast 
            open={open}
            setOpen={setOpen}
            message={t('trans.Saved-Male')}
        />
    	<Header user={user} t={t} from={from === 'user.groups' ? 'user' : 'groups'}/>
    	<main>
            
            <h1 className="title">
                {t('group.edit.title')}
            </h1>
            
    		<form onSubmit={submit}>

                <div className="mt-4">
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={data.name}                        
                        autoComplete="name"                        
                        onChange={handleInput}                        
                        placeholder={t('group.edit.name')}                        
                        error={errors.name}                        
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
                        error={errors.description}   
                        multiline
                        rows={4}                     
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
                        error={errors.tag_id}
                        autoComplete                        
                    />

                </div>

                <div className="mt-4">
                    <InputLabel className='login-label' htmlFor="type_id" value={t('group.edit.type')}/>

                    <div className='ms-2'>
                        <FormControl>
                            <RadioGroup      
                                name="type_id"
                                value={typeValue}
                                onChange={handleType}
                            >
                                {
                                    types && types.length > 0 &&
                                    types.map((type,index) => (
                                        <FormControlLabel value={type.id} control={<Radio color="warning"/>} label={type.name}/>                        
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>

                <div className="mt-4">
                    <Input
                        id="link"
                        name="link"
                        type="text"
                        value={data.link}                        
                        autoComplete="link"                        
                        onChange={handleInput}                        
                        placeholder={t('group.edit.link')}                        
                        error={errors.link}                        
                    />
                </div>   

                <div className="flex justify-center mt-4">
                    
                    <div className='mx-1'>
                        <a className="back-button" href={route(from)}>
                            {t('trans.Back')}
                        </a>
                    </div>

                    <button className={`login-button ${processing && 'opacity-25'}`} disabled={processing}>
                        {t('trans.Save')}
                    </button>
                </div>         
            </form>
            			
    	</main>
    	</>
    )
}