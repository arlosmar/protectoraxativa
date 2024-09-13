import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { now } from "@/Utils/Format";
import { useRef, useEffect } from 'react';

export default function InputDate({
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
    format
}){

    if(!defaultValue){
        var def = now();
    }
    else{
        var def = defaultValue;
    }

    if(!format){
        var formatString = "DD-MM-YYYY";
    }
    else{
        var formatString = format;
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
            <DatePicker   
                id={id}
                name={name}    
                ref={input}                      
                defaultValue={def}
                value={value}
                onChange={onChange}
                format={formatString}
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