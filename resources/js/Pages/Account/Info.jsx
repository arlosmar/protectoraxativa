import Input from '@/Components/Input';
import { useForm } from '@inertiajs/react';
import Toast from '@/Components/Toast';
import { useState, useEffect } from 'react';

export default function Info({t,user,status,emails,social}) {

    const { data, setData, post/*patch*/, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        // change url on the browser
        var path = 'profile.update';
        if(user && user?.admin){
            path = 'admin.update';
        }
        
        // patch not working on the server
        //patch(route(path));
        post(route(path));
    };

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    const [ openToast, setOpenToast ] = useState(recentlySuccessful ? true : false);

    useEffect(() => {
        if(recentlySuccessful){
            setOpenToast(true);
        }
    }, [recentlySuccessful]);

    const columns = [
        {id:'name',text:t('people.record.name'),type:'text'},
        {id:'surname',text:t('people.record.surname'),type:'text'},
        {id:'dni',text:t('people.record.dni'),type:'text'},
        {id:'birthdate',text:t('people.record.birthdate'),type:'text'},
        {id:'email',text:t('people.record.email'),type:'email'},
        {id:'phone',text:t('people.record.phone'),type:'phone'},
        {id:'address',text:t('people.record.address'),type:'text'},
        {id:'name2',text:t('people.record.name2'),type:'text'},
        {id:'surname2',text:t('people.record.surname2'),type:'text'},
        {id:'dni2',text:t('people.record.dni2'),type:'text'},
        {id:'birthdate2',text:t('people.record.birthdate2'),type:'text'},
        {id:'email2',text:t('people.record.email2'),type:'email'},
        {id:'phone2',text:t('people.record.phone2'),type:'phone'},
        {id:'address2',text:t('people.record.address2'),type:'text'},
        {id:'other_people',text:t('people.record.others'),type:'text'}
    ];

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
                {t('user.profile.information.title')}
            </h1>
            */}
            <form onSubmit={submit} className='mt-4'>

                <div className="mb-4">
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        value={data.email}                        
                        autoComplete="email"                        
                        onChange={handleInput}                        
                        placeholder={t('user.profile.information.email')}                        
                        error={errors.email}
                        readOnly
                    />
                </div>

                <div className="mb-4">
                     <Input
                        id="name"
                        name="name"
                        type="text"
                        value={data.name}                        
                        autoComplete="name"                        
                        onChange={handleInput}                        
                        placeholder={t('user.profile.information.name')}                        
                        error={errors.name}
                    />
                </div>                

                <div className="text-center">
                    <button className={`login-button ${processing && 'opacity-25'}`} disabled={processing}>
                        {t('trans.Update')}
                    </button>
                </div>                
            </form>
        </div>
        {
            user?.person && columns && columns.length > 0 &&
            <div className='account-div-box mt-4'>            
                <h1 className='title-subsection'>
                    {t('user.profile.information.personal-data')}
                </h1>
                <div className=''>
                    {
                        columns.map((field,index) => (
                            <div className="mb-4">
                                <Input                            
                                    type="text"
                                    value={user.person[field?.id]}                                                                
                                    placeholder={field?.text}
                                    shrink
                                    readOnly
                                />
                            </div>
                        ))
                    }
                </div>
                <div className='text-center'>
                    {t('user.profile.information.update-personal-data')}<br/>
                    <h1 className='subtitle-home mt-4'>
                        {t('contact.info.email')}
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
                </div>
            </div>
        }
        </>
    );
}
