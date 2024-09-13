import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';
import Header from '@/Pages/Header/Header';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import EventsList from '@/Pages/Events/EventsList';
import EventsSearch from '@/Pages/Events/EventsSearch';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import MicNoneIcon from '@mui/icons-material/MicNone';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

import Toast from '@/Components/Toast';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

export default function Events({user,events,msg,tags,type}){

    const { t } = useTranslation('global');

    const [ eventsFiltered, setEventsFiltered ] = useState(events);
    const [ eventsSearch, setEventsSearch ] = useState(events);

    const [ tab, setTab ] = useState(type ? type : "all");

    const { data, setData } = useForm({        
        name: null,
        description: null,
        tag_id: null,
        location: null
    });

    const resetFields = (e) => {
        setData({...data, 'name' : '', 'description' : '', 'tag_id': '', 'location' : ''});
    }

    const filterEvents = (type) => {

        var eventsFilter = [];

        if(type === 'all'){
            eventsFilter = events;
        }
        else{            
            eventsFilter = events.filter(item => item.type.name === type);
            
        }

        setEventsFiltered(eventsFilter);
        setEventsSearch(eventsFilter);
        resetFields();   
    }

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);
        filterEvents(newValue);
        setOpenSearch(false);

        // change url on the browser
        var url = route("events")+'/'+newValue;
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

    const [ fromString, setFromString ] = useState('?from=events');

    const [ open, setOpen ] = useState(msg ? true : false);

    const styleTab = {minWidth: 40};

    const sxIcon = {};

    const sxTab = {fontSize: '75%'};

    const [ openSearch, setOpenSearch ] = useState(false);
    
    const handleSearch = (e) => {
        setOpenSearch(!openSearch);
    };

    return (
        <>
        <Toast 
            open={open}
            setOpen={setOpen}
            message={t(msg)}
        />
        <Header user={user} t={t} from='events'/>
        <main>
            <h1 className="title">
                {t('events.title')}
            </h1>
            {
                (user || !openSearch) &&
                <div className='flex justify-center mt-2 mb-4 text-center'>
                    {
                        user &&
                        <div className='me-1'>
                            <a
                                href={route('event.create')+fromString}                        
                                className='event-link'
                            >
                                {t('events.Create')}
                            </a>
                        </div>
                    }
                    {
                        !openSearch &&
                        <div className=''>
                            <button 
                                onClick={handleSearch}                        
                                className='event-search'
                            >
                                {t('events.Search')}
                            </button>
                        </div>   
                    }             
                </div>       
            }     
            <Collapse in={openSearch}>
                <EventsSearch 
                    t={t}           
                    setOpenSearch={setOpenSearch}          
                    events={eventsSearch}                    
                    setEventsFiltered={setEventsFiltered}
                    tags={tags}
                    data={data}
                    setData={setData}
                    resetFields={resetFields}
                />
            </Collapse>               
            <div>
                <Box display="flex" justifyContent="center" width="100%">
                    <Tabs 
                        value={tab} 
                        onChange={handleTabChange} 
                        centered
                        className={classes.tabs}
                        variant='scrollable'
                        scrollButtons={true}
                    >                
                        <Tab sx={sxTab} style={styleTab} icon={<WorkspacesIcon sx={sxIcon}/>} label={t('events.types.all')} value="all"/>
                        <Tab sx={sxTab} style={styleTab} icon={<WhatsAppIcon sx={sxIcon}/>} label={t('events.types.whatsapp')} value="Whatsapp"/>
                        <Tab sx={sxTab} style={styleTab} icon={<TelegramIcon sx={sxIcon}/>} label={t('events.types.telegram')} value="Telegram"/>
                        <Tab sx={sxTab} style={styleTab} icon={<MicNoneIcon sx={sxIcon}/>} label={t('events.types.discord')} value="Discord"/>
                    </Tabs>
                </Box>
                <div className='mt-4 pt-4'>
                    <EventsList 
                        t={t}
                        user={user}
                        events={eventsFiltered}
                        from={fromString}
                    />
                </div>
            </div>          
        </main>
        </>
    )
}