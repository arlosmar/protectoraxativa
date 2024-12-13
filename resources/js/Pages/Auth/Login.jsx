import Header from '@/Pages/Header/Header';
import { useEffect, useState } from 'react';
import Input from '@/Components/Input';
import { useForm } from '@inertiajs/react';
import Switch from '@/Components/Switch';

import { useTranslation } from "react-i18next";

import Toast from '@/Components/Toast';

import GoogleIcon from '@mui/icons-material/Google';

import { authenticate, getStoredCredential } from '@/Components/Authentication';

export default function Login({ status, canResetPassword, path }) {

    const { t } = useTranslation('global');

    const [ biometricSaved, setBiometricSaved ] = useState(getStoredCredential(true));
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true /* remember always */
        /*,path: path && path.length > 0 ? path : ''*/
    });

    const checkAuthentication = async () => {        
        
        const credential = await authenticate();

        if(credential?.authentication){
            post(route('login.authentication',[credential?.userId]));
        }
    }

    useEffect(() => {

        const credential = checkAuthentication();

        return () => {
            reset('password');
        };

    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    /*
    <GuestLayout>
        
            <Head title="Login" />

            {
                status && 
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            }

            <form onSubmit={submit}>
                
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

            </form>

        </GuestLayout>
    */

    const [checked, setChecked] = useState(false);

    const handleRemember = (event) => {
        setChecked(event.target.checked);
        setData('remember', event.target.checked)
    };

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    const [ openToast, setOpenToast ] = useState(status ? true : false);
    const [ message, setMessage ] = useState(status ? status : null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if(status){
            setMessage(status);
            setError(null);
            setOpenToast(true);
        }
    }, [status]);

    useEffect(() => {
        if(errors?.authentication){
            setMessage(null);
            setError(errors?.authentication);
            setOpenToast(true);
        }
    }, [errors?.authentication]);

    return (
        
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={message}
            error={error}
        />
        <Header t={t} from='user'/>
        <main>
            {/*
            <h1 className="title">  
                {t('login.title')}
            </h1>            
            <div className='text-center mb-2'>
                {t('login.description')}
            </div>
            */}
            <form onSubmit={submit} className='mt-8'>
                
                <div>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}                        
                        autoComplete="email"                        
                        onChange={handleInput}                        
                        placeholder={t('login.email')}                        
                        error={errors.email}                        
                        isFocused
                        shrink

                    />
                </div>

                <div className="mt-4">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}                        
                        autoComplete="current-password"                        
                        onChange={handleInput}                        
                        placeholder={t('login.password')}                        
                        error={errors.password}
                        shrink
                    />
                </div>
                {/*
                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">{t('login.remember')}</span>
                    </label>
                </div>
                */}

                {/*
                remember always
                <div className='mt-4'>                  
                    <Switch
                        name="remember"                       
                        checked={checked}
                        onChange={handleRemember}
                        label={t('login.remember')}
                    />
                </div>
                */}
                <div className="flex items-center justify-end mt-4">
                    {
                        canResetPassword &&
                        <a href={route('password.request')}>
                            {t('login.forgot')}
                        </a>
                    }
                </div>

                <div className="text-center mt-4">                   
                    <button className={`login-button ${processing && 'opacity-25'}`} disabled={processing}>
                        {t('login.login')}
                    </button>
                </div>
            </form>
            
            <div className="flex justify-center items-center mt-4">                   
                <a className='google-button' href={route('google')}>
                    <GoogleIcon/> {t('login.google')}
                </a>
            </div>
            {
                biometricSaved &&
                <div className="text-center mt-8">                   
                    <a className='cursor-pointer' onClick={checkAuthentication}>
                        {t('user.profile.settings.biometric')}
                    </a>
                </div>
            }
            
            <div className="text-center mt-8">                   
                <a href={route('register')}>
                    {t('login.register')}
                </a>
            </div>
            
        </main>
        </>
    );
}
