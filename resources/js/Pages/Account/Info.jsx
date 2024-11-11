import Input from '@/Components/Input';
import { useForm } from '@inertiajs/react';
import Toast from '@/Components/Toast';
import { useState, useEffect } from 'react';

export default function Info({t,user,status}) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
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
        patch(route(path));
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

    return (
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={t('trans.Saved-Male')}
        />
        <div className='box'>
            
            <h1 className='title-subsection'>
                {t('user.profile.information.title')}
            </h1>
            
            <form onSubmit={submit}>

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
                        isFocused={true}
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
        </>
    );
}
