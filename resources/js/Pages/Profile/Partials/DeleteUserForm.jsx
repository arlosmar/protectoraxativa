import { useRef, useState } from 'react';
import Input from '@/Components/Input';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import Toast from '@/Components/Toast';

export default function DeleteUserForm({ t }) {
    
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    const handleInput = (e) => {
        setData(e.target.name,e.target.value);
    }

    return (
        <div className='mt-4'>
            
            <div>
                <h1 className='user-title'> 
                    {t('user.profile.account.title')}
                </h1>
                <p className='text-center'>
                    {t('user.profile.account.description')}
                </p>
            </div>

            <div className="mt-4 flex justify-center">                
                <button className='delete-button' onClick={confirmUserDeletion}>
                    {t('user.profile.account.delete')}
                </button>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                
                <form onSubmit={deleteUser} className="p-6">
                
                    <h1 className="title">
                        {t('user.profile.account.confirm')}
                    </h1>

                    <p className="mt-4">
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

                        <div className='mx-1'>
                            <button className='cancel-button' onClick={closeModal}>
                                {t('user.profile.account.cancel')}
                            </button>
                        </div>

                        <button className={`delete-button ${processing && 'opacity-25'}`} disabled={processing}>
                            {t('user.profile.account.delete')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
