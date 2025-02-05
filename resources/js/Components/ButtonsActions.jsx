import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import SortIcon from '@mui/icons-material/SwapVert';

import Box from '@mui/material/Box';

export default function ButtonsActions({origin,handleCreate,handleExport,handleOpenSearch,handleSort}){

	const sxIcon = { fontSize: '40px' };

	return (
		<div className='list-icons'>
            {                
                handleCreate &&
                <>
                <IconButton onClick={handleCreate} id='add'>
                    <AddCircleIcon sx={sxIcon}/>
                </IconButton> 
                {
                    (handleExport || handleSort || handleOpenSearch) &&
                    <Box sx={{ flexGrow: 1 }}/>
                }
                </>
            }
            {
                handleExport &&
                <>
                <IconButton onClick={handleExport} id='export'>
                    <DownloadIcon sx={sxIcon}/>
                </IconButton>                          
                {
                    (handleSort || handleOpenSearch) &&
                    <Box sx={{ flexGrow: 1 }}/>
                }
                </>
            }
            {
                handleSort &&
                <>
                <IconButton onClick={handleSort} id='sort'>
                    <SortIcon sx={sxIcon}/>
                </IconButton>                          
                {
                    (handleOpenSearch) &&
                    <Box sx={{ flexGrow: 1 }}/>
                }
                </>
            }
            {
                handleOpenSearch &&
                <IconButton onClick={handleOpenSearch} id='filter'>
                    <FilterListIcon sx={sxIcon}/>
                </IconButton>
            }
        </div>
	)
}
