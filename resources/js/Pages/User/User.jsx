import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';
import Header from '@/Pages/Header/Header';

import AccountIcon from '@mui/icons-material/Info';
import AnimalIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Profile from '@/Pages/User/Profile';
import Animals from '@/Pages/User/Animals';
import PeopleList from '@/Pages/People/List';

import Toast from '@/Components/Toast';

import { formatPeople } from "@/Utils/Format";

export default function User({auth,user,section,subsection,status,msg,images_path,page}){

    const { t } = useTranslation('global');

    const [ animals, setAnimals ] = useState(null);
    const [ options, setOptions ] = useState(null);
    const [ people, setPeople ] = useState(null);

    const [ tab, setTab ] = useState(section ? section : "profile");
    const [ subtab, setSubtab ] = useState(subsection ? subsection : "");

    const [ loading, setLoading ] = useState(false);

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);
        setSubtab('');

        // change url on the browser
        var url = route("user",newValue);
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

    const [ openToast, setOpenToast ] = useState(msg && msg.length > 0 ? true : false);
    const [ toastMsg, setToastMsg ] = useState(msg && msg.length > 0 ? t(msg) : '');
    const [ toastErrorMsg, setToastErrorMsg ] = useState('');

    useEffect(() => {

        setLoading(true);

        if(tab === 'animals'){
            /*
            setAnimals([]);

            axios.get(route('animals.get')+'?section=all')
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
            }); 
            */
        }
        else{
            if(tab === 'people'){
                
                setPeople([]);

                axios.get(route('people.get'))
                .then(function (response){            
                    
                    if(response.data.result){
                        
                        // success
                        var result = JSON.parse(response.data.people);                    

                        // format people
                        var resultFormatted = formatPeople(t,result);
                        
                        setPeople(resultFormatted);
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
                    setOpenToast(true);
                }); 
            }
        }        
    },[tab])

    return (
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={toastMsg}
            error={toastErrorMsg}
        />
        <Header user={user} t={t} from='user'/>
        <main>
            <h1 className="title">
                {t('user.title')}
            </h1>            
            <div>
                <Tabs 
                    value={tab} 
                    onChange={handleTabChange}                     
                    className={classes.tabs}
                    centered
                >
                    <Tab icon={<AccountIcon/>} label={t('user.profile.icon')} value="profile"/>
                    <Tab icon={<AnimalIcon/>} label={t('user.animals.icon')} value="animals"/>
                    <Tab icon={<PersonIcon/>} label={t('user.people.icon')} value="people"/>                    
                </Tabs>
                <div className='mt-4 pt-4'>
                {
                    tab === 'animals' ?
                        <Animals
                            origin='user-animals'                            
                            t={t}
                            animals={animals}
                            options={options}
                            images_path={images_path}
                            loading={loading}
                            page={page}                            
                            subsection={subsection}                            
                            setAnimals={setAnimals}
                            setOptions={setOptions}
                            setLoading={setLoading}
                            setToastMsg={setToastMsg}
                            setToastErrorMsg={setToastErrorMsg}
                            setOpenToast={setOpenToast}
                        />                        
                    :
                        tab === 'people' ?
                            <PeopleList 
                                origin='user-people'                                
                                t={t}
                                people={people}   
                                images_path={images_path}
                                loading={loading}                             
                                page={page}
                            />
                        :
                            <Profile
                                user={user}                                
                                status={status}
                                t={t}
                                subsection={subsection}
                            />           
                }
                </div>
            </div>          
        </main>
        </>
    )
}