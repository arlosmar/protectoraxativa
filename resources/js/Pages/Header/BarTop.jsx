import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import LanguageIcon from '@mui/icons-material/Language';
import ContactIcon from '@mui/icons-material/Email';
//import ContactIcon from '@mui/icons-material/MailOutline';
import LogoutIcon from '@mui/icons-material/PowerSettingsNew';
//import UserIcon from '@mui/icons-material/Person';

//import { getDarkMode } from "@/Utils/Cookies";

import IconButton from '@mui/material/IconButton';

//https://mui.com/material-ui/material-icons/

export default function BarTop({user,t,from,changeLanguage,handleLogout,handleContact}){

    //const darkmode = getDarkMode();

    /*
    const login = () => {
        
        // not used because if you log in it goes to the user section
        // read current url to go back again once logged in
        /*
        var path = window.location.pathname;

        var parameter = '';

        // if already on login, check if path parameter alreadh there
        if(path && path.length > 0 && path !== '/'){

            if(path === '/login'){ 
                
                const queryParameters = new URLSearchParams(window.location.search)

                const prevPath = queryParameters.get("path");

                if(prevPath && prevPath.length > 0){
                    parameter = '?path='+encodeURI(prevPath);
                }
            }
            else{
                var encoded = encodeURI(path);
                parameter = '?path='+encoded;
            }
        }

        window.location = route('login')+parameter;
        */
    /*
        window.location = route('login');
    };
    */

    //variant={darkmode ? "white" : "black"}

    const sxAppBar = { 
        /*bgcolor: darkmode ? "black" : "white", 
        width: '100%',*/ 
        //borderRadius: '5px 5px 5px 5px', 
        //borderRadius: '5px 5px 0px 0px', 
        padding: '0px' 
    };

    const sxToolbar = {
        "@media (min-width: 0px)": { 
            padding: '5px 5px',
            minHeight : '0px'
        }
    };

    return (        
        <div className=''>
                
            <AppBar 
                id='bartop' 
                position="static" 
                sx={sxAppBar}
            >
            
                <Toolbar sx={sxToolbar}>                        

                    <IconButton onClick={changeLanguage} id='language'>
                        <LanguageIcon/>                  
                    </IconButton>

                    {/*
                        user &&                                                        
                        <IconButton variant={darkmode ? 'black' : 'white'} color="primary" sx={{marginRight:'5px'}}>
                            <LogoutIcon/>                  
                        </IconButton>                            
                    */}
                    
                    <Box sx={{ flexGrow: 1 }}/>

                    {
                        (user && from === 'user')?
                            <IconButton onClick={handleLogout} id='logout'>
                                <LogoutIcon/>                  
                            </IconButton>                                                   
                        :
                            <a href='/'>
                                <Box
                                    component="img"
                                    sx={{height: 40}}
                                    alt=""
                                    src='/storage/logo.png'
                                    id='logo'
                                />                            
                            </a>
                    }

                    {/*
                    <Box sx={{ flexGrow: 1 }}/>

                    <a href='/'>
                        <span id='logo-text'>protectoraxativa.org</span>
                    </a>
                    */}
                    <Box sx={{ flexGrow: 1 }}/>

                    {/*
                        user &&                                                        
                        <IconButton variant="red" color="primary" onClick={logout} id='logout' sx={{marginLeft:'5px'}}>
                            <LogoutIcon/>                  
                        </IconButton>                            
                    */} 
                    {/*
                    <IconButton variant={user && from === 'user' ? 'orange' : darkmode ? 'white' : 'black'} color="primary"  onClick={login} id='login'>
                        <UserIcon/>                  
                    </IconButton>
                    */}
                    <IconButton           
                        id={from === 'contact' ? 'contact-selected' : 'contact'}
                        onClick={handleContact}                             
                    >
                        <ContactIcon/>                  
                    </IconButton>

                </Toolbar>
            
            </AppBar>
            
        </div>
    );
}
