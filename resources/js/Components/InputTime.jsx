import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { now } from "@/Utils/Format";
import { useRef, useEffect } from 'react';

export default function InputTime({
    id,
    ref,
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    onChange,
    defaultValue,
    placeholder,
    readOnly,
    disabled,
    error,
    ampm
}){

    if(!defaultValue){
        var def = now();
    }
    else{
        var def = defaultValue;
    }

    if(ref){
        var input = ref;
    }
    else{
        var input = useRef();
    }

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    var classString = '';
    if(!className || className.length === 0){
        classString = 'app-input';
    }
    else{
        classString = className;
    }

    if(disabled){
        classString = classString+' app-input-disabled';
    }

    if(readOnly){
        classString = classString+' app-input-readonly';
    }

    var inputProperties = {className: classString};

    if(readOnly){
        inputProperties.readOnly = readOnly;
    }

    return (  
        <LocalizationProvider dateAdapter={AdapterDayjs}>                    
            <MobileTimePicker 
                id={id}
                name={name}    
                ref={input}                      
                defaultValue={def}
                value={value}
                onChange={onChange} 
                ampm={ampm}
                label={placeholder}
                InputProps={inputProperties}
                required={required}
                disabled={disabled}
                slotProps={{ 
                    textField: { 
                        fullWidth: true,
                        error: error && error.length > 0 ? true : false,
                        helperText: error && error.length > 0 ? error : ''
                    } 
                }}
            />                         
        </LocalizationProvider>
    );
}