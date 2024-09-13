import { useState } from 'react';

import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';

import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import AccountIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

//https://mui.com/material-ui/material-icons/

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

export default function BarBottom({t,from}){

    var highlighted = '';
    switch(from){

        case 'groups':
            highlighted = 'groups';
            break;

        case 'events':
            highlighted = 'events';
            break;

        case 'login':
        case 'user':
            highlighted = 'user';
            break;

        case 'contact':
            highlighted = 'contact';
            break;
    }

    const [value, setValue] = useState(highlighted);

    const clickIcon = (e, newValue) => {

        setValue(newValue);

        var link = 'home';

        //const id = e.currentTarget.id;
        const id = newValue;
        
        switch(id){

            case 'groups':
                link = 'groups';
                break;

            case 'events':
                link = 'events';
                break;

            case 'user':
                link = 'user';
                break;

            case 'contact':
                link = 'contact';
                break;
        }

        window.location.href = route(link) 
    }

    /*
    <Box sx={{ flexGrow: 1 }}/>
    <IconButton color="inherit">
        <SearchIcon />
    </IconButton>

    <IconButton color="inherit">
        <MoreIcon />
    </IconButton>
    */

    //left:'5%', top: 'auto', bottom: 0, maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto'
    //<Toolbar sx={{ justifyContent: 'center' }}>

    {/*
        <ThemeProvider theme={darkTheme}>
            
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            
                <Toolbar>

                    <Box sx={{ flexGrow: 1 }}/>
                                 
                    <IconButton color="inherit" onClick={clickIcon} id='groups' sx={{ flexDirection: 'column' }}>
                        <GroupIcon/>
                        <Typography variant="caption">{t('MenuBar.Groups')}</Typography>
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }}/>

                    <IconButton color="inherit" onClick={clickIcon} id='events' sx={{ flexDirection: 'column' }}>
                        <EventIcon/>
                        <Typography variant="caption">{t('MenuBar.Events')}</Typography>
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }}/>

                    <IconButton color="inherit" onClick={clickIcon} id='user' sx={{ flexDirection: 'column' }}>
                        <AccountIcon/>
                        <Typography variant="caption">{t('MenuBar.User')}</Typography>
                    </IconButton> 

                    <Box sx={{ flexGrow: 1 }}/>

                </Toolbar>
            
            </AppBar>
        </ThemeProvider>
    */}

    const sxSelected = {         
        "& .Mui-selected, .Mui-selected > svg": {
          color: "#FF8C00"
        }
    };

    const sxIcon = { 
        color: 'white'
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1  }} elevation={3}>

                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={clickIcon} 
                    sx={sxSelected}               
                >      
                    <Box sx={{ flexGrow: 1 }}/>

                    <BottomNavigationAction
                        label={t('MenuBar.Groups')}
                        icon={<GroupIcon/>}                    
                        value='groups'
                        sx={sxIcon}
                    />

                    <Box sx={{ flexGrow: 1 }}/>

                    <BottomNavigationAction
                        label={t('MenuBar.Events')}
                        icon={<EventIcon/>}                    
                        value='events'
                        sx={sxIcon}
                    />

                    <Box sx={{ flexGrow: 1 }}/>

                    <BottomNavigationAction
                        label={t('MenuBar.User')}
                        icon={<AccountIcon/>}                    
                        value='user'
                        sx={sxIcon}
                    />

                    <Box sx={{ flexGrow: 1 }}/>

                    <BottomNavigationAction
                        label={t('MenuBar.Contact')}
                        icon={<EmailIcon/>}                    
                        value='contact'
                        sx={sxIcon}
                    />

                    <Box sx={{ flexGrow: 1 }}/>

                </BottomNavigation>

            </Paper>
        </ThemeProvider>
    );
}
