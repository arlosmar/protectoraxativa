import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Header from '@/Pages/Header/Header';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import MicNoneIcon from '@mui/icons-material/MicNone';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

import Input from '@/Components/Input';
import InputSelect from '@/Components/InputSelect';
import InputDate from '@/Components/InputDate';
import InputTime from '@/Components/InputTime';

import InputLabel from '@/Components/InputLabel';

import { useMemo } from 'react';

import Toast from '@/Components/Toast';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { 
    dateRemoveHour, 
    dateGetHour, 
    now, 
    getDatesFromDatepicker, 
    dateToDatePicker, 
    timeToTimePicker, 
    getTimesFromTimepicker 
} from "@/Utils/Format";

export default function EventEdit({user,event,tags,types,from}){

	const { t } = useTranslation('global');

    const [ fromString, setFromString ] = useState('');

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        id: event ? event.id : null,
        name: event ? event.name : null,
        description: event ? event.description : null,
        location: event ? event.location : null,
        date: event ? dateRemoveHour(event.date) : null,
        time: event ? dateGetHour(event.date) : null,
        tag_id: event ? event.tag_id : null,
        type_id: event ? event.type_id : null,
        link: event ? event.link : null,
        from: from
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('event.edit.save')+fromString);
    };

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    const [ tagValue, setTagValue ] = useState(event ? {'label':t('tags.names.'+event.tag.name), 'id':event.tag.id} : '');
    const [ typeValue, setTypeValue ] = useState(event ? event.type_id : 1);
    const [ tagInputValue, setTagInputValue ] = useState('');

    const handleTag = (e,newValue) => {        
        setTagValue(newValue);
        
        if(newValue?.id){
            setData('tag_id',newValue.id);
        }
        else{
            setData('tag_id',null);
        }
    }

    const handleType = (e) => {
        setTypeValue(e.target.value);
        setData('type_id',e.target.value);
    }

    // what you type
    const handleTagInput = (e,newValue) => {        
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

    const [ date, setDate] = useState(event ? dateToDatePicker(data.date) : null);
    const [ time, setTime ] = useState(event ? timeToTimePicker(data.time) : null);

    const handleDate = (value) => {        

        const values = getDatesFromDatepicker(value);
        setDate(values[0]);
        setData('date',values[1]);
    }

    const handleTime = (value) => {        

        const values = getTimesFromTimepicker(value);
        setTime(values[0]);
        setData('time',values[1]);
    }

    const [ open, setOpen ] = useState(recentlySuccessful);

    return (
    	<>
        <Toast 
            open={open}
            setOpen={setOpen}
            message={t('trans.Saved-Male')}
        />    	
        <Header user={user} t={t} from={from === 'user.events' ? 'user' : 'events'}/>
    	<main>
            
            <h1 className="title">
                {t('event.edit.title')}
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
                        placeholder={t('event.edit.name')}                        
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
                        placeholder={t('event.edit.description')}                        
                        error={errors.description}   
                        multiline
                        rows={4}                     
                    />
                </div>

                <div className="mt-4">
                    <Input
                        id="location"
                        name="location"
                        type="text"
                        value={data.name}                        
                        autoComplete="location"                        
                        onChange={handleInput}                        
                        placeholder={t('event.edit.location')}                        
                        error={errors.location}                        
                    />                    
                </div>

                <div className="mt-4">
                    <InputDate
                        value={date}
                        onChange={handleDate}                            
                        placeholder={t('event.edit.date')}
                        error={errors.date}
                    />
                </div>

                <div className="mt-4">                                        
                    <InputTime                         
                        value={time}
                        onChange={handleTime} 
                        ampm={false}    
                        placeholder={t('event.edit.time')}   
                        error={errors.time}
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
                        placeholder={t('event.edit.tag')}
                        error={errors.tag_id}
                        autoComplete                        
                    />
                 
                </div>

                <div className="mt-4">
                    
                    <InputLabel className='login-label' htmlFor="type_id" value={t('event.edit.type')}/>

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
                        placeholder={t('event.edit.link')}                        
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