import Toast from '@/Components/Toast';
import { useState } from 'react';

import Switch from '@/Components/Switch';

import { setDarkMode } from "@/Utils/Cookies";
import { getDarkMode } from "@/Utils/Cookies";

export default function Settings({ t, user }) {

    const darkmode = getDarkMode();

    const [checked, setChecked] = useState(darkmode ? true : false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleDarkMode = (event) => {

        setChecked(event.target.checked);

        const darkmode = event.target.checked ? 1 : 0;

        setDarkMode(darkmode);

        axios.put(route('settings.update'),{darkmode: darkmode})
        .then(function (response){            
            
            if(response.data.result){
                // success
                setMessage(t('trans.Saved-Male'));
                setError('');
            }
            else{
                // error
                setError(t('trans.Saved-Error'));
                setMessage('');
            }

            //setOpenToast(true);
        })
        .catch(function (error){
            setError(t('trans.Saved-Error'));
            setMessage('');
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
        <div className='box'>
            <h1 className='user-title'>
                {t('user.profile.settings.description')}
            </h1>
            <div className=''>
                <Switch
                    name="darkmode"                       
                    checked={checked}
                    onChange={handleDarkMode}
                    label={t('user.profile.settings.dark-mode')}
                />
            </div>
        </div>
        </>
    );
}
