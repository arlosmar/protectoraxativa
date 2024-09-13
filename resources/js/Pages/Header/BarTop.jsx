import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/PowerSettingsNew';

import { setLanguage } from "@/Utils/Cookies";
import { languages } from "@/Utils/Variables";

import { getDarkMode } from "@/Utils/Cookies";

import LanguageModal from "@/Modals/LanguageModal";

import IconButton from '@mui/material/IconButton';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';

//https://mui.com/material-ui/material-icons/

const theme = createTheme({
    components: {
        MuiIconButton: {
            variants: [
                {
                    props: { variant: "black" },
                    style: {
                        color: "black"
                    }
                },
                {
                    props: { variant: "white" },
                    style: {
                        color: "white"
                    }
                },
                {
                    props: { variant: "red" },
                    style: {
                        color: "red"
                    }
                }
            ]
        }
    }
});

export default function BarTop({user,t,from}){

    const { i18n } = useTranslation('global');

    const darkmode = getDarkMode();

    const langs = languages();

    const [ showLanguage, setShowLanguage ] = useState(false);

    const changeLanguage = (event) => {
        setShowLanguage(true);
    };

    const [ lang, setLang ] = useState(i18n.language);

    const handleLanguage = (e) => {  

        e.preventDefault();

        setShowLanguage(false);
        
        const iso = e.currentTarget.id;

        i18n.changeLanguage(iso);        

        setLanguage(iso);
        setLang(iso);
        
         // update user language if logged in
        axios.put(route('language.update'),{language: iso})
        .then(function (response){            
            /*
            if(response.result){
                // success
            }
            else{
                // error
            }
            */
        })
        .catch(function (error){
            
        });     

        //put(route('language.update'));
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
    };

    const logout = () => {
        window.location = route('logout.get');
    };

    const trigger = useScrollTrigger({
        target: window ? window : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleTop = (e) => {  
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    //variant={darkmode ? "white" : "black"}

    return (
        <div className='mx-1 mt-1'>
            <LanguageModal           
                show={showLanguage}
                setShow={setShowLanguage}
                language={lang}
                languages={langs}
                handleLanguage={handleLanguage}
            />
            <ThemeProvider theme={theme}>
                
                <AppBar position="static" sx={{ /*bgcolor: darkmode ? "black" : "white",*/ width: '100%', borderRadius: '5px 5px 5px 5px', padding: '0px' }}>
                
                    <Toolbar sx={{ padding: '0px 5px 0px 5px' }}>                        
                        
                        <a href='/'>
                            <Box
                                component="img"
                                sx={{height: 60}}
                                alt="amicsgirona.cat"
                                src='/amicsgirona_favicon.png'
                                id='logo'
                            />                            
                        </a>

                        <Box sx={{ flexGrow: 1 }}/>

                        <a href='/'>
                            <span id='logo-text'>amicsgirona</span>
                        </a>

                        <Box sx={{ flexGrow: 1 }}/>

                        <IconButton color="primary" onClick={changeLanguage} id='language'>
                            <LanguageIcon/>                  
                        </IconButton>

                        {
                            user &&
                            <IconButton variant="red" color="primary" onClick={logout} id='logout' sx={{marginLeft:'5px'}}>
                                <LogoutIcon/>                  
                            </IconButton>
                        }

                    </Toolbar>
                
                </AppBar>
            
            </ThemeProvider>
            <Fade in={trigger}>
                <Box
                    onClick={handleTop}
                    role="presentation"
                    sx={{ position: 'fixed', bottom: 80, right: 16 }}
                >
                    <Fab size="small" sx={{color:'#FF8C00',bgcolor:'white'}}>
                        <KeyboardArrowUpIcon/>
                    </Fab>
                </Box>
            </Fade>
        </div>
  );
}
