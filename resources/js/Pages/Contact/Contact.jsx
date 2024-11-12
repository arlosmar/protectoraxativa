import Header from '@/Pages/Header/Header';
import { useState, useEffect, useRef } from 'react';
import Input from '@/Components/Input';
import { useForm } from '@inertiajs/react';
import Toast from '@/Components/Toast';

import { useTranslation } from "react-i18next";

import Grid from '@mui/material/Grid2';

export default function Contact({user,status,email,emails,social}) {

    const myRef = useRef(null);

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

        if(
            recentlySuccessful || 
            (errors?.error && errors.error.length > 0)
        ){
            setOpenToast(true);
        }

        if(recentlySuccessful){
            setData({...data, 'name' : '', 'email' : '', 'message' : ''});
        }

        // scroll to form
        if(Object.keys(errors).length > 0){
            //myRef.current.scrollIntoView();
            const element = document.getElementById('name');            
            if(element){    
                element.scrollIntoView({behavior: 'smooth'});
            }
        }

    }, [recentlySuccessful,errors]);

    return (
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={recentlySuccessful ? t('trans.Sent-Male') : null}
            error={errors?.error}
        />
        <Header user={user} t={t} from='contact'/>
        <main>
            {/*
            <h1 className="title">
                {t('contact.title')}
            </h1>
            */}
            <Grid container spacing={0} className='pt-8'>
                <Grid size={{ xs: 12, md: 5 }} className='mb-8 text-center'>
                    <h1 className='subtitle-home'>
                        {t('contact.info.title1')}
                    </h1>
                    <a href={'mailto:'+emails?.info} target='_blank'>
                        {emails?.info}
                    </a>
                    <h1 className='subtitle-home paragraph-top-separation'>
                        {t('contact.info.phone')}
                    </h1>
                    <a href={'tel:'+social?.phone} target='_blank'>
                        {social?.phone}
                    </a>
                    <h1 className='subtitle-home paragraph-top-separation'>
                        {t('contact.info.whatsapp')}
                    </h1>
                    <a href={'https://wa.me/'+social?.whatsapp} target='_blank'>
                        {social?.phone}
                    </a>
                    <h1 className='subtitle-home paragraph-top-separation'>
                        {t('contact.info.title2')}
                    </h1>
                    <a href={'mailto:'+emails?.colaboration} target='_blank'>
                        {emails?.colaboration}
                    </a>
                    <h1 className='subtitle-home paragraph-top-separation'>
                        {t('contact.info.title3')}
                    </h1>
                    <div>
                        {t('contact.info.shift-adoptions')}
                    </div>
                    <a href={'mailto:'+emails?.adoptions} target='_blank'>
                        {emails?.adoptions}
                    </a>
                    <h1 className='subtitle-home paragraph-top-separation'>
                        {t('contact.info.title4')}
                    </h1>
                    <a href={'mailto:'+emails?.volunteering} target='_blank'>
                        {emails?.volunteering}
                    </a>
                    <h1 className='subtitle-home paragraph-top-separation'>
                        {t('contact.info.shift-phone-title')}
                    </h1>
                    <div>
                        {t('contact.info.shift-phone-line1')}<br/>
                        {t('contact.info.shift-phone-line2')}
                    </div>
                    <div className='paragraph-top-separation'>
                        {t('contact.info.shift-phone-footer1')}<br/>
                        {t('contact.info.shift-phone-footer2')}
                    </div>
                    <h1 className='subtitle-home paragraph-top-separation'>
                        {t('contact.info.shift-live-title')}
                    </h1>
                    <div>
                        {t('contact.info.shift-live-line1')}
                    </div>
                    <div className='paragraph-top-separation'>
                        {t('contact.info.title5')}
                    </div>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }} className=''>
                    <form onSubmit={submit}>
                        <div>
                            <Input
                                ref={myRef}
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

                        <div className="paragraph-top-separation">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}                        
                                autoComplete="email"                        
                                onChange={handleInput}                        
                                placeholder={t('contact.email')}                        
                                error={errors.email}
                                required
                            />
                        </div>

                        <div className="paragraph-top-separation">
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
                                required
                            />                   
                        </div>

                        <div className="text-center paragraph-top-separation">
                            <button className={`login-button mx-1 ${processing && 'opacity-25'}`} disabled={processing}>
                                {t('contact.send')}
                            </button>
                        </div>

                    </form>
                </Grid>
            </Grid>
        </main>
        </>
    );
}
