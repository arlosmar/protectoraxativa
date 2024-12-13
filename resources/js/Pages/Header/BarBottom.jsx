import { useState } from 'react';

//import { Typography } from '@mui/material';
//import AppBar from '@mui/material/AppBar';
//import Toolbar from '@mui/material/Toolbar';
//import Button from "@mui/material/Button";
//import IconButton from '@mui/material/IconButton';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

//import Box from '@mui/material/Box';

import HomeIcon from '@mui/icons-material/Home';
import AnimalsIcon from '@mui/icons-material/Pets';
import NewsIcon from '@mui/icons-material/Newspaper';
import UserIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from "@/Components/Menu";

//import ContactIcon from '@mui/icons-material/Email';

//import { ThemeProvider, createTheme } from '@mui/material/styles';

//https://mui.com/material-ui/material-icons/

/*
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            //main: '#1976d2',             
        },
    },
});
*/

export default function BarBottom({user,t,from,changeLanguage,handleLogout,handleContact,handleWhatsapp}){

    const [ openMenu, setOpenMenu ] = useState(false);

    var highlighted = '';
    switch(from){

        case 'home':
            highlighted = 'home';
            break;

        case 'animals':
            highlighted = 'animals';
            break;

        case 'news':
            highlighted = 'news';
            break;

        case 'contact':
            highlighted = 'contact';
            break;

        case 'user':
            highlighted = 'user';
            break;

        case 'menu':
            highlighted = 'menu';
            break;
    }

    const [value, setValue] = useState(highlighted);    

    const clickIcon = (e, newValue) => {

        setValue(newValue);

        var link = '';

        //const id = e.currentTarget.id;
        const id = newValue;
        
        switch(id){

            case 'home':
                link = 'home';
                break;

            case 'animals':
                link = 'animals';
                break;

            case 'news':
                link = 'news';
                break;

            case 'contact':
                link = 'contact';
                break;

            case 'user':
                // we change this because if not the app does not get aware of auto log off from the web
                // and detects login url and goes to login activity
                //link = 'login';
                if(user){
                    if(user?.admin){
                        link = 'admin'
                    }
                    else{
                        link = 'intranet'
                    }
                }
                else{
                    link = 'login'
                }
                break;

            case 'menu':
                setOpenMenu(!openMenu);
                break;
        }

        if(link && link.length > 0){
            /*if(link === 'news'){            
                window.open('https://protectoraxativa.blogspot.com','_blank');
            }
            else{*/
                window.location.href = route(link);
            //}
        }
    }

    const sxNavigation = {         
        "& .Mui-selected, .Mui-selected > svg": {
          color: "#FF8C00"
        },
        backgroundColor: '#000000',
        // height: { xs: '80px', md: '56px' }
        "@media screen and (orientation: portrait)": {
            height: '60px'
        }
    };

    const sxNavigationAction = { 
        minWidth: '0',
        color: 'white',
        padding: '0px 8px'
    };

    const sxIcon = {
        "@media screen and (orientation: portrait)": {
            fontSize: 'xx-large'
        },
        "@media screen and (orientation: landscape)": {
            fontSize: 'x-large'
        }
    }

    return (
        <>
        <Menu 
            user={user}
            t={t} 
            from={from}
            open={openMenu} 
            setOpen={setOpenMenu} 
            changeLanguage={changeLanguage}
            handleLogout={handleLogout}
            handleContact={handleContact}
            handleWhatsapp={handleWhatsapp}
        />
        <Paper 
            id='barbottom'
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, marginRight: 'auto', marginLeft: 'auto', zIndex: 2  }} 
            elevation={3}
        >

            <BottomNavigation
                showLabels
                value={value}
                onChange={clickIcon} 
                sx={sxNavigation}               
            >      

                {/*<Box sx={{ flexGrow: 1 }}/>*/}

                <BottomNavigationAction
                    label={t('MenuBar.Home')}
                    icon={<HomeIcon sx={sxIcon}/>}
                    value='home'
                    sx={sxNavigationAction}
                />

                

                <BottomNavigationAction
                    label={t('MenuBar.Animals')}
                    icon={<AnimalsIcon sx={sxIcon}/>}
                    value='animals'
                    sx={sxNavigationAction}
                />

                

                <BottomNavigationAction
                    label={t('MenuBar.News')}
                    icon={<NewsIcon sx={sxIcon}/>}
                    value='news'
                    sx={sxNavigationAction}
                />

                

                <BottomNavigationAction
                    label={t('MenuBar.User')}
                    icon={<UserIcon sx={sxIcon}/>}
                    value='user'
                    sx={sxNavigationAction}
                />
                {/*
                <BottomNavigationAction
                    label={t('MenuBar.Contact')}
                    icon={<ContactIcon sx={sxIcon}/>}
                    value='contact'
                    sx={sxNavigationAction}
                />
                */}

                

                <BottomNavigationAction
                    label={t('MenuBar.Menu')}
                    icon={<MenuIcon sx={sxIcon}/>}
                    value='menu'
                    sx={sxNavigationAction}
                />

                

            </BottomNavigation>

        </Paper>
        </>
    );
}
