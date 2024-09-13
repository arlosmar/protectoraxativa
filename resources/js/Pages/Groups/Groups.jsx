import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';
import Header from '@/Pages/Header/Header';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import GroupsList from '@/Pages/Groups/GroupsList';
import GroupsSearch from '@/Pages/Groups/GroupsSearch';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import MicNoneIcon from '@mui/icons-material/MicNone';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

import Toast from '@/Components/Toast';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

export default function Groups({user,groups,msg,tags,type}){

	const { t } = useTranslation('global');

    const [ groupsFiltered, setGroupsFiltered ] = useState(groups);
    const [ groupsSearch, setGroupsSearch ] = useState(groups);

    const [ tab, setTab ] = useState(type ? type : "all");

    const { data, setData } = useForm({        
        name: null,
        description: null,
        tag_id: null
    });

    const resetFields = (e) => {
        setData({...data, 'name' : '', 'description' : '', tag_id: ''});
    }

    const filterGroups = (type) => {

        var groupsFilter = [];

        if(type === 'all'){
            groupsFilter = groups;
        }
        else{            
            groupsFilter = groups.filter(item => item.type.name === type);
        }

        setGroupsFiltered(groupsFilter);
        setGroupsSearch(groupsFilter);
        resetFields();   
    }

    const handleTabChange = (event, newValue) => {
        
        setTab(newValue);
        filterGroups(newValue);
        setOpenSearch(false);

        // change url on the browser
        var url = route("groups")+'/'+newValue;
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

    const [ fromString, setFromString ] = useState('?from=groups');

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
    	<Header user={user} t={t} from='groups'/>
    	<main>
            <h1 className="title">
                {t('groups.title')}
            </h1>
            {
                (user || !openSearch) &&
                <div className='flex justify-center mt-2 mb-4 text-center'>
                    {
                        user &&
                        <div className='me-1'>
                            <a
                                href={route('group.create')+fromString}                        
                                className='group-link'
                            >
                                {t('groups.Create')}
                            </a>
                        </div>
                    }
                    {
                        !openSearch &&
                        <div className=''>
                            <button 
                                onClick={handleSearch}                        
                                className='group-search'
                            >
                                {t('groups.Search')}
                            </button>
                        </div>   
                    }             
                </div> 
            }           
            <Collapse in={openSearch}>
                <GroupsSearch 
                    t={t}           
                    setOpenSearch={setOpenSearch}          
                    groups={groupsSearch}                    
                    setGroupsFiltered={setGroupsFiltered}
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
                        <Tab sx={sxTab} style={styleTab} icon={<WorkspacesIcon sx={sxIcon}/>} label={t('groups.types.all')} value="all"/>
                        <Tab sx={sxTab} style={styleTab} icon={<WhatsAppIcon sx={sxIcon}/>} label={t('groups.types.whatsapp')} value="Whatsapp"/>
                        <Tab sx={sxTab} style={styleTab} icon={<TelegramIcon sx={sxIcon}/>} label={t('groups.types.telegram')} value="Telegram"/>
                        <Tab sx={sxTab} style={styleTab} icon={<MicNoneIcon sx={sxIcon}/>} label={t('groups.types.discord')} value="Discord"/>
                    </Tabs>
                </Box>
                <div className='mt-4 pt-4'>
                    <GroupsList 
                        t={t}
                        user={user}
                        groups={groupsFiltered}
                        from={fromString}
                    />
                </div>
    		</div>			
    	</main>
    	</>
    )
}