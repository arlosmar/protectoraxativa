import { useState, useEffect } from 'react';

//import AnimalsList from '@/Pages/Animals/ListTable';
import AnimalsList from '@/Pages/Animals/List';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import AnimalsIcon from '@mui/icons-material/Pets';
import AdoptedIcon from '@mui/icons-material/InsertEmoticon';
import HeavenIcon from '@mui/icons-material/Star';
import HiddenIcon from '@mui/icons-material/VisibilityOff';

import { styleSubTabs } from '@/Utils/Styles';

import { formatAnimals } from "@/Utils/Format";

export default function Animals({origin,t,animals,options,baseUrl,imagesPaths,
    loading,page,setPage,subsection,setSubsection,
	setAnimals,setOptions,setLoading,setToastMsg,setToastErrorMsg,setOpenToast,internal,setInternal}){

    const [ tab, setTab ] = useState(subsection ? subsection : "adopt");

    const { sxSubTabs, sx, sxIcon } = styleSubTabs();

    const handleChange = (event,newValue) => {
    	
    	setTab(newValue);

        setInternal(false);

        // reset page in case it came by url
        setPage(1);

    	// change url on the browser
        var url = route("admin.animals")+'/'+newValue;
        window.history.pushState({path:url},'',url);
    };

    useEffect(() => {

        setLoading(true);

        //setAnimals([]);
        //setOptions([]);

        var path = '';

        switch(tab){

        	case 'adopted':
        		path = '?section=adopt&subsection=adopted'
        		break;

        	case 'heaven':
        		path = '?section=heaven'
        		break;

            case 'hidden':
                path = '?section=hidden'
                break;

        	case 'adopt':        	
        		path = '?section=adopt&subsection=animals'
        		break;
        }

        axios.get(route('animals.get')+path)
        .then(function (response){
            
            if(response.data.result){
                
                // success
                var result = JSON.parse(response.data.animals);

                // format animals
                var resultFormatted = formatAnimals(t,result);
                
                setAnimals(resultFormatted);                    
                setOptions(JSON.parse(response.data.options));
                setLoading(false);
            }
            else{
                // error      
                setLoading(false); 
                setToastMsg('');
                setToastErrorMsg(response.data.error);
                setOpenToast(true);             
            }                
        })
        .catch(function (error){
            setLoading(false);
            setToastMsg('');
            setToastErrorMsg('Error');
            setOpenToast(true);
        });       
    },[tab])

    return (
        <>
        {/*
        <h1 className='title-home'>
            {t('user.animals.title')}
        </h1>
        */}
        <div className='subtabs-container'>
            <Tabs 
                value={tab} 
                sx={sxSubTabs}
                onChange={handleChange}                                 
                variant="scrollable"
            >
                <Tab icon={<AnimalsIcon sx={sxIcon}/>} value="adopt" sx={sx} iconPosition="top" label={t('user.animals.adopt.icon')}/>                
                <Tab icon={<AdoptedIcon sx={sxIcon}/>} value="adopted" sx={sx} iconPosition="top" label={t('user.animals.adopted.icon')}/>
                <Tab icon={<HeavenIcon sx={sxIcon}/>} value="heaven" sx={sx} iconPosition="top" label={t('user.animals.heaven.icon')}/>
                <Tab icon={<HiddenIcon sx={sxIcon}/>} value="hidden" sx={sx} iconPosition="top" label={t('user.animals.hidden.icon')}/>
            </Tabs>
            <div className='subcontent-container'>
	            <AnimalsList
	                origin={origin}
	                t={t}
	                animals={animals}
	                options={options}
	                imagesPaths={imagesPaths}
	                loading={loading}
	                page={page}
	                subsection={tab}
                    setAnimals={setAnimals}
                    internal={internal}
                    setInternal={setInternal}
                    baseUrl={baseUrl}
	            />
            </div>
        </div>
        </>
    )
}
