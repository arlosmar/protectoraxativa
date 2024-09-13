import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';
import Header from '@/Pages/Header/Header';

import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import AccountIcon from '@mui/icons-material/AccountCircle';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Profile from '@/Pages/Profile/Partials/Profile';
import GroupsList from '@/Pages/Groups/GroupsList';
import EventsList from '@/Pages/Events/EventsList';

import Toast from '@/Components/Toast';

export default function User({auth,user,section,subsection,groups,events,status,msg}){

    const { t } = useTranslation('global');

    const [ expanded, setExpanded ] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [ tab, setTab ] = useState(section ? section : "groups");

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);

        // change url on the browser
        var url = route("user")+'/'+newValue;
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

    const [ open, setOpen ] = useState(msg ? true : false);

    return (
        <>
        <Toast 
            open={open}
            setOpen={setOpen}
            message={t(msg)}
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
                    centered
                    className={classes.tabs}
                >
                    <Tab icon={<GroupIcon/>} label={t('user.sections.groups')} value="groups"/>
                    <Tab icon={<EventIcon/>} label={t('user.sections.events')} value="events"/>
                    <Tab icon={<AccountIcon/>} label={t('user.sections.profile')} value="profile"/>
                </Tabs>
                <div className='mt-4 pt-4'>
                {
                    tab === 'groups' ?
                        <>
                        {
                            user &&
                            <div className='mt-2 mb-4 text-center'>
                                <a
                                    href={route('group.create')}                        
                                    className='group-link'
                                >
                                    {t('groups.Create')}
                                </a>
                            </div>
                        }
                        <GroupsList 
                            t={t}
                            groups={groups}
                            user={user}    
                            from=''                        
                        />
                        </>
                    :
                        tab === 'events' ?
                            <>
                            {
                                user &&
                                <div className='mt-2 mb-4 text-center'>
                                    <a
                                        href={route('event.create')}                        
                                        className='event-link'
                                    >
                                        {t('events.Create')}
                                    </a>
                                </div>
                            }
                            <EventsList 
                                t={t}
                                events={events}
                                user={user}     
                                from=''                           
                            />
                            </>
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