import { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyIcon from '@mui/icons-material/ContentCopy';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { inputLabelClasses } from "@mui/material/InputLabel";
import { getDarkMode } from "@/Utils/Cookies";

export default function Input({
    t,
    type = 'text',
    id,
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

    const darkmode = getDarkMode();

    if(ref){
        var input = ref;
    }
    else{
        var input = useRef(null);
    }

    useEffect(() => {
        if(isFocused && input.current){            
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

    if(maxLength){
        inputProperties.maxLength = maxLength;
    }

    if(accept){
        inputProperties.accept = accept;
    }

    if(type === 'float'){
        inputProperties.maxLength = 2;
    }    
    
    const sxInputLabel = {
        // set the color of the label when not shrinked
        //color: "red",
        [`&.${inputLabelClasses.shrink}`]: {
            // set the color of the label when shrinked (usually when the TextField is focused)
            color: darkmode ? "#FFFFFF" : "#FF8C00"
        }
    };

    const inputLabelProperties = {
        sx: sxInputLabel
    };

    /*
    var inputLabelProperties = {
        style: { color: '#FF8C00'}
    };
    */

    if(type === 'date' || type === 'datetime-local'){
        inputLabelProperties.shrink = true;
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [ copied , setCopied ] = useState('');

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(t('trans.Copied'));
    };
    /*
    var sx = {
        // Root class for the input field
        "& .MuiOutlinedInput-root": {
            // Class for the border around the input field
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2e2e2e",
                //borderWidth: "2px",
            },
        },
        // Class for the label of the input field
        //"& .MuiInputLabel-outlined": {
        //    borderColor: "#2e2e2e"
        //},
        /*
        "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2e2e2e"
        },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },                    
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        },*/
    /*}
    */
    var sx = {};

    if(multiline){
        sx = {
            '& .MuiInputBase-root' : {
                backgroundColor: darkmode ? 'rgb(115 115 115)' : '#FFFFFF'
            }/*,
            '& .MuiOutlinedInput-root:hover' : {
                borderColor: '#FF8C00 !important'
            },
            '& .Mui-focused' : {
                borderColor: '#FF8C00 !important'
            }*/
        }
    }

    if(
        darkmode &&
        (type === 'file' || type === 'copy' || type === 'password')
    ){
        sx.backgroundColor = "rgb(115 115 115)";
    }

    var sxIcon = {};
    if(darkmode){
        sxIcon = {
            color: '#FFFFFF'
        };
    }

    return (            
        type === 'integer' ?
            <TextField 
                sx={sx}
                variant="outlined"
                inputRef={input}
                id={id}
                name={name}
                type="number"
                step="1"
                min="0"                           
                autoComplete={autoComplete}
                placeholder={placeholder}
                label={placeholder} 
                InputLabelProps={inputLabelProperties}
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
                    sx={sx}
                    variant="outlined"
                    inputRef={input}
                    id={id}
                    name={name}                    
                    type="number"
                    step="0.01"
                    min="0"                           
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    label={placeholder}
                    InputLabelProps={inputLabelProperties}                             
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
                type === 'password' ?

                    <FormControl variant="outlined" fullWidth>
                        <InputLabel 
                            htmlFor="outlined-adornment-password"
                            sx={sxInputLabel} 
                        >
                            {placeholder}
                        </InputLabel>
                        <OutlinedInput   
                            sx={sx}                            
                            inputRef={input}
                            id={id}
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
                                        {showPassword ? <VisibilityOff sx={sxIcon}/> : <Visibility sx={sxIcon}/>}
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
                    type === 'copy' ?
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel 
                                htmlFor="outlined-adornment-password"
                                sx={sxInputLabel}
                            >
                                {placeholder}
                            </InputLabel>
                            <OutlinedInput     
                                sx={sx}                          
                                inputRef={input}
                                id={id}
                                name={name}
                                type='text'
                                autoComplete={autoComplete}
                                placeholder={placeholder}
                                label={placeholder}       
                                required={required}
                                disabled={disabled}
                                defaultValue={value} 
                                value={value}                                                       
                                error={copied && copied.length > 0 ? true : false}
                                helperText={copied && copied.length > 0 ? copied : ''}
                                inputProps={inputProperties}
                                onChange={onChange}
                                fullWidth                                
                                onKeyDown={handleKeyDown}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={(event) => handleCopy(value)}                                            
                                            edge="end"
                                        >
                                            <CopyIcon sx={sxIcon}/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {copied && copied.length > 0 && (
                                <FormHelperText error id="">
                                  {copied}
                                </FormHelperText>
                            )}
                        </FormControl>
                    :
                        type === 'file' ?
                            <OutlinedInput  
                                sx={sx}                             
                                inputRef={input}
                                id={id}
                                name={name}
                                type={type}
                                autoComplete={autoComplete}
                                InputLabelProps={inputLabelProperties}
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
                                            <DeleteIcon sx={sxIcon}/>
                                        </IconButton>
                                    </InputAdornment>
                                }

                            />                       
                        :
                            multiline ?
                                <TextField 
                                    sx={sx}
                                    variant="outlined"
                                    inputRef={input}
                                    id={id}
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
                                    InputLabelProps={inputLabelProperties}
                                    onChange={onChange}
                                    multiline
                                    rows={rows}
                                    maxRows={maxRows}
                                    fullWidth                            
                                />
                            :
                                <TextField 
                                    sx={sx}
                                    variant="outlined"
                                    inputRef={input}
                                    id={id}
                                    name={name}
                                    type={type}                            
                                    autoComplete={autoComplete}
                                    placeholder={placeholder}
                                    label={placeholder}     
                                    InputLabelProps={inputLabelProperties}  
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
