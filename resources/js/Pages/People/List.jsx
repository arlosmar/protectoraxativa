import { useState, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import Pagination from '@/Components/Pagination';
import { itemsPerPageList } from "@/Utils/Variables";

import PersonModal from "@/Modals/PersonModal";
import PersonEditModal from "@/Modals/PersonEditModal";

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

import FilterPeople from '@/Pages/People/FilterPeople';
import { styled } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';

import { getParameter } from "@/Utils/Variables";

function descendingComparator(a, b, orderBy) {

    var type = '';
    var result = 0; // same

    const nums = [];
    const dates = ['birthdate','birthdate2'];

    var value1 = b[orderBy];
    var value2 = a[orderBy];

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

export default function List({t,origin,people,images_path,loading,page}){

    const [ filteredPeople, setFilteredPeople ] = useState(people);

    const [ openSearch, setOpenSearch ] = useState(false);

    const handleOpenSearch = (e) => {
        setOpenSearch(!openSearch);
    };

    const [ showPerson, setShowPerson ] = useState(false);
    const [ personItem, setPersonItem ] = useState(null);
    const [ position, setPosition ] = useState(null);

    const [ showEditPerson, setShowEditPerson ] = useState(false);
    const [ personEditItem, setPersonEditItem ] = useState(null);

    const [ order, setOrder ] = useState('asc');
    const [ orderBy, setOrderBy ] = useState('name');

    // check if concrete item by parameter. it is the id of the element
    const parameter = parseInt(getParameter('view'));

    var parameterPos = false;
    if(parameter && filteredPeople && filteredPeople.length > 0){

        parameterPos = filteredPeople.sort(getComparator(order, orderBy)).findIndex(item => item?.id === parameter);

        // add 1 because pos 0 means element 1
        if(parameterPos !== -1){
            parameterPos++;
        }
        else{
            parameterPos = false; // we can use 0
        }
    }

    const itemsPerPage = itemsPerPageList();
    const [ length, setLength ] = useState(filteredPeople && filteredPeople.length ? filteredPeople.length : 0);
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
        if(parameter && filteredPeople && filteredPeople.length > 0){
            
            var itemsArray = filteredPeople.sort(getComparator(order, orderBy));
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
        setValues(filteredPeople);
    },[filteredPeople]);

    // when loading animals each time when clicking the tab
    useEffect(() => {
        setFilteredPeople(people);
        // not necessary because it calls the useEffect above
        //setValues(people);
    },[people]);

    useEffect(() => {
        setFrom((pageCurrent-1)*itemsPerPage);
        setTo(Math.min((pageCurrent*itemsPerPage)-1,length-1));
    },[pageCurrent]);

    const handleInfo = (elem,pos) => {           
        setPersonItem(elem);
        setPosition(pos);
        setShowPerson(true);
    };

    const columns = [
        {id:'name',align:'left',text:t('people.record.name'),type:'text'},
        {id:'surname',align:'right',text:t('people.record.surname'),type:'text'},
        {id:'dni',align:'right',text:t('people.record.dni'),type:'text'},
        {id:'birthdate',align:'right',text:t('people.record.birthdate'),type:'text'},
        {id:'email',align:'right',text:t('people.record.email'),type:'email'},
        {id:'phone',align:'right',text:t('people.record.phone'),type:'phone'},
        {id:'address',align:'right',text:t('people.record.address'),type:'text'},
        {id:'name2',align:'left',text:t('people.record.name2'),type:'text'},
        {id:'surname2',align:'right',text:t('people.record.surname2'),type:'text'},
        {id:'dni2',align:'right',text:t('people.record.dni2'),type:'text'},
        {id:'birthdate2',align:'right',text:t('people.record.birthdate2'),type:'text'},
        {id:'email2',align:'right',text:t('people.record.email2'),type:'email'},
        {id:'phone2',align:'right',text:t('people.record.phone2'),type:'phone'},
        {id:'address2',align:'right',text:t('people.record.address2'),type:'text'}
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
        setPersonEditItem(null);   
        setPosition(null); 
        setShowEditPerson(true);   
    }

    return (
        <>
        <h1 className='title-user-list'>            
            <IconButton onClick={handleCreate} id='filter'>
                <AddCircleIcon sx={{ fontSize: '50px' }}/>
            </IconButton>
            <Box sx={{ flexGrow: 1 }}/>
            {t('user.people.title')}
            {
                !loading && filteredPeople?.length > 0 && ' ('+filteredPeople?.length+')'                
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
                    <PersonEditModal                        
                        t={t}        
                        show={showEditPerson}
                        setShow={setShowEditPerson}  
                        items={filteredPeople}               
                        setItems={setFilteredPeople}
                        item={personEditItem}
                        setItem={setPersonItem}
                        position={position}
                    />
                    <FilterPeople
                        origin={origin}
                        t={t}                        
                        openSearch={openSearch}
                        setOpenSearch={setOpenSearch}
                        originalItems={people}
                        items={filteredPeople}
                        setItems={setFilteredPeople}                        
                    />
                    {
                        filteredPeople && filteredPeople.length > 0 ?

                            <>
                            <PersonModal
                                origin={origin}
                                t={t}
                                show={showPerson}
                                setShow={setShowPerson}      
                                person={personItem}  
                                images_path={images_path}    
                                setPersonEditItem={setPersonEditItem}
                                setShowEditPerson={setShowEditPerson}   
                                items={filteredPeople}               
                                setItems={setFilteredPeople}
                                position={position} 
                            />                            
                            <Pagination      
                                origin={origin}                                
                                pages={pages}
                                pageCurrent={pageCurrent}
                                setPageCurrent={setPageCurrent}
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
                                            filteredPeople.sort(getComparator(order, orderBy)).slice(from,to+1).map((item,i) => (

                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleInfo(item,from+i)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {
                                                        columns && columns.length > 0 && columns.map((column,i) => (
                                                            <StyledTableCell align={column?.align}>                                                                
                                                                {
                                                                    item[column?.id] ? 
                                                                        column?.type === 'phone' ?
                                                                            <a href={'tel:'+item[column?.id]} target='_blank'>
                                                                                {item[column?.id]}
                                                                            </a>
                                                                        :
                                                                            column?.type === 'email' ?
                                                                                <a href={'mailto:'+item[column?.id]} target='_blank'>
                                                                                    {item[column?.id]}
                                                                                </a>
                                                                            :
                                                                                item[column?.id] 
                                                                    : 
                                                                        ''
                                                                }
                                                            </StyledTableCell>                                                            
                                                        ))
                                                    }
                                                </TableRow>
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
                            />                            
                            </>
                        :
                            <div className='text-center'>
                                {t('user.people.empty')}
                            </div>
                    }
                </div>
        }
        </>
    )
}