import { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';

export default function Select({
    id,
    ref,
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    onChange,
    inputValue,
    onInputChange,
    options,
    placeholder,
    readOnly,
    native,
    disabled,
    error
}){

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

    if(native){
        inputProperties.native = true;   
    }

    return (            
        autoComplete ?
            <Autocomplete
                id={id}
                ref={input}
                name={name}
                value={value}
                inputValue={inputValue}
                onInputChange={onInputChange}
                onChange={onChange}
                disablePortal                        
                options={options}     
                required={required}
                disabled={disabled}   
                InputProps={inputProperties}                
                renderInput={(params) => 
                    <TextField 
                        {...params} 
                        label={placeholder}
                        error={error && error.length > 0 ? true : false}
                        helperText={error && error.length > 0 ? error : ''}
                    />
                }
            />
        :
            <TextField
                select
                id={id}
                ref={input}
                name={name}
                defaultValue={value}
                onChange={onChange}    
                label={placeholder}   
                error={error && error.length > 0 ?true:false}
                helperText={error && error.length > 0 ? error : ''}
                fullWidth
                SelectProps={inputProperties}             
            >
                {
                    options && options.length > 0 && options.map((item,index) => (
                        <MenuItem value={item?.id}>
                            {item?.label}
                        </MenuItem>
                    ))
                }
            </TextField>
    );
}