import { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Input from '@/Components/Input';

import { modalStyle } from '@/Utils/Styles';

export default function DeleteAccountModal({t,user,show,setShow}){

    const style = modalStyle();

    const passwordInput = useRef();

    const {data,setData,delete:destroy,processing,reset,errors} = useForm({
        password: ''
    });

    const [ initialDisabled, setInitialDisabled ] = useState(true);

    const deleteUser = (e) => {

        e.preventDefault();

        var path = 'profile.destroy';
        if(user && user?.admin){
            path = 'admin.destroy';
        }
        
        destroy(route(path), {        
            preserveScroll: true,
            onSuccess: () => handleClose(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const handleClose = () => {
        if(show){
            setShow(false);
        }
        reset();
        setInitialDisabled(true);
    };

    const handleInput = (e) => {
        if(initialDisabled){
            setInitialDisabled(false);
        }
        setData(e.target.name,e.target.value);
    }

    return (
        <>        
        <Modal
            open={show}
            onClose={handleClose}
        >
            <Box sx={style} className='flex flex-col'>
            
                <form onSubmit={deleteUser} className="p-6">
                    {/*
                    <h1 className="title">
                        {t('user.profile.account.confirm')}
                    </h1>
                    */}
                    <p className="text-center">
                        {t('user.profile.account.password-confirm')}
                    </p>

                    <div className="mt-4"> 
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            ref={passwordInput}
                            value={data.password}                        
                            autoComplete="password"                        
                            onChange={handleInput}                        
                            placeholder={t('user.profile.password.password')}                        
                            error={errors.password}                            
                        />
                    </div>

                    <div className="mt-4 flex justify-center">                        

                        <button 
                            className={`delete-button ${(initialDisabled || processing) && 'opacity-25'}`} 
                            disabled={initialDisabled || processing}
                        >
                            {t('user.profile.account.delete')}
                        </button>

                        <div className='mx-1'>
                            <button className='cancel-button' onClick={handleClose}>
                                {t('user.profile.account.cancel')}
                            </button>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
        </>
    )
}