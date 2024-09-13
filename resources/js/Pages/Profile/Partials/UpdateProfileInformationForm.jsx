import Input from '@/Components/Input';
import { useForm } from '@inertiajs/react';
import Toast from '@/Components/Toast';
import { useState, useEffect } from 'react';

export default function UpdateProfileInformation({ t, user, status, className = '' }) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    /*
    <div className="text-center">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            {t('trans.Saved-Male')}
                        </p>
                    </Transition>
                </div>
    */

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
        <div className='mt-4'>
            <h1 className='user-title'>
                {t('user.profile.information.description')}
            </h1>

            <form onSubmit={submit}>

                <div className="mt-4">
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

                <div className="mt-4">
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
