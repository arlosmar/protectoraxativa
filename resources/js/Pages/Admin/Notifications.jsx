import Toast from '@/Components/Toast';
import { useState } from 'react';
import Input from '@/Components/Input';
import InputSelect from '@/Components/InputSelect';
import { useForm } from '@inertiajs/react';
import { getComparator } from "@/Utils/Format";
import Switch from '@/Components/Switch';

export default function Notifications({ t, user, usersFormattedOriginal, notifications }){

    const [ usersFormatted, setUsersFormatted ] = useState(usersFormattedOriginal);

    const { data, setData, reset } = useForm({
        users: [],
        peopleAll: 0,
        usersAll: 1,
        type: 1, // general type
        title: '',
        message: ''
    });

    const handleInput = (e) => {
        
        var name = e.target.name;        

        // switch
        if(name === 'usersAll' || name === 'peopleAll'){
            var value = e.target.checked ? 1 : 0;
        }
        else{
            var value = e.target.value;
        }

        setData(name,value);
    }

    const handleNotification = async (e) => {

        e.preventDefault();

        if(
            (!data?.title || data.title.trim().length === 0) && 
            (!data.message || data.message.trim().length === 0)
        ){
            setToastErrorMsg(t('user.notifications.empty'));
            setToastMsg('');
            setOpenToast(true);
        }
        else{
            axios.post(route('send.notification'),data)
            .then(function (response){            
                
                if(response.data.result){
                    setToastMsg(t('user.notifications.success'));
                    setToastErrorMsg('');
                    setOpenToast(true);
                    //reset();
                    setData({...data,title:'',message:''});          
                }
                else{
                    setToastErrorMsg(t('user.notifications.error'));
                    setToastMsg('');
                    setOpenToast(true);
                }                
            })
            .catch(function (error){
                setToastErrorMsg(t('user.notifications.error'));
                setToastMsg('');
                setOpenToast(true);
            });
        }
    }

    const [ toastMsg, setToastMsg ] = useState('');
    const [ toastErrorMsg, setToastErrorMsg ] = useState('');
    const [ openToast, setOpenToast ] = useState(false);

    const [ valueUser, setValueUser ] = useState(null);
    const [ valuesUsers, setValuesUsers ] = useState([]);

     // to autocomplete when typing  
    const [ inputValueUser, setInputValueUser] = useState('');

    const handleValueUser = (newValue) => {

        var newValuesUsers = [...valuesUsers,newValue];
        setValuesUsers(newValuesUsers);

        // add to data
        setData('users',newValuesUsers);

        // remove from options to select
        setUsersFormatted(usersFormatted.filter((v) => v.value !== newValue.value));

        setValueUser(null);
        setInputValueUser('')
    }

    const handleInputValueUser = (newValue) => {        
        setInputValueUser(newValue);
    }

    const handleValueDelete = (item) => {

        var newValuesUsers = valuesUsers.filter((v) => v.value !== item.value);
        setValuesUsers(newValuesUsers);

        // remove from data
        setData('users',newValuesUsers);

        // add to options to select

        // order the list again
        var orderUsers = [...usersFormatted,item];
        orderUsers.sort(getComparator('asc','label',''));
        setUsersFormatted(orderUsers);
        
        //setUsersFormatted([...usersFormatted,item]);
    };

    const handleEnter = (e) => {
        
        if(e.keyCode === 13){ // key === 'Enter'
            
            // check if value on list of options and add it
            var label = e.target.value;
            var included = false;
            
            usersFormatted.map((val,index) => {
                if(val.label === label){
                    included = val;
                    return;
                }               
            });

            if(included){
                handleValueUser(included);
            }
        }
    };

    return (
        <>        
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={toastMsg}
            error={toastErrorMsg}
        />
        <div className='settings-div-box'>
            <form onSubmit={handleNotification}>
                {/*
                <div className='mt-2'>                    
                    <Switch
                        name="peopleAll"                       
                        checked={data?.peopleAll}
                        onChange={handleInput}
                        label={t('user.notifications.form.peopleAll')}
                    />                    
                </div>
                */}
                {
                    !data?.peopleAll ?
                        <div className='mt-2'>                    
                            <Switch
                                name="usersAll"                       
                                checked={data?.usersAll}
                                onChange={handleInput}
                                label={t('user.notifications.form.usersAll')}
                            />                    
                        </div>
                    :
                        ''
                }
                {
                    (!data?.peopleAll && !data?.usersAll) ?
                        <div className='mt-2'>
                            <InputSelect                        
                                name="users"                        
                                value={valueUser}
                                values={valuesUsers}
                                onChange={(e,value) => handleValueUser(value)}
                                inputValue={inputValueUser}
                                onInputChange={(e,value) => handleInputValueUser(value)}
                                handleValueDelete={handleValueDelete}
                                onKeyUp={handleEnter}
                                options={usersFormatted}
                                placeholder={t('user.notifications.form.users')}
                                error=''
                                multiple                            
                            />
                        </div>
                    :
                        ''
                }
                <div className='mt-2'>
                    <InputSelect                        
                        name="type"                        
                        value={data?.type}
                        onChange={handleInput}                        
                        options={notifications}
                        placeholder={t('user.notifications.form.type')}
                        error=''                        
                    />
                </div>
                <div className='mt-2'>
                    <Input                      
                        name="title"
                        type="title"
                        value={data?.title}                      
                        placeholder={t('user.notifications.form.title')}
                        onChange={handleInput}
                        error=''
                    />
                </div>
                <div className='mt-2'>
                    <Input                      
                        name="message"
                        type="message"
                        value={data?.message}                      
                        placeholder={t('user.notifications.form.message')}
                        onChange={handleInput}
                        error=''
                    />
                </div>
                <div className='mt-2 text-center'>
                    <button 
                        className='notifications-button mb-2' 
                        onClick={handleNotification}
                    >
                        {t('user.notifications.button')}
                    </button>
                </div>
            </form>
        </div>
        </>
    );
}
