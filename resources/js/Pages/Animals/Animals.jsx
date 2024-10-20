import Header from '@/Pages/Header/Header';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { makeStyles } from '@mui/styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AdoptIcon from '@mui/icons-material/Home';
import SponsorIcon from '@mui/icons-material/Savings';
import HeavenIcon from '@mui/icons-material/Star';

import Adopt from '@/Pages/Animals/Adopt';
import Sponsor from '@/Pages/Animals/Sponsor';
import Heaven from '@/Pages/Animals/Heaven';

import Toast from '@/Components/Toast';

import { formatAnimals } from "@/Utils/Format";

export default function Animals({user,section,subsection,emails,social,apus,images_path,page,forms,prices}){

    const { t } = useTranslation('global');
    const [ animals, setAnimals ] = useState([]);
    const [ options, setOptions ] = useState(null);

    const [ tab, setTab ] = useState(section ? section : "adopt");
    const [ subtab, setSubtab ] = useState(subsection ? subsection : "");

    const [ loading, setLoading ] = useState(false);

    const [ toastMsg, setToastMsg ] = useState('');
    const [ openToast, setOpenToast ] = useState(false);

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);
        setSubtab('');

        // change url on the browser
        var url = route("animals")+'/'+newValue;
        window.history.pushState({path:url},'',url);
    };

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

    useEffect(() => {

        setLoading(true);
        setAnimals([]);
            
        // call by ajax to get animals
        if(
            subtab &&
            subtab.length > 0 &&
            subtab !== 'info' &&
            subtab !== 'apu'
        ){            
            // axios.get to select
            // axios.post to insert
            // axios.put to update
            // adios.delete to delete
            axios.get(route('animals.get')+'?section='+tab+'&subsection='+subtab)
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
                    setToastMsg(response.data.error);
                    setOpenToast(true);
                }                
            })
            .catch(function (error){
                setLoading(false);
                setToastMsg(error);
                setOpenToast(true);
            });     

            // another way without axios
            //put(route('language.update'));
            
            // another way with fetch
            /*
            fetch(route('language.update'), {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: 'a'
                })
            })
            .then(function (response) {
                
            })
            .catch(function (error) {
                
            });
            */  
        }
    },[subtab])

    return (    	
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={toastMsg}
        />
    	<Header user={user} t={t} from='animals'/>
    	<main>
            <h1 className="title">
    			{t('animals.title')}
    		</h1>
            <div className='mt-4'>
                <Tabs 					
                    value={tab} 
                    onChange={handleTabChange}                     
                    className={classes.tabs}
                    centered
                >					
                    <Tab icon={<AdoptIcon/>} value="adopt" sx={sx} iconPosition="top" label={t('animals.adopt.icon')}/>
					<Tab icon={<SponsorIcon/>} value="sponsor" sx={sx} iconPosition="top" label={t('animals.sponsor.icon')}/>
                    <Tab icon={<HeavenIcon/>} value="heaven" sx={sx} iconPosition="top" label={t('animals.heaven.icon')}/>
                </Tabs>
                <div className='mt-4 pt-4'>
                {				
                    tab === 'adopt' ?
                        <Adopt
                            subsection={subtab}
                            setSubsection={setSubtab}
                            t={t}
                            email_adoptions={emails?.email_adoptions}
                            social={social}                            
                            images_path={images_path}
                            animals={animals}
                            page={page}
                            loading={loading}
                            options={options}
                            forms={forms}
                        />
                    :
                        tab === 'sponsor' ?
                            <Sponsor
                                subsection={subtab}
                                setSubsection={setSubtab}
                                t={t}
                                apus={apus}                                
                                images_path={images_path}
                                animals={animals}
                                page={page}
                                loading={loading}
                                options={options}
                                email_colaboration={emails?.email_colaboration}
                                forms={forms}
                                prices={prices}
                            />
                        :
                            tab === 'heaven' ?
                                <Heaven    
                                    subsection={subtab}  
                                    setSubsection={setSubtab}                              
                                    t={t}
                                    images_path={images_path}
                                    email_info={emails?.email_info}
                                    animals={animals}
                                    page={page}
                                    loading={loading}
                                    options={options}
                                />
                            :
                                ''
                }
                </div>
            </div>
        </main>
        </>
    )
}