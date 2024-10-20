import PaginationElement from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { makeStyles } from '@mui/styles';

export default function Pagination({origin,pages,pageCurrent,setPageCurrent,subsection}){
  
 	const handleChange = (event,value) => {
            
        setPageCurrent(value);

        var path = '';
        var routePath = 'animals';
        
        switch(origin){
            
            case 'adopt':
            	routePath  = 'animals';
                path = '/adopt/animals/';
                break;

            case 'adopted':
            	routePath  = 'animals';
                path = '/adopt/adopted/';
                break;

            case 'heaven':
            	routePath  = 'animals';
                path = '/heaven/animals/';
                break;

            case'sponsor':
            	routePath  = 'animals';
                path = '/sponsor/animals/';
                break;

            case 'sponsored':
            	routePath  = 'animals';
                path = '/sponsor/sponsored/';
                break;

            case 'user-animals':
                
                routePath  = 'user.animals';

                switch(subsection){

                    case 'adopted':
                        path =  '/adopted/'; 
                        break;

                    case 'heaven':
                        path =  '/heaven/'; 
                        break;

                    case 'adopt':
                    default:
                        path =  '/adopt/'; 
                        break;
                }
            	            	
            	break;

            case 'user-people':
            	routePath  = 'user.people';
            	path =	'/'; 
            	break;
        }

        // change url on the browser
        var url = route(routePath)+path+value;
        window.history.pushState({path:url},'',url);
    };

    const useStyles = makeStyles({

        pages: {
            "& .MuiPaginationItem-root.Mui-selected": {
                border: "2px solid #FF8C00"
            }
        },
        root: {
            '& .Mui-selected': {
                width: '5px'/*,
                height:'any size you need',*/
            },
        }
    });
    const classes = useStyles();

	return (
		 <Stack spacing={2} className='pagination-div'>
            <PaginationElement 
                className={`${classes.pages} pagination`}
                variant="outlined"
                count={pages}
                showFirstButton 
                showLastButton
                page={pageCurrent} 
                onChange={handleChange}              
            />
        </Stack>
	)
}