import Header from '@/Pages/Header/Header';
import { useForm } from '@inertiajs/react';
import Toast from '@/Components/Toast';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

export default function VerifyEmail({ user, status }) {

    const { t } = useTranslation('global');

    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

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
            message={t('user.email.'+status)}
        />
        <Header user={user} t={t} from='user'/>
        <main>
            <h1 className="title mt-4">
                {t('user.email.title')}
            </h1>            
            <div className='text-center'>
                {t('user.email.description')}
            </div>

            <form onSubmit={submit} className='mt-4 text-center'>
                <button className={`login-button ${processing && 'opacity-25'}`} disabled={processing}>
                    {t('user.email.resend-link')}
                </button>
            </form>
        </main>
        </>
    );
}
