import { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import { inputLabelClasses } from "@mui/material/InputLabel";
//import OutlinedInput from '@mui/material/OutlinedInput';
//import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
//import Box from '@mui/material/Box';
//import { Theme, useTheme } from '@mui/material/styles';
import { getDarkMode } from "@/Utils/Cookies";

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
    error,
    multiple,
    onKeyUp,
    values,
    handleValueDelete
}){

    const darkmode = getDarkMode();

    if(ref){
        var input = ref;
    }
    else{
        var input = useRef(null);
    }

    useEffect(() => {
        if(isFocused && input.current) {
            input.current.focus();
        }
    }, [input]);

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

    var inputLabelProperties = {
        sx: {
            // set the color of the label when not shrinked
            //color: "red",
            [`&.${inputLabelClasses.shrink}`]: {
                // set the color of the label when shrinked (usually when the TextField is focused)
                color: darkmode ? "#FFFFFF" : "#FF8C00"
            }
        }
    };

    /*
    var sx = {        
        "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2e2e2e !important"
        }
    }
    */
    var sx = {};

    /*
    if(autoComplete){
        sx = {           
           "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
                backgroundColor: darkmode ? "rgb(115 115 115)" : "#FFFFFF"
            },
           "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']": {
                backgroundColor: darkmode ? "rgb(115 115 115)" : "#FFFFFF"
              },
           "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true'] .Mui-focused": {
              backgroundColor: darkmode ? "rgb(115 115 115)" : "#FFFFFF"
           }
        };
    }
    */

    var sxChip = {
        padding: '0px 2px 0px 0px', 
        margin: '2px'
    };

    if(darkmode){
        sxChip = {
            ...sxChip,
            color: '#FFFFFF',
            '& .MuiChip-deleteIcon' : {
                color: '#FFFFFF'
            }
        };
    }

    return (            
        autoComplete ?
            <Autocomplete
                sx={sx}
                id={id}                
                name={name}
                value={value}
                inputValue={inputValue}
                onInputChange={onInputChange}
                onChange={onChange}
                disablePortal
                options={options}
                required={required}
                disabled={disabled}
                renderInput={(params) => 
                    <TextField 
                        {...params}                         
                        InputProps={{
                            ...params.InputProps,
                            ...inputProperties                            
                        }}    
                        InputLabelProps={inputLabelProperties}
                        inputRef={ref}
                        label={placeholder}
                        error={error && error.length > 0 ? true : false}
                        helperText={error && error.length > 0 ? error : ''}
                    />
                }
            />
        :
            multiple ?
                <Autocomplete
                    sx={sx}
                    id={id}                
                    name={name}
                    value={value}
                    values={values}
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
                            inputRef={ref}
                            label={placeholder}
                            InputLabelProps={inputLabelProperties}
                            error={error && error.length > 0 ? true : false}
                            helperText={error && error.length > 0 ? error : ''}
                            onKeyUp={onKeyUp}
                            InputProps={{
                                ...params.InputProps,
                                ...inputProperties,
                                startAdornment: (
                                    values.length > 0 && values.map((item) => (                                
                                        <Chip
                                            sx={sxChip}
                                            key={item.value}
                                            label={item.label}
                                            variant="outlined"
                                            onDelete={() => {
                                                handleValueDelete(item);
                                            }}
                                        />                                
                                    ))
                                                                        
                                )/*,
                                endAdornment: (
                                    <React.Fragment>
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                )*/
                            }}
                        />
                    }
                />                
            :
                <TextField
                    sx={sx}
                    select
                    id={id}
                    inputRef={input}
                    name={name}
                    defaultValue={value}
                    onChange={onChange}    
                    label={placeholder}   
                    error={error && error.length > 0 ?true:false}
                    helperText={error && error.length > 0 ? error : ''}
                    fullWidth
                    inputProps={inputProperties}
                    InputLabelProps={inputLabelProperties}
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