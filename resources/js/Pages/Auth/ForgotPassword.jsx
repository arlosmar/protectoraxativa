import Header from '@/Pages/Header/Header';
import Input from '@/Components/Input';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import { useTranslation } from "react-i18next";

import Toast from '@/Components/Toast';

export default function ForgotPassword({ status }) {

    const { t } = useTranslation('global');

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    const [ openToast, setOpenToast ] = useState(status ? true : false);

    useEffect(() => {
        if(status){
            setOpenToast(true);
        }
    }, [status]);

    return (
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={status}
        />
        <Header t={t} from='login'/>
        <main>
            <h1 className="title">
                {t('login.title-forgot')}
            </h1>
        
            <div className='mb-4'>
                {t('login.forgot-sentence')}
            </div>  

            <form onSubmit={submit}>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}                        
                    autoComplete="email"                        
                    onChange={handleInput}
                    placeholder={t('login.email')}                        
                    error={errors.email}
                />

                <div className="flex justify-center mt-4">
                    
                    <div className='mx-1'>
                        <a className="back-button" href={route('login')}>
                            {t('trans.Back')}
                        </a>
                    </div>

                    <button className={`login-button mx-1 ${processing && 'opacity-25'}`} disabled={processing}>
                        {t('login.forgot-send')}
                    </button>
                </div>
            </form>
        </main>
        </>
    );
}
