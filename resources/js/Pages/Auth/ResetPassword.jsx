import Header from '@/Pages/Header/Header';
import { useEffect } from 'react';
import Input from '@/Components/Input';
import { useForm } from '@inertiajs/react';

import { useTranslation } from "react-i18next";

export default function ResetPassword({ token, email }) {

    const { t } = useTranslation('global');
    
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
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
        post(route('password.store'));
    };

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    return (
        <>
        <Header t={t} from='login'/>
        <main>
            <h1 className="title">
                {t('login.title-forgot')}
            </h1>

            <form onSubmit={submit}>
                <div>                    
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        value={data.email}                        
                        autoComplete="email"                        
                        onChange={handleInput}                        
                        placeholder={t('login.email')}                        
                        error={errors.email}
                        readOnly
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

                <div className="flex justify-center mt-4">
                    
                    <div className='mx-1'>
                        <a className="back-button" href={route('login')}>
                            {t('trans.Back')}
                        </a>
                    </div>

                    <button className={`login-button mx-1 ${processing && 'opacity-25'}`} disabled={processing}>
                        {t('login.reset')}
                    </button>
                </div>

            </form>
        </main>
        </>
    );
}
