import { useState, useEffect, lazy, Suspense } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Pagination from '@/Components/Pagination';
import ItemsPerPage from '@/Components/ItemsPerPage';
import { itemsPerPageList } from "@/Utils/Variables";

//import PersonModal from "@/Modals/PersonModal";
//import PersonEditModal from "@/Modals/PersonEditModal";
//import FilterPeople from '@/Pages/People/FilterPeople';
const PersonModal = lazy(() => import("@/Modals/PersonModal"));
const PersonEditModal = lazy(() => import("@/Modals/PersonEditModal"));
const FilterPeople = lazy(() => import("@/Pages/People/FilterPeople"));

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import visuallyHidden from '@mui/utils/visuallyHidden';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import { getParameter } from "@/Utils/Variables";

import { getComparator } from "@/Utils/Format";

import { csv } from "@/Utils/Export";

import ButtonsActions from '@/Components/ButtonsActions';
import { useForm } from '@inertiajs/react';

export default function List({t,origin,people,setPeople,imagesPaths,
    loading,page,internal,setInternal,baseUrl,options}){

    const [ itemsPerPage, setItemsPerPage ] = useState(itemsPerPageList(origin));

    const [ filterUsed, setFilterUsed ] = useState(false);

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
    const [ parameter, setParameter ] = useState(parseInt(getParameter('view')));

    var parameterPos = false;
    if(parameter && filteredPeople && filteredPeople.length > 0){

        parameterPos = filteredPeople.sort(getComparator(order, orderBy, origin)).findIndex(item => item?.id === parameter);

        // add 1 because pos 0 means element 1
        if(parameterPos !== -1){
            parameterPos++;
        }
        else{
            parameterPos = false; // we can use 0
        }
    }

    const [ length, setLength ] = useState(filteredPeople && filteredPeople.length ? filteredPeople.length : 0);
    const [ pages, setPages ] = useState(Math.ceil(length/itemsPerPage));

    const [ pageCurrent, setPageCurrent ] = useState(parameterPos ? Math.min(Math.ceil(parameterPos/itemsPerPage),pages) : page ? Math.min(page,pages) : 1);

    // check if initial page on the url we are not out of the limits
    const [ from, setFrom ] = useState((pageCurrent-1)*itemsPerPage);
    
    // not necessary to make the min because slice doesn't fail if out of array
    // and like this when adding element it appers on the list
    const [ to, setTo ] = useState((pageCurrent*itemsPerPage)-1);
    //const [ to, setTo ] = useState(Math.min((pageCurrent*itemsPerPage)-1/*,length-1));

    const setValues = (list) => {
        
        var newLength = list && list.length ? list.length : 0;
        setLength(newLength);
        var newPages = Math.ceil(newLength/itemsPerPage);
        setPages(newPages);  

        // show initial value
        parameterPos = false;
        if(parameter && filteredPeople && filteredPeople.length > 0){
            
            var itemsArray = filteredPeople.sort(getComparator(order, orderBy, origin));
            parameterPos = itemsArray.findIndex(item => item?.id === parameter);
            
            // add 1 because pos 0 means element 1
            if(parameterPos !== -1){
                parameterPos++;
                handleInfo(itemsArray[parameterPos-1],parameterPos-1); 
            }
            else{
                parameterPos = false; // we can use 0
            }

            // remove parameter to avoid doing this every time we change a page or items per page
            setParameter(null);
        }      
        
        setPageCurrent(parameterPos ? Math.min(Math.ceil(parameterPos/itemsPerPage),newPages) : page ? Math.min(page,newPages) : 1);
    }

    // when filtering
    useEffect(() => {        
        setValues(filteredPeople);
    },[filteredPeople]);

    // when loading people each time when clicking the tab
    useEffect(() => {

        // check the change is not because of adding/editing/removing items
        if(!internal){
            setFilteredPeople(people);
            // not necessary because it calls the useEffect above
            //setValues(people);
        }
    },[people]);

    useEffect(() => {
        setFrom((pageCurrent-1)*itemsPerPage);

        // not necessary to make the min because slice doesn't fail if out of array
        // and like this when adding element it appers on the list
        setTo((pageCurrent*itemsPerPage)-1);
        //setTo(Math.min((pageCurrent*itemsPerPage)-1/*,length-1));
    },[pageCurrent]);

    useEffect(() => {
        // go back to page 1
        setPageCurrent(1);

        setFrom(0);        
        setTo(itemsPerPage-1);

        // recalculate number of pages
        var newPages = Math.ceil(length/itemsPerPage);
        setPages(newPages);
    },[itemsPerPage]);

    const handleInfo = (elem,pos) => {           
        setPersonItem(elem);
        setPosition(pos);
        setShowPerson(true);
    };

    const columns = [
        {id:'name',align:'left',text:t('people.record.name'),type:'text'},
        {id:'surname',align:'left',text:t('people.record.surname'),type:'text'},
        {id:'name2',align:'left',text:t('people.record.name2'),type:'text'},
        {id:'surname2',align:'left',text:t('people.record.surname2'),type:'text'},
        {id:'other_people',align:'left',text:t('people.record.others'),type:'text'},
        //{id:'dni',align:'left',text:t('people.record.dni'),type:'text'},
        //{id:'birthdate',align:'left',text:t('people.record.birthdate'),type:'text'},
        {id:'email',align:'left',text:t('people.record.email'),type:'email'},
        {id:'phone',align:'left',text:t('people.record.phone'),type:'phone'},        
        //{id:'dni2',align:'left',text:t('people.record.dni2'),type:'text'},
        //{id:'birthdate2',align:'left',text:t('people.record.birthdate2'),type:'text'},        
        {id:'email2',align:'left',text:t('people.record.email2'),type:'email'},
        {id:'phone2',align:'left',text:t('people.record.phone2'),type:'phone'},
        {id:'address',align:'left',text:t('people.record.address'),type:'text'},
        {id:'address2',align:'left',text:t('people.record.address2'),type:'text'}
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
            backgroundColor: theme.palette.action.hover,//'#FFDEAD'
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
        '&:hover' : {
            backgroundColor: '#FFDEAD !important'
        }
    }));

    const { data, setData, reset } = useForm();

    const resetFields = (e) => {        
        reset();
    }

    const handleCreate = (e) => { 
        resetFields();
        setPersonEditItem(null);   
        setPosition(null); 
        setShowEditPerson(true);   
    }

    const handleExport = (e) => {

        if(filteredPeople && filteredPeople.length > 0){

            //foto,edad,tamaño,raza,fecha entrada,adopción,fecha esterilización,defunción];
            const headerCols = [ 
                {id:'name',text:t('people.record.name'),type:'text'},
                {id:'surname',align:'left',text:t('people.record.surname'),type:'text'},
                {id:'name2',align:'left',text:t('people.record.name2'),type:'text'},
                {id:'surname2',align:'left',text:t('people.record.surname2'),type:'text'},
                {id:'other_people',align:'left',text:t('people.record.others'),type:'text'},
                {id:'dni',align:'left',text:t('people.record.dni'),type:'text'},
                {id:'birthdate',align:'left',text:t('people.record.birthdate'),type:'text'},
                {id:'email',align:'left',text:t('people.record.email'),type:'email'},
                {id:'phone',align:'left',text:t('people.record.phone'),type:'phone'},  
                {id:'address',align:'left',text:t('people.record.address'),type:'text'},      
                {id:'dni2',align:'left',text:t('people.record.dni2'),type:'text'},
                {id:'birthdate2',align:'left',text:t('people.record.birthdate2'),type:'text'},        
                {id:'email2',align:'left',text:t('people.record.email2'),type:'email'},
                {id:'phone2',align:'left',text:t('people.record.phone2'),type:'phone'},                
                {id:'address2',align:'left',text:t('people.record.address2'),type:'text'},
                {id:'description',text:t('people.record.description')},
                {id:'animals_names',text:t('people.record.animals')},
            ];  

            csv('people',t,t('user.people.title'),baseUrl,imagesPaths,headerCols,filteredPeople);
        }
    }

    /*
    <div className='loading mt-8'>
        <CircularProgress sx={{color:"#FF8C00"}}/>
    </div>
    */

    return (
        <>
        <h1 className='title-user-list'>            
            {t('user.people.title')}
            {
                !loading && filteredPeople?.length > 0 && ' ('+filteredPeople?.length+')'                
            }
        </h1>
        {
            !loading &&
            <ButtonsActions
                origin={origin}
                handleCreate={handleCreate}
                handleExport={handleExport}
                handleOpenSearch={handleOpenSearch}
            />
        }
        {
            loading ?
                <Backdrop
                    sx={(theme) => ({ color: '#FF8C00', zIndex: theme.zIndex.drawer + 1 })}
                    open={loading}            
                >
                    <CircularProgress color="warning"/>
                </Backdrop>
            :
                <div className='mt-4'>
                    {
                        showEditPerson &&
                        <Suspense>
                        <PersonEditModal                        
                            t={t}        
                            show={showEditPerson}
                            setShow={setShowEditPerson}  
                            items={filteredPeople}               
                            setItems={setFilteredPeople}
                            item={personEditItem}
                            setItem={setPersonItem}
                            position={position}
                            people={people}
                            setPeople={setPeople}
                            filterUsed={filterUsed}
                            setInternal={setInternal}
                            options={options}
                            data={data}
                            setData={setData}
                        />
                        </Suspense>                        
                    }
                    {
                        openSearch &&
                        <Suspense>
                        <FilterPeople
                            origin={origin}
                            t={t}                        
                            openSearch={openSearch}
                            setOpenSearch={setOpenSearch}
                            originalItems={people}
                            items={filteredPeople}
                            setItems={setFilteredPeople} 
                            filterUsed={filterUsed}
                            setFilterUsed={setFilterUsed}                       
                        />
                        </Suspense>
                    }
                    {
                        filteredPeople && filteredPeople.length > 0 ?
                            <>
                            {
                                showPerson &&
                                <Suspense>
                                <PersonModal
                                    origin={origin}
                                    t={t}
                                    show={showPerson}
                                    setShow={setShowPerson}      
                                    person={personItem}  
                                    imagesPaths={imagesPaths}                                  
                                    setPersonEditItem={setPersonEditItem}
                                    setShowEditPerson={setShowEditPerson}   
                                    items={filteredPeople}               
                                    setItems={setFilteredPeople}  
                                    people={people}                              
                                    setPeople={setPeople}
                                    filterUsed={filterUsed}
                                    setInternal={setInternal}                                
                                    setData={setData}
                                />     
                                </Suspense>
                            }
                            <ItemsPerPage
                                origin={origin}
                                t={t}
                                itemsPerPage={itemsPerPage}
                                setItemsPerPage={setItemsPerPage}                                
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
                                            filteredPeople.sort(getComparator(order, orderBy, origin)).slice(from,to+1).map((item,i) => (

                                                <StyledTableRow
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
                                                                                <Typography noWrap sx={{fontSize: '14px'}}>{item[column?.id]}</Typography>
                                                                            </a>
                                                                        :
                                                                            column?.type === 'email' ?
                                                                                <a href={'mailto:'+item[column?.id]} target='_blank'>
                                                                                    <Typography noWrap sx={{fontSize: '14px'}}>{item[column?.id]}</Typography>
                                                                                </a>
                                                                            :
                                                                                <Typography noWrap sx={{fontSize: '14px'}}>{item[column?.id]}</Typography>
                                                                    : 
                                                                        ''
                                                                }
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
                            />        
                            <ItemsPerPage
                                origin={origin}
                                t={t}
                                itemsPerPage={itemsPerPage}
                                setItemsPerPage={setItemsPerPage}                                
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