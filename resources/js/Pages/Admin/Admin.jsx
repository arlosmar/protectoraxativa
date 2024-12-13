import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Header from '@/Pages/Header/Header';

import { styleTabs } from '@/Utils/Styles';

import NewsIcon from '@mui/icons-material/Newspaper';
import AnimalIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//import Profile from '@/Pages/Admin/Profile';
import NewsList from '@/Pages/News/List';
import Animals from '@/Pages/Admin/Animals';
import PeopleList from '@/Pages/People/List';
import Notifications from '@/Pages/Admin/Notifications';
import Account from '@/Pages/Account/Account';
import Settings from '@/Pages/Settings/Settings';

import Toast from '@/Components/Toast';

import { formatPeople, formatNews, formatPeopleOptions, formatNotificationsUsers } from "@/Utils/Format";

import Sticky from '@/Components/Sticky';

import { applyDarkMode } from "@/Utils/Cookies";

//import { useSwipeable } from 'react-swipeable';

export default function Admin({auth,user,section,subsection,status,msg,baseUrl,
    imagesPaths,page,csrf_token,users,notifications,emails,social,isApp,appNotificationsEnabled}){

    const { t } = useTranslation('global');

    // when logged in, if the user has in its preferences the darkmode, apply it
    const darkmode = applyDarkMode(user);

    const [ userSettings, setUserSettings ] = useState(user && user?.settings ? JSON.parse(user.settings) : null);

    const [ usersFormattedOriginal, setUsersFormattedOriginal ] = useState(formatNotificationsUsers(t,users));

    // to indicate internal operations: edit, delete, add
    const [ internal, setInternal ] = useState(false);

    const [ animals, setAnimals ] = useState(null);
    const [ options, setOptions ] = useState(null);
    const [ people, setPeople ] = useState(null);
    const [ news, setNews ] = useState(null);

    const [ tab, setTab ] = useState(section ? section : "news");
    const [ subtab, setSubtab ] = useState(subsection ? subsection : "");

    // we use this because if not, when opening directly a page, if we change tab
    // it keeps on that page
    const [ pageInitial, setPageInitial ] = useState(page);

    const [ loading, setLoading ] = useState(false);

    const { stickyRef, sticky, offset, height, isApplicationOrWebApp } = Sticky();

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);
        setSubtab('');

        setInternal(false);

        // reset page in case it came by url
        setPageInitial(1);

        if(sticky){            
            window.scrollTo({top: offset});
        }

        // change url on the browser
        var url = route('admin',newValue);
        window.history.pushState({path:url},'',url);
    };

    const { sxTabs, sx, sxIcon } = styleTabs();

    const [ openToast, setOpenToast ] = useState(msg && msg.length > 0 ? true : false);
    const [ toastMsg, setToastMsg ] = useState(msg && msg.length > 0 ? t(msg) : '');
    const [ toastErrorMsg, setToastErrorMsg ] = useState('');

    useEffect(() => {

        setLoading(true);

        if(tab === 'people'){
            
            //setPeople([]);
            //setOptions([]);

            axios.get(route('people.get'))
            .then(function (response){            
                
                if(response.data.result){
                    
                    // success
                    var result = JSON.parse(response.data.people);                    

                    // format people
                    var resultFormatted = formatPeople(t,result);
                    
                    setPeople(resultFormatted);

                    // format options
                    var resultOptions = JSON.parse(response.data.options);
                    var optionsFormatted = formatPeopleOptions(resultOptions);
                    setOptions(optionsFormatted);
                    
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
        else{
            if(tab === 'news'){
            
                //setNews([]);
                //setOptions([]);

                axios.get(route('news.user.get'))
                .then(function (response){            
                    
                    if(response.data.result){
                        
                        // success
                        var result = JSON.parse(response.data.news);                    

                        // format people
                        var resultFormatted = formatNews(t,result);
                        
                        setNews(resultFormatted);
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
                    setOpenToast(true);
                }); 
            }
            else{

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
                   
                }
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
            {/*
            <h1 className="title">
                {t('user.title')}
            </h1>            
            */}
            {
                isApp ?    
                    <h1 className='title'>
                        APP
                    </h1>
                :
                    ''
            }
            <div className='tabs-container' style={{marginTop: sticky ? height+'px': '0px'}}>
                <Tabs 
                    id="tabs"
                    ref={stickyRef} 
                    sx={sxTabs}
                    className={`${sticky ? 'sticky-item' : ''}`}
                    value={tab} 
                    onChange={handleTabChange}
                    variant="scrollable"
                >
                    {/*<Tab icon={<AccountIcon/>} label={t('user.profile.icon')} value="profile"/>*/}
                    <Tab icon={<NewsIcon sx={sxIcon}/>} label={t('user.news.icon')} value="news" sx={sx}/>
                    <Tab icon={<AnimalIcon sx={sxIcon}/>} label={t('user.animals.icon')} value="animals" sx={sx}/>
                    <Tab icon={<PersonIcon sx={sxIcon}/>} label={t('user.people.icon')} value="people" sx={sx}/>   
                    <Tab icon={<NotificationsIcon sx={sxIcon}/>} label={t('user.notifications.icon')} value="notifications" sx={sx}/>   
                    <Tab icon={<SettingsIcon sx={sxIcon}/>} label={t('user.profile.settings.icon')} iconPosition="top" value="settings" sx={sx}/>
                    <Tab icon={<AccountIcon sx={sxIcon}/>} label={t('user.profile.icon')} iconPosition="top" value="account" sx={sx}/>                 
                </Tabs>
                <div className='content-container'>
                {
                    tab === 'animals' ?
                        <Animals
                            origin='user-animals'                            
                            t={t}                            
                            animals={animals}
                            setAnimals={setAnimals}
                            options={options}
                            imagesPaths={imagesPaths}
                            loading={loading}
                            page={pageInitial}   
                            setPage={setPageInitial}                         
                            subsection={subsection}
                            setOptions={setOptions}
                            setLoading={setLoading}
                            setToastMsg={setToastMsg}
                            setToastErrorMsg={setToastErrorMsg}
                            setOpenToast={setOpenToast}
                            internal={internal}
                            setInternal={setInternal}
                            baseUrl={baseUrl}
                        />                        
                    :
                        tab === 'people' ?
                            <PeopleList 
                                origin='user-people'                                
                                t={t}                                
                                people={people}   
                                setPeople={setPeople}
                                imagesPaths={imagesPaths}                                
                                loading={loading}                             
                                page={pageInitial}
                                internal={internal}
                                setInternal={setInternal}
                                baseUrl={baseUrl}
                                options={options}
                            />
                        :
                            tab === 'notifications' ?
                                <Notifications
                                    t={t}     
                                    user={user}     
                                    usersFormattedOriginal={usersFormattedOriginal}
                                    notifications={notifications}                                    
                                />
                            :
                                tab === 'settings' ?
                                    <Settings
                                        t={t}     
                                        user={user}
                                        userSettings={userSettings}  
                                        setUserSettings={setUserSettings}   
                                        notifications={notifications}    
                                        isApp={isApp}  
                                        appNotificationsEnabled={appNotificationsEnabled}                                  
                                    />
                                :
                                    tab === 'account' ?
                                        <Account
                                            user={user}                                
                                            status={status}
                                            t={t}
                                            subsection={subtab}
                                            emails={emails}
                                            social={social}                                             
                                        />
                                    :
                                        <NewsList
                                            origin='user-news'                                
                                            t={t}
                                            news={news}
                                            setNews={setNews}
                                            imagesPaths={imagesPaths} 
                                            loading={loading}                             
                                            page={pageInitial}
                                            internal={internal}
                                            setInternal={setInternal}
                                            baseUrl={baseUrl}
                                            options={options}
                                            csrf_token={csrf_token}
                                        />
                }
                </div>
            </div>          
        </main>
        </>
    )
}