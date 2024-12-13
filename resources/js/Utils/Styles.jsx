//import { makeStyles } from '@mui/styles';
import { getDarkMode } from "@/Utils/Cookies";

export const styleTabs = () => {

    /*
    const useStyles = makeStyles({

        tabs: {
            "& .MuiTabs-indicator": {
                backgroundColor: "#FF8C00",
                height: 3,
            },
            "& .MuiTab-root.Mui-selected": {
                color: '#FF8C00'
            },
            "& .MuiTabs-flexContainer": {
                justifyContent: 'space-between'                
            },
            "& .MuiButtonBase-root.MuiTab-root": {
                minHeight: '60px'
            },
            "& .MuiSvgIcon-root.MuiTab-icon": {
                marginBottom: '0px'
            }
        }
    });

    const classes = useStyles();
    */

    const sxTabs = {
        "& .MuiTabs-indicator": {
            backgroundColor: "#FF8C00",
            height: 3,
        },
        "& .MuiTab-root.Mui-selected": {
            color: '#FF8C00'
        },
        "& .MuiTabs-flexContainer": {
            justifyContent: 'space-between'                
        },
        "& .MuiButtonBase-root.MuiTab-root": {
            minHeight: '60px'
        },
        "& .MuiSvgIcon-root.MuiTab-icon": {
            marginBottom: '0px'
        },
        zIndex:1
    };

    const sx = {
        minWidth: "fit-content", 
        maxWidth: '100%', 
        flex: 1 
    };

    const sxIcon = {
    
    }

    return { sxTabs, sx, sxIcon };
}

export const styleSubTabs = () => {

    const darkmode = getDarkMode();
    /*
    const useStyles = makeStyles({

        tabs: {
            "& .MuiTabs-indicator": {
                backgroundColor: darkmode ? "#6495ED" : "#0047AB",
                height: 3,
            },
            "& .MuiTab-root.Mui-selected": {
                color: darkmode ? "#6495ED" : '#0047AB'
            },
            "& .MuiTabs-flexContainer": {
                justifyContent: 'space-between'                
            },
            "& .MuiButtonBase-root.MuiTab-root": {
                minHeight: '40px'
            },
            "& .MuiSvgIcon-root.MuiTab-icon": {
                marginBottom: '0px'
            }
        }
    });

    const classes = useStyles();
    */

    const sxSubTabs =  {
        "& .MuiTabs-indicator": {
            backgroundColor: darkmode ? "#6495ED" : "#0047AB",
            height: 3,
        },
        "& .MuiTab-root.Mui-selected": {
            color: darkmode ? "#6495ED" : '#0047AB'
        },
        "& .MuiTabs-flexContainer": {
            justifyContent: 'space-between'                
        },
        "& .MuiButtonBase-root.MuiTab-root": {
            minHeight: '40px'
        },
        "& .MuiSvgIcon-root.MuiTab-icon": {
            marginBottom: '0px'
        }
    };

    const sx = {
        minWidth: "fit-content", 
        maxWidth: '100%', 
        flex: 1,
        fontSize: '12px'
    };

    const sxIcon = {
        fontSize: '20px'
    }

    return { sxSubTabs, sx, sxIcon };
}

export const modalStyle = (fullWidth = true) => {

    const darkmode = getDarkMode();

    const sx = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',        
        maxWidth: 600,
        //maxHeight: '99%',
        maxHeight: '85%',
        bgcolor: darkmode ? "rgb(38 38 38)" : "background.paper",
        border: darkmode ? "1px solid #fff" : "1px solid #000",
        borderRadius: '5px',
        boxShadow: 24,
        px: 1,
        pt: 1,
        pb: 0,
        m: 0,
    };

    if(fullWidth){
        sx.width = '98%';        
    }
    else{
        sx.minWidth = 200;
    }

    const sxIcon = {
        fontSize: '35px'
    };

    const sxIconClose = {
        fontSize: '40px'
    };

    return { sx, sxIcon, sxIconClose };
}