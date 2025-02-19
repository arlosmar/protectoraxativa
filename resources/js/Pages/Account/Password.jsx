import { useRef } from 'react';
import Input from '@/Components/Input';
import { useForm } from '@inertiajs/react';
import Toast from '@/Components/Toast';
import { useState, useEffect } from 'react';

export default function Password({t,user}) {

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    const updatePassword = (e) => {
        
        e.preventDefault();

        var path = 'password.update';
        /*
        if(user && user?.admin){
            path = 'password.update';
        }
        */

        post(route(path), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    const [ openToast, setOpenToast ] = useState(recentlySuccessful ? true : false);

    useEffect(() => {
        if(recentlySuccessful){
            setOpenToast(true);
        }
    }, [recentlySuccessful]);

    return (

        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={t('trans.Saved-Male')}
        />
        <div className='account-div-box'>
            {/*
            <h1 className='title-subsection'>              
                {t('user.profile.password.title')}
            </h1>
            */}
            <form onSubmit={updatePassword} className='mt-4'>
                <div className=''>
                    <Input
                        id="current_password"
                        name="current_password"
                        type="password"                        
                        value={data.current_password}                        
                        autoComplete="current-password"                        
                        onChange={handleInput}                        
                        placeholder={t('user.profile.password.password-current')}                        
                        error={errors.current_password}                        
                    />                   
                </div>

                <div className='mt-4'>
                    <Input
                        id="password"
                        name="password"
                        type="password"                        
                        value={data.password}                        
                        autoComplete="new-password"                        
                        onChange={handleInput}                        
                        placeholder={t('user.profile.password.password-new')}                        
                        error={errors.password}
                    />
                </div>

                <div className='mt-4'>
                    <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"                        
                        value={data.password_confirmation}                        
                        autoComplete="new-password"                        
                        onChange={handleInput}                        
                        placeholder={t('user.profile.password.password-confirm')}                        
                        error={errors.password_confirmation}
                    />
                </div>

                <div className="text-center mt-4">
                    <button className={`login-button ${processing && 'opacity-25'}`} disabled={processing}>
                        {t('trans.Save')}
                    </button>
                </div> 
            </form>
        </div>
        </>
    );
}
