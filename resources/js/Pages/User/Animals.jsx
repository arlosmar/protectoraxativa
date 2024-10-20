import { useState, useEffect } from 'react';

import AnimalsList from '@/Pages/Animals/List';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import AnimalsIcon from '@mui/icons-material/Pets';
import AdoptedIcon from '@mui/icons-material/InsertEmoticon';
import HeavenIcon from '@mui/icons-material/Star';

import { makeStyles } from '@mui/styles';

import { formatAnimals } from "@/Utils/Format";

export default function Animals({origin,t,animals,options,images_path,loading,page,subsection,setSubsection,
	setAnimals,setOptions,setLoading,setToastMsg,setToastErrorMsg,setOpenToast}){

    const [ tab, setTab ] = useState(subsection ? subsection : "adopt");

    const handleChange = (event,newValue) => {
    	
    	setTab(newValue);

    	// change url on the browser
        var url = route("user.animals")+'/'+newValue;
        window.history.pushState({path:url},'',url);
    };

    useEffect(() => {

        setLoading(true);

        setAnimals([]);

        var path = '';

        switch(tab){

        	case 'adopted':
        		path = '?section=adopt&subsection=adopted'
        		break;

        	case 'heaven':
        		path = '?section=heaven'
        		break;

        	case 'adopt':
        	default:
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
            setToastErrorMsg(error);
        });       
    },[tab])

    const useStyles = makeStyles({

        tabs: {
            "& .MuiTabs-indicator": {
                backgroundColor: "#FF8C00",
                height: 3,
            },
            "& .MuiTab-root.Mui-selected": {
                color: '#FF8C00'
            }
        }
    });

    const classes = useStyles();

    const sx = {};

    return (
        <>
        <h1 className='title-home'>
            {t('user.animals.title')}
        </h1>
        <div className='mt-4'>
            <Tabs 
                value={tab} 
                onChange={handleChange}                 
                className={classes.tabs}
                centered
            >
                <Tab icon={<AnimalsIcon/>} value="adopt" sx={sx} iconPosition="top" label={t('user.animals.adopt.icon')}/>                
                <Tab icon={<AdoptedIcon/>} value="adopted" sx={sx} iconPosition="top" label={t('user.animals.adopted.icon')}/>
                <Tab icon={<HeavenIcon/>} value="heaven" sx={sx} iconPosition="top" label={t('user.animals.heaven.icon')}/>
            </Tabs>
            <div className='mt-4 pt-4'>
	            <AnimalsList
	                origin={origin}
	                t={t}
	                animals={animals}
	                options={options}
	                images_path={images_path}
	                loading={loading}
	                page={page}
	                subsection={tab}
	            />
            </div>
        </div>
        </>
    )
}
