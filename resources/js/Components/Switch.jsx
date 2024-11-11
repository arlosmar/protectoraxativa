import SwitchElement from '@mui/material/Switch';
//import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getDarkMode } from "@/Utils/Cookies";

//https://mui.com/material-ui/react-switch/
export default function Switch({
	id,
	name,
	checked,
	onChange,
	value,
	defaultChecked,
	disabled,
	required,
	label,
	size,
	color
}){

	const darkmode = getDarkMode();

	var colorSwitch = 'warning';
	if(color){
		colorSwitch = color;
	}

	var sx = {};
	if(darkmode){
		sx = {
			"& .MuiSwitch-track": {
        		backgroundColor: '#FFFFFF'//'rgb(115 115 115)'
        	}
    	};
    }
    
    return (
    	<div className='ml-1'>
  			<FormControlLabel   				
  				control={
  					<SwitchElement
  						sx={sx} 
  						id={id}
  						name={name}
  						checked={checked}
  						onChange={onChange}
  						value={value}  						
  						defaultChecked={defaultChecked}
  						size={size}
  						color={colorSwitch}  						
  					/>
  				}
  				label={label}
  				disabled={disabled}
  				required={required}
  			/>
		</div>
    );
}
