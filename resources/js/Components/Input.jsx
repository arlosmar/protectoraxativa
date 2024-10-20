import { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function Input({
    type = 'text',
    ref,
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    onChange,
    placeholder,
    readOnly,
    disabled,
    error,
    multiline,
    rows,
    maxRows,
    maxLength,
    handleKeyDown,
    handleFileRemove,
    accept
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

    if(maxLength){
        inputProperties.maxLength = maxLength;
    }

    if(accept){
        inputProperties.accept = accept;
    }

    var inputLabelProperties = {shrink: true};

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (            
        type === 'integer' ?
            <TextField 
                variant="outlined"
                ref={input}
                name={name}
                type="number"
                step="1"
                min="0"                           
                autoComplete={autoComplete}
                placeholder={placeholder}
                label={placeholder}                             
                required={required}
                disabled={disabled}
                defaultValue={value}
                value={value}
                error={error && error.length > 0 ?true:false}
                helperText={error && error.length > 0 ? error : ''}
                inputProps={inputProperties}
                onChange={onChange} 
                onKeyDown={handleKeyDown}  
                fullWidth                     
            /> 
        :
            type === 'float' ?
                <TextField 
                    variant="outlined"
                    ref={input}
                    name={name}
                    inputProps={{ maxLength: 2 }}
                    type="number"
                    step="0.01"
                    min="0"                           
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    label={placeholder}                             
                    required={required}
                    disabled={disabled}
                    defaultValue={value}
                    value={value}
                    error={error && error.length > 0 ?true:false}
                    helperText={error && error.length > 0 ? error : ''}
                    //inputProps={inputProperties}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    fullWidth
                />                        
            :
                type === 'password' ?

                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">{placeholder}</InputLabel>
                        <OutlinedInput                               
                            ref={input}
                            name={name}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete={autoComplete}
                            placeholder={placeholder}
                            label={placeholder}       
                            required={required}
                            disabled={disabled}
                            defaultValue={value} 
                            value={value}                                                       
                            error={error && error.length > 0 ?true:false}
                            helperText={error && error.length > 0 ? error : ''}
                            inputProps={inputProperties}
                            onChange={onChange}
                            fullWidth
                            onKeyDown={handleKeyDown}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }

                        />
                        {error && error.length > 0 && (
                            <FormHelperText error id="accountId-error">
                              {error}
                            </FormHelperText>
                        )}
                    </FormControl>
                :               
                    type === 'file' ?
                        <OutlinedInput                               
                            ref={input}
                            name={name}
                            type={type}
                            autoComplete={autoComplete}
                            //placeholder={placeholder}
                            //label={placeholder}       
                            required={required}
                            disabled={disabled}
                            error={error && error.length > 0 ?true:false}
                            helperText={error && error.length > 0 ? error : ''}
                            inputProps={inputProperties}
                            onChange={onChange}
                            fullWidth                            
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={(event) => handleFileRemove(name)}                                        
                                        edge="end"
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }

                        />                       
                    :
                        multiline ?
                            <TextField 
                                variant="outlined"
                                ref={input}
                                name={name}
                                type={type}                            
                                autoComplete={autoComplete}
                                placeholder={placeholder}
                                label={placeholder}       
                                required={required}
                                disabled={disabled}
                                defaultValue={value} 
                                value={value}                                                       
                                error={error && error.length > 0 ?true:false}
                                helperText={error && error.length > 0 ? error : ''}
                                inputProps={inputProperties}
                                onChange={onChange}
                                multiline
                                rows={rows}
                                maxRows={maxRows}
                                fullWidth                            
                            />
                        :
                            <TextField 
                                variant="outlined"
                                ref={input}
                                name={name}
                                type={type}                            
                                autoComplete={autoComplete}
                                placeholder={placeholder}
                                label={placeholder}     
                                InputLabelProps={type === 'date' ? inputLabelProperties : ''}  
                                required={required}
                                disabled={disabled}
                                defaultValue={value}  
                                value={value}                                                        
                                error={error && error.length > 0 ?true:false}
                                helperText={error && error.length > 0 ? error : ''}
                                inputProps={inputProperties}
                                onChange={onChange}
                                onKeyDown={handleKeyDown}
                                fullWidth
                            />
    );
}
