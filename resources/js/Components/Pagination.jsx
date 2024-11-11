import PaginationElement from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getDarkMode } from "@/Utils/Cookies";
//import { makeStyles } from '@mui/styles';

export default function Pagination({origin,pages,pageCurrent,
    setPageCurrent,subsection,
    showFirstButton,showLastButton
}){
  
    if(pages > 1){

        const darkmode = getDarkMode();

        /*
        const useStyles = makeStyles({

            pages: {
                "& .MuiPaginationItem-root.Mui-selected": {
                    border: "2px solid #FF8C00"
                }
            },
            root: {
                '& .Mui-selected': {
                    width: '5px'
                    //height:'any size you need'
                },
            }
        });
        */

        //const classes = useStyles();

        var sx = {                        
            '& .Mui-selected': {
                width: '5px' 
            }
        };

        if(darkmode){
            sx = {
                ...sx,
                "& .MuiPaginationItem-root.MuiButtonBase-root" : {
                    backgroundColor: '#FFFFFF'
                },
                "& .MuiPaginationItem-root.MuiButtonBase-root:hover" : {
                    backgroundColor: '#FF8C00'
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                    border: "2px solid #FF8C00",
                    backgroundColor: '#FF8C00',
                    color: "#FFFFFF"
                },
                "& .MuiPaginationItem-ellipsis": {
                    color: "#FFFFFF"
                }
            };
        }
        else{
            sx = {
                ...sx,
                "& .MuiPaginationItem-root.Mui-selected": {
                    border: "2px solid #FF8C00"
                }
            };
        }

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
                    
                    routePath  = 'admin.animals';

                    switch(subsection){

                        case 'adopted':
                            path =  '/adopted/'; 
                            break;

                        case 'heaven':
                            path =  '/heaven/'; 
                            break;

                        case 'adopt':
                            path =  '/adopt/'; 
                            break;
                    }
                	            	
                	break;

                case 'user-people':
                	routePath  = 'admin.people';
                	path =	'/'; 
                	break;

                case 'user-news':
                    routePath  = 'admin.news';
                    path =  '/'; 
                    break;

                case 'news':
                    routePath  = 'news';
                    path =  '/'; 
                    break;
            }

            // change url on the browser
            var url = route(routePath)+path+value;
            window.history.pushState({path:url},'',url);
        };

    	return (
    		 <Stack spacing={2} className='pagination-div'>
                <PaginationElement 
                    //className={`${classes.pages} pagination`}
                    sx={sx}
                    className='pagination'
                    variant="outlined"
                    count={pages}
                    showFirstButton={showFirstButton ? true : false}
                    showLastButton={showLastButton ? true : false}
                    page={pageCurrent} 
                    onChange={handleChange}         
                    siblingCount={0}
                    //boundaryCount={1}
                />
            </Stack>
    	)
    }
    else{
        return (<></>)
    }
}