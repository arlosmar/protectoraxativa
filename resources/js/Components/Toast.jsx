import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

export default function Toast({open,setOpen,message,error}) {

	const handleClose = () => {
    	setOpen(false);
    };

	return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal : 'center'}}
            open={open}
            onClose={handleClose}
            key='top center'
            autoHideDuration={3000}
        >
        	<Alert
			    onClose={handleClose}
			    severity={message && message.length > 0 ? "success" : "error"}
			    variant="filled"
			    sx={{ width: '100%' }}
			  >
		    	{message && message.length > 0 ? message : error}
		  	</Alert>
		</Snackbar>
	)
}