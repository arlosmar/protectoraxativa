import { useState } from "react";
import { checkIsIOS } from '@/Utils/Device';
//import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LanguageIcon from '@mui/icons-material/Language';
import ContactIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/PowerSettingsNew';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import { getDarkMode } from "@/Utils/Cookies";

export default function Menu({user,t,from,open,setOpen,changeLanguage,handleLogout,handleContact,handleWhatsapp}){

	const darkmode = getDarkMode();

	const [ isIOS, setIsIOS ] = useState(checkIsIOS());

	const handleMenu = (e,value) => {
    
        if(
            e && e.type === 'keydown' &&
            (e.key === 'Tab' || e.key === 'Shift')
        ){
            return;
        }

        setOpen(value);
    };

    const sxListItemIcon = {minWidth:'auto', paddingRight: '5px'};
    const sxIcon = {color: darkmode ? "white" : "black"};
    const sxContactIcon = sxIcon;
    const sxItemTextContact = {};
    /*
    var sxContactIcon = {};
    var sxItemTextContact = {};
    if(from === 'contact'){
    	sxContactIcon.color = '#FF8C00';
    	sxItemTextContact.color = '#FF8C00';
	}
	else{
		sxContactIcon = sxIcon;
	}
	*/
    const sxLogoutIcon = {color: "red"};
    const sxItemTextLogout = {color: "red"};

    /*
    <SwipeableDrawer 
            anchor='right'
            open={open} 
            onOpen={(e) => handleMenu(e,true)}
            onClose={(e) => handleMenu(e,false)}
            disableBackdropTransition={!isIOS} 
            disableDiscovery={isIOS}            
            PaperProps={{
                sx: {
                    backgroundColor: darkmode ? "rgb(38 38 38)" : "white",
                    color: darkmode ? "white" : "black",
                    width: '50%',
                    maxWidth: '300px'
                }
            }}
        >
    */

	return (
		<Drawer 
            anchor='right'
            open={open} 
            onOpen={(e) => handleMenu(e,true)}
            onClose={(e) => handleMenu(e,false)}
            PaperProps={{
                sx: {
                    backgroundColor: darkmode ? "rgb(38 38 38)" : "white",
                    color: darkmode ? "white" : "black",
                    width: '50%',
                    maxWidth: '300px'
                }
            }}
        >
            <Box
                sx={{
                    width: 'auto',
                    height: '100%',
                    backgroundImage:`url(/storage/menu.png)`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "100px"
                }}
                role="presentation"
                onClick={(e) => handleMenu(e,false)}
                onKeyDown={(e) => handleMenu(e,false)}
            >
                <div className='flex justify-center mt-2'>
                    <Box
                        component="img"
                        sx={{height: 60}}
                        alt=""
                        src='/storage/logo.png'
                        id='logo'
                    />
                </div>
                <List>            
                    <ListItem key='language' disablePadding>
                        <ListItemButton onClick={changeLanguage}>
                            <ListItemIcon sx={sxListItemIcon}>
                                <LanguageIcon sx={sxIcon}/>
                            </ListItemIcon>
                            <ListItemText primary={t('MenuBar.Language')} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key='whatsapp' disablePadding>
                        <ListItemButton onClick={handleWhatsapp}>
                            <ListItemIcon sx={sxListItemIcon}>
                                <WhatsappIcon sx={sxIcon}/>
                            </ListItemIcon>
                            <ListItemText primary={t('MenuBar.Whatsapp')} />
                        </ListItemButton>
                    </ListItem>

                    {
                    	from !== 'contact' &&
	                    <ListItem key='contact' disablePadding>
	                        <ListItemButton onClick={handleContact}>
	                            <ListItemIcon sx={sxListItemIcon}>
	                                <ContactIcon sx={sxContactIcon}/>
	                            </ListItemIcon>
	                            <ListItemText primary={t('MenuBar.Contact')} sx={sxItemTextContact}/>
	                        </ListItemButton>
	                    </ListItem>
	                }

	                {
	                	user &&
	                    <ListItem key='logout' disablePadding>
	                        <ListItemButton onClick={handleLogout}>
	                            <ListItemIcon sx={sxListItemIcon}>
	                                <LogoutIcon sx={sxLogoutIcon}/>
	                            </ListItemIcon>
	                            <ListItemText primary={t('MenuBar.Logout')} sx={sxItemTextLogout}/>
	                        </ListItemButton>
	                    </ListItem>
	                }
                </List>
            </Box>
        </Drawer>
    )
}