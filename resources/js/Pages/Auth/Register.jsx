import Header from '@/Pages/Header/Header';
import { useEffect, useState } from 'react';
import Input from '@/Components/Input';
import { useForm } from '@inertiajs/react';

import { useTranslation } from "react-i18next";
import GoogleIcon from '@mui/icons-material/Google';

export default function Register() {

    const { t } = useTranslation('global');
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    return (
        <>
        <Header t={t} from='user'/>
        <main>
            {/*
            <h1 className="title">
                {t('login.register')}
            </h1>
            */}
            <form onSubmit={submit} className='mt-8'>
                <div>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={data.name}                        
                        autoComplete="name"
                        isFocused={true}
                        onChange={handleInput}                        
                        placeholder={t('login.name')}                        
                        error={errors.name}
                    />
                </div>

                <div className="mt-4">
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        value={data.email}                        
                        autoComplete="email"                        
                        onChange={handleInput}                        
                        placeholder={t('login.email')}                        
                        error={errors.email}
                    />
                </div>

                <div className="mt-4">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}                        
                        autoComplete="new-password"                        
                        onChange={handleInput}                        
                        placeholder={t('login.password')}                        
                        error={errors.password}
                    />                   
                </div>

                <div className="mt-4">
                    <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        value={data.password_confirmation}                        
                        autoComplete="new-password"                        
                        onChange={handleInput}                        
                        placeholder={t('login.password-confirm')}                        
                        error={errors.password_confirmation}
                    /> 
                </div>

                <div className="text-center mt-4">
                    <button className={`login-button mx-1 ${processing && 'opacity-25'}`} disabled={processing}>
                        {t('login.register')}
                    </button>
                </div>
            </form>
            
            <div className="flex justify-center items-center mt-4">                   
                <a className='google-button' href={route('google')}>
                    <GoogleIcon/> {t('login.google')}
                </a>
            </div>
            
            <div className="text-center mt-8">                   
                <a href={route('login')}>
                    {t('login.login2')}
                </a>
            </div>
        
        </main>
        </>
    );
}
