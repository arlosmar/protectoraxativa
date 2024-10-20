import Toast from '@/Components/Toast';
import { useState } from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { setDarkMode } from "@/Utils/Cookies";
import { getDarkMode } from "@/Utils/Cookies";

export default function UserSettings({ t, user }) {

    const darkmode = getDarkMode();

    const [checked, setChecked] = useState(darkmode ? true : false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleDarkMode = (event) => {

        setChecked(event.target.checked);

        const darkmode = event.target.checked ? 1 : 0;

        setDarkMode(darkmode);

        if(darkmode){
            document.body.classList.add('darkmode');
            document.body.classList.remove('lightmode');
        }
        else{
            document.body.classList.remove('darkmode');
            document.body.classList.add('lightmode');
        }

        axios.put(route('settings.update'),{darkmode: darkmode})
        .then(function (response){            
            
            if(response.data.result){
                // success
                //setMessage(t('trans.Saved-Male'));
                //setError('');
            }
            else{
                // error
                //setError(t('trans.Saved-Error'));
                //setMessage('');
            }

            //setOpenToast(true);
        })
        .catch(function (error){
            //setError(t('trans.Saved-Error'));
            //setMessage('');
            //setOpenToast(true);
        }); 
    }

    const [ openToast, setOpenToast ] = useState(false);

    return (
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            error={error}
            message={message}
        />
        <div className='mt-4'>
            <h1 className='user-title'>
                {t('user.profile.settings.description')}
            </h1>

            <div className='block mt-4 ms-2'>
                <FormControlLabel 
                    control={
                        <Switch color="warning"/>
                    } 
                    label={t('user.profile.settings.dark-mode')}                        
                    checked={checked}
                    onChange={handleDarkMode}
                />
            </div>
        </div>
        </>
    );
}
