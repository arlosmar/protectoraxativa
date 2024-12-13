import { useState } from 'react';
import DeleteAccountModal from '@/Modals/DeleteAccountModal';

export default function Delete({t,user}) {

    const [ confirmingUserDeletion, setConfirmingUserDeletion ] = useState(false);

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };
    
    return (
        <>
        <DeleteAccountModal
            t={t}
            user={user}
            show={confirmingUserDeletion}
            setShow={setConfirmingUserDeletion}
        />
        <div className='account-div-box'>
            <div>
                <h1 className='title-subsection'>
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
        </div>
        </>
    );
}
