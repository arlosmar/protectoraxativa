import { useState, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import Pagination from '@/Components/Pagination';
import { itemsPerPageList } from "@/Utils/Variables";

import AnimalModal from "@/Modals/AnimalModal";
import AnimalEditModal from "@/Modals/AnimalEditModal";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

import FilterAnimals from '@/Pages/Animals/FilterAnimals';
import { styled } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';

import { getParameter } from "@/Utils/Variables";

function descendingComparator(a, b, orderBy) {

    var type = '';
    var result = 0; // same

    const nums = ['code','weight'];
    const dates = ['birthdate','deathdate'];

    var value1 = b[orderBy];
    var value2 = a[orderBy];

    // code, weight
    if(nums.includes(orderBy)){
        type = 'numerical';
    }
    else{
        // birhtdate, deathdate
        if(dates.includes(orderBy)){
            type = 'date';
        }
        else{
            type = 'string';
        }
    }

    // numbers
    switch(type){

        case 'numerical':

            // if empty value, fill in with -1 to be the 1st
            // we don't have negative numbers on the list, so no problem
            var isNotValid1 = !value1 || value1 == '';
            var isNotValid2 = !value2 || value2 == '';

            if(isNotValid1){
                value1 = -1;
            }
            
            if(isNotValid2){
                value2 = -1;
            }

            if(value1 < value2){
                result = -1;
            }
            else{
                if(value1 > value2){
                    result = 1;
                }
                else{
                    result = 0;
                }
            }
        
            break;
        
        case 'date':

            var date1 = new Date(value1).getTime();
            var date2 = new Date(value2).getTime();

            var isNotValid1 = !date1;
            var isNotValid2 = !date2;

            if(isNotValid1){

                if(isNotValid2){
                    result = 0; // same
                }
                else{
                    result = -1; // b < a 
                }
            }
            else{
                // b with value but a empty
                if(isNotValid2){
                    result = 1; // b > a 
                }
                else{
                    if(date1 < date2){
                        result = -1;
                    }
                    else{
                        if(date1 > date2){
                           result = 1;
                        }
                    }
                }
            }            
            break;

        case 'string':        

            var isNotValid1 = !value1 || value1.length === 0;
            var isNotValid2 = !value2 || value2.length === 0;

            if(isNotValid1){

                if(isNotValid2){
                    result = 0; // same
                }
                else{
                    result = -1; // b < a 
                }
            }
            else{
                // b with value but a empty
                if(isNotValid2){
                    result = 1; // b > a 
                }
                else{
                    // 1st < 2nd => -1
                    // 1st > 2nd => 1
                    // otherwise 0
                    var compare = value1.localeCompare(value2);            
                    result = compare;
                }
            }
            break;
    }

    return result;
}


function getComparator(order, orderBy) {
    
    return order === 'desc' ? 
        (a, b) => descendingComparator(a, b, orderBy)
    : 
        (a, b) => -descendingComparator(a, b, orderBy);
}

export default function List({t,origin,animals,images_path,loading,page,options,subsection}){

    const [ filteredAnimals, setFilteredAnimals ] = useState(animals);

    const [ openSearch, setOpenSearch ] = useState(false);

    const handleOpenSearch = (e) => {
        setOpenSearch(!openSearch);
    };

    const [ showAnimal, setShowAnimal ] = useState(false);
    const [ animalItem, setAnimalItem ] = useState(null);
    const [ position, setPosition ] = useState(null);
    
    const [ showEditAnimal, setShowEditAnimal ] = useState(false);
    const [ animalEditItem, setAnimalEditItem ] = useState(null);

    const [ order, setOrder ] = useState('asc');
    const [ orderBy, setOrderBy ] = useState('code');

    // check if concrete item by parameter. it is the id of the element
    const parameter = parseInt(getParameter('view'));

    var parameterPos = false;
    if(parameter && filteredAnimals && filteredAnimals.length > 0){

        parameterPos = filteredAnimals.sort(getComparator(order, orderBy)).findIndex(item => item?.id === parameter);

        // add 1 because pos 0 means element 1
        if(parameterPos !== -1){
            parameterPos++;
        }
        else{
            parameterPos = false; // we can use 0
        }
    }

    const itemsPerPage = itemsPerPageList();
    const [ length, setLength ] = useState(filteredAnimals && filteredAnimals.length ? filteredAnimals.length : 0);
    const [ pages, setPages ] = useState(Math.ceil(length/itemsPerPage));

    const [ pageCurrent, setPageCurrent ] = useState(parameterPos ? Math.min(Math.ceil(parameterPos/itemsPerPage),pages) : page ? Math.min(page,pages) : 1);

    // check if initial page on the url we are not out of the limits
    const [ from, setFrom ] = useState((pageCurrent-1)*itemsPerPage);
    const [ to, setTo ] = useState(Math.min((pageCurrent*itemsPerPage)-1,length-1));

    const setValues = (list) => {

        var newLength = list && list.length ? list.length : 0;
        setLength(newLength);
        var newPages = Math.ceil(newLength/itemsPerPage);
        setPages(newPages);
        
        // show initial value
        parameterPos = false;
        if(parameter && filteredAnimals && filteredAnimals.length > 0){
            
            var itemsArray = filteredAnimals.sort(getComparator(order, orderBy));
            parameterPos = itemsArray.findIndex(item => item?.id === parameter);
            // add 1 because pos 0 means element 1
            if(parameterPos !== -1){
                parameterPos++;
                handleInfo(itemsArray[parameterPos-1],parameterPos-1); 
            }
            else{
                parameterPos = false; // we can use 0
            }
        }    

        setPageCurrent(parameterPos ? Math.min(Math.ceil(parameterPos/itemsPerPage),newPages) : page ? Math.min(page,newPages) : 1);
    }

    // when filtering
    useEffect(() => {
        setValues(filteredAnimals);
    },[filteredAnimals]);

    // when loading animals each time when clicking the tab
    useEffect(() => {
        setFilteredAnimals(animals);        
        // not necessary because it calls the useEffect above
        //setValues(animals);
    },[animals]);    

    useEffect(() => {
        setFrom((pageCurrent-1)*itemsPerPage);
        setTo(Math.min((pageCurrent*itemsPerPage)-1,length-1));
    },[pageCurrent]);

    const handleInfo = (elem,pos) => {
        setAnimalItem(elem);
        setPosition(pos);
        setShowAnimal(true);
    };

    const columns = [
        {id:'code',align:'left',text:t('animals.record.Code')},
        {id:'name',align:'right',text:t('animals.record.Name')},
        {id:'status',align:'right',text:t('animals.record.Status.title')},
        {id:'sponsor',align:'right',text:t('animals.record.Sponsored.title')},
        {id:'type',align:'right',text:t('animals.record.Type.title')},
        {id:'breed',align:'right',text:t('animals.record.Breed.title')},
        {id:'gender',align:'right',text:t('animals.record.Gender.title')},
        {id:'size',align:'right',text:t('animals.record.Size.title')},
        {id:'weight',align:'right',text:t('animals.record.Weight')+' (Kg)'},
        {id:'age',align:'right',text:t('animals.record.Age.title')},
        {id:'birthdate',align:'right',text:t('animals.record.Birthdate')},
        {id:'deathdate',align:'right',text:t('animals.record.Deathdate')}
    ];

    const handleRequestSort = (property) => {

        // if clicking on the already ordered column
        var newOrder = 'asc';
        if(orderBy === property){

            // if order is asc
            if(order === 'asc'){
                newOrder = 'desc';
            }
            else{
                // if order is desc
                //setOrder('asc');
            }
        }
        else{
            // if different column, 'asc' by default
            //setOrder('asc');
        }
        
        //const isAsc = orderBy === property && order === 'asc';
        //setOrder(isAsc ? 'desc' : 'asc');

        setOrder(newOrder);
        setOrderBy(property);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            //backgroundColor: theme.palette.common.black,
            //color: theme.palette.common.white,
            backgroundColor: '#ffe0b5'
        }/*,
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },*/
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handleCreate = (e) => { 
        setAnimalEditItem(null);   
        setPosition(null); 
        setShowEditAnimal(true);   
    }

	return (
        <>
        <h1 className='title-user-list'>            
            <IconButton onClick={handleCreate} id='filter'>
                <AddCircleIcon sx={{ fontSize: '50px' }}/>
            </IconButton>
            <Box sx={{ flexGrow: 1 }}/>
            {t('user.animals.'+subsection+'.title')}
            {
                !loading && filteredAnimals?.length > 0 && ' ('+filteredAnimals?.length+')'                
            }            
            <Box sx={{ flexGrow: 1 }}/>
            <IconButton onClick={handleOpenSearch} id='filter'>
                <FilterListIcon sx={{ fontSize: '50px' }}/>
            </IconButton>
        </h1>
        {
            loading ?
                <div className='text-center'>
                    <CircularProgress sx={{color:"#FF8C00"}}/>
                </div>
            :
                <div className='mt-4'>
                    <AnimalEditModal   
                        origin={origin}                     
                        t={t}        
                        show={showEditAnimal}
                        setShow={setShowEditAnimal}  
                        items={filteredAnimals}               
                        setItems={setFilteredAnimals}
                        item={animalEditItem}
                        setItem={setAnimalItem}
                        position={position}
                        options={options}
                        subsection={subsection}
                        images_path={images_path}
                    />
                    <FilterAnimals
                        origin={origin}
                        t={t}                                
                        openSearch={openSearch}                    
                        setOpenSearch={setOpenSearch}
                        originalItems={animals}
                        items={filteredAnimals}
                        setItems={setFilteredAnimals}
                        options={options}
                    />
                    {
                        filteredAnimals && filteredAnimals.length > 0 ?

                            <>                            
                            <AnimalModal
                                origin={origin}
                                t={t}
                                show={showAnimal}
                                setShow={setShowAnimal}      
                                animal={animalItem}
                                images_path={images_path}
                                setAnimalEditItem={setAnimalEditItem}
                                setShowEditAnimal={setShowEditAnimal}
                                items={filteredAnimals}               
                                setItems={setFilteredAnimals}
                            />                         
                            <Pagination      
                                origin={origin}                                
                                pages={pages}
                                pageCurrent={pageCurrent}
                                setPageCurrent={setPageCurrent}
                                subsection={subsection}
                            />  
                            <TableContainer component={Paper}>
                                <Table size="small" stickyHeader>
                                    <TableHead>
                                        <TableRow>    
                                            {
                                                columns && columns.length > 0 && columns.map((item,i) => (
                                                <StyledTableCell
                                                    key={item?.id}
                                                    align='center'
                                                    sortDirection={orderBy === item?.id ? order : false}
                                                    sx={{zIndex:0}}
                                                >
                                                    <TableSortLabel
                                                        active={orderBy === item?.id}
                                                        direction={orderBy === item?.id ? order : 'asc'}
                                                        onClick={(event) => handleRequestSort(item?.id)}
                                                    >
                                                        {item?.text}
                                                        {
                                                            orderBy === item?.id ? 
                                                                (
                                                                    <Box component="span" sx={visuallyHidden}>
                                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                                    </Box>
                                                                ) 
                                                            : 
                                                                null
                                                        }
                                                    </TableSortLabel>
                                                </StyledTableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {                                            
                                            filteredAnimals.sort(getComparator(order, orderBy)).slice(from,to+1).map((item,i) => (
                                                <StyledTableRow
                                                    hover
                                                    onClick={(event) => handleInfo(item,from+i)}
                                                    sx={{ cursor: 'pointer' }}
                                                >  
                                                    {
                                                        columns && columns.length > 0 && columns.map((column,i) => (
                                                            <StyledTableCell align={column?.align}>
                                                                {item[column?.id]}
                                                            </StyledTableCell>                                                            
                                                        ))
                                                    }
                                                </StyledTableRow>
                                            ))
                                        }                                        
                                    </TableBody>
                                </Table>
                            </TableContainer> 
                            <Pagination      
                                origin={origin}                                
                                pages={pages}
                                pageCurrent={pageCurrent}
                                setPageCurrent={setPageCurrent}
                                subsection={subsection}
                            />                            
                            </>
                        :
                            <div className='text-center'>
                                {t('user.animals.empty')}
                            </div>
                    }
                </div>
        }
        </>
    )
}