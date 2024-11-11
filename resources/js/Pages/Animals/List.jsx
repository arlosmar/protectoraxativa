import { useState, useEffect, useRef } from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import Pagination from '@/Components/Pagination';
import ItemsPerPage from '@/Components/ItemsPerPage';
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

import visuallyHidden from '@mui/utils/visuallyHidden';
import Typography from '@mui/material/Typography';

import FilterAnimals from '@/Pages/Animals/FilterAnimals';
import { styled } from '@mui/material/styles';

import { getParameter } from "@/Utils/Variables";
import { date2db } from "@/Utils/Format";
import { csv } from "@/Utils/Export";

import { getComparator } from "@/Utils/Format";

import ButtonsActions from '@/Components/ButtonsActions';

import { useForm } from '@inertiajs/react';

export default function List({t,origin,animals,setAnimals,baseUrl,
    imagesPaths,loading,page,options,subsection,internal,setInternal}){

    const [ itemsPerPage, setItemsPerPage ] = useState(itemsPerPageList(origin));

    const [ filterUsed, setFilterUsed ] = useState(false);

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
    const [ orderBy, setOrderBy ] = useState('name');

    // check if concrete item by parameter. it is the id of the element
    const [ parameter, setParameter ] = useState(parseInt(getParameter('view')));

    var parameterPos = false;
    if(parameter && filteredAnimals && filteredAnimals.length > 0){

        parameterPos = filteredAnimals.sort(getComparator(order, orderBy, origin)).findIndex(item => item?.id === parameter);

        // add 1 because pos 0 means element 1
        if(parameterPos !== -1){
            parameterPos++;
        }
        else{
            parameterPos = false; // we can use 0
        }
    }

    const [ length, setLength ] = useState(filteredAnimals && filteredAnimals.length ? filteredAnimals.length : 0);
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
        if(parameter && filteredAnimals && filteredAnimals.length > 0){
            
            var itemsArray = filteredAnimals.sort(getComparator(order, orderBy, origin));
            parameterPos = itemsArray.findIndex(item => item?.id === parameter);
            // add 1 because pos 0 means element 1
            if(parameterPos !== -1){
                parameterPos++;
                handleInfo(itemsArray[parameterPos-1],parameterPos-1); 
            }
            else{
                parameterPos = false; // we can use 0 instead of false
            }

            // remove parameter to avoid doing this every time we change a page or items per page
            setParameter(null);
        }    

        setPageCurrent(parameterPos ? Math.min(Math.ceil(parameterPos/itemsPerPage),newPages) : page ? Math.min(page,newPages) : 1);
    }

    // when filtering
    useEffect(() => {
        setValues(filteredAnimals);
    },[filteredAnimals]);

    // when loading animals each time when clicking the tab
    useEffect(() => {

        // check the change is not because of adding/editing/removing items
        if(!internal){
            setFilteredAnimals(animals); 
            // not necessary because it calls the useEffect above
            //setValues(animals);
        }
    },[animals]);    

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
        setAnimalItem(elem);
        setPosition(pos);
        setShowAnimal(true);
    };

    const columns = [        
        {id:'code',align:'left',text:t('animals.record.Code')},
        {id:'name',align:'left',text:t('animals.record.Name')},
        {id:'status',align:'left',text:t('animals.record.Status.title')},
        {id:'sponsor',align:'left',text:t('animals.record.Sponsored.title')},
        {id:'type',align:'left',text:t('animals.record.Type.title')},
        {id:'breed',align:'left',text:t('animals.record.Breed.title')},
        {id:'gender',align:'left',text:t('animals.record.Gender.title')},
        {id:'size',align:'left',text:t('animals.record.Size.title')},
        {id:'weight',align:'left',text:t('animals.record.Weight')+' (Kg)'},
        {id:'age',align:'left',text:t('animals.record.Age.title')},
        {id:'birthdate',align:'left',text:t('animals.record.Birthdate')},
        {id:'deathdate',align:'left',text:t('animals.record.Deathdate')},
        {id:'updated_at',align:'left',text:t('animals.record.Updated')}
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
        setAnimalEditItem(null);   
        setPosition(null); 
        setShowEditAnimal(true);   
    } 
    
    const handleExport = (e) => {

        if(filteredAnimals && filteredAnimals.length > 0){

            //foto,edad,tamaño,raza,fecha entrada,adopción,fecha esterilización,defunción];
            const headerCols = [                       
                {id:'code',text:t('animals.record.Code')},
                {id:'name',text:t('animals.record.Name')},
                {id:'status',text:t('animals.record.Status.title')},
                {id:'sponsor',text:t('animals.record.Sponsored.title')},
                {id:'type',text:t('animals.record.Type.title')},
                {id:'breed',text:t('animals.record.Breed.title')},
                {id:'gender',text:t('animals.record.Gender.title')},
                {id:'size',text:t('animals.record.Size.title')},
                {id:'weight',text:t('animals.record.Weight')+' (Kg)'},
                {id:'age',text:t('animals.record.Age.title')},
                {id:'birthdate_year',text:t('animals.record.Birthdate')},
                {id:'deathdate_year',text:t('animals.record.Deathdate')},
                {id:'updated_at',text:t('animals.record.Updated')},                
                {id:'image',text:t('animals.record.Image')},
                {id:'image2',text:t('animals.record.Image2')},
                {id:'video',text:t('animals.record.Video')},
                {id:'video2',text:t('animals.record.Video2')}
            ];  

            if(origin === 'user-animals' || origin === 'user-people'){
                headerCols.push({id:'vaccines',text:t('animals.record.vaccines')});
                headerCols.push({id:'treatment',text:t('animals.record.treatment')});
                headerCols.push({id:'castrated',text:t('animals.record.castrated')});
                headerCols.push({id:'date_entry',text:t('animals.record.date_entry')});
                headerCols.push({id:'date_exit',text:t('animals.record.date_exit')});
                headerCols.push({id:'date_entry2',text:t('animals.record.date_entry2')});
                headerCols.push({id:'date_exit2',text:t('animals.record.date_exit2')});
                headerCols.push({id:'person_name',text:t('animals.record.Person')});
            }

            csv('animals',t,t('user.animals.'+subsection+'.title'),baseUrl,imagesPaths,
                headerCols,filteredAnimals);
        }
    }

	return (
        <>
        {
            (
                subsection === 'adopt' ||
                subsection === 'adopted' ||
                subsection === 'heaven' ||
                subsection === 'hidden'
            )
            &&            
            <>
            <h1 className='title-user-list'>            
                {t('user.animals.'+subsection+'.title')}
                {
                    !loading && filteredAnimals?.length > 0 && ' ('+filteredAnimals?.length+')'                
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
            </>
        }
        {
            loading ?
                <div className='loading'>
                    <CircularProgress sx={{color:"#FF8C00"}}/>
                </div>
            :
                <div className='mt-4'>
                    <AnimalEditModal   
                        t={t}      
                        origin={origin}  
                        show={showEditAnimal}
                        setShow={setShowEditAnimal}  
                        items={filteredAnimals}               
                        setItems={setFilteredAnimals}
                        item={animalEditItem}
                        setItem={setAnimalItem}
                        position={position}
                        options={options}
                        subsection={subsection}
                        imagesPaths={imagesPaths}
                        animals={animals}
                        setAnimals={setAnimals}
                        filterUsed={filterUsed}
                        setInternal={setInternal}
                        data={data}
                        setData={setData}
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
                        filterUsed={filterUsed}
                        setFilterUsed={setFilterUsed}
                        subsection={subsection}
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
                                imagesPaths={imagesPaths}
                                setAnimalEditItem={setAnimalEditItem}
                                setShowEditAnimal={setShowEditAnimal}
                                items={filteredAnimals}               
                                setItems={setFilteredAnimals}
                                animals={animals}                              
                                setAnimals={setAnimals}
                                filterUsed={filterUsed}
                                setInternal={setInternal}                                
                                setData={setData}
                            />    
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
                                            filteredAnimals.sort(getComparator(order, orderBy, origin)).slice(from,to+1).map((item,i) => (
                                                <StyledTableRow
                                                    hover
                                                    onClick={(event) => handleInfo(item,from+i)}
                                                    sx={{ cursor: 'pointer' }}
                                                >  
                                                    {
                                                        columns && columns.length > 0 && columns.map((column,i) => (
                                                            <StyledTableCell align={column?.align}>
                                                                <Typography noWrap sx={{fontSize: '14px'}}>{item[column?.id]}</Typography>
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
                            <ItemsPerPage
                                origin={origin}
                                t={t}
                                itemsPerPage={itemsPerPage}
                                setItemsPerPage={setItemsPerPage}                                
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