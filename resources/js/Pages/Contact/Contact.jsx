import Header from '@/Pages/Header/Header';
import { useState, useEffect } from 'react';
import Input from '@/Components/Input';
import { useForm } from '@inertiajs/react';
import Toast from '@/Components/Toast';

import { useTranslation } from "react-i18next";

export default function Contact({user,email}) {

    const { t } = useTranslation('global');
    
    const { data, setData, post, errors, processing, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',        
        message: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.send'));
    };

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    const [ openToast, setOpenToast ] = useState(recentlySuccessful || errors.error ? true : false);

    useEffect(() => {
        if(recentlySuccessful || errors.error){
            setOpenToast(true);
        }
    }, [recentlySuccessful,errors]);

    return (
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={recentlySuccessful ? t('trans.Sent-Male') : null}
            error={errors.error}
        />
        <Header user={user} t={t} from='contact'/>
        <main>
            <h1 className="title">
                {t('contact.title')}
            </h1>
    
            <form onSubmit={submit}>
                <div>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={data.name}                        
                        autoComplete="name"
                        isFocused={true}
                        onChange={handleInput}                        
                        placeholder={t('contact.name')}                        
                        error={errors.name}
                    />
                </div>

                <div className="mt-4">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}                        
                        autoComplete="email"                        
                        onChange={handleInput}                        
                        placeholder={t('contact.email')}                        
                        error={errors.email}
                    />
                </div>

                <div className="mt-4">
                    <Input
                        id="message"
                        name="message"
                        type="message"
                        value={data.message}                        
                        autoComplete="new-password"                        
                        onChange={handleInput}                        
                        placeholder={t('contact.message')}                        
                        error={errors.message}
                        multiline
                        rows={6}
                    />                   
                </div>

                <div className="text-center mt-4">
                    <button className={`login-button mx-1 ${processing && 'opacity-25'}`} disabled={processing}>
                        {t('contact.send')}
                    </button>
                </div>

            </form>
        
        </main>
        </>
    );
}
