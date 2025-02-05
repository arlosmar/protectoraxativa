import { useState, useEffect, lazy, Suspense } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Pagination from '@/Components/Pagination';
import ItemsPerPage from '@/Components/ItemsPerPage';
import { itemsPerPageList } from "@/Utils/Variables";

//import NewsModal from "@/Modals/NewsModal";
const NewsModal = lazy(() => import("@/Modals/NewsModal"));

//import NewsEditModal from "@/Modals/NewsEditModal";
const NewsEditModal = lazy(() => import("@/Modals/NewsEditModal"));

//import FilterNews from '@/Pages/News/FilterNews';
const FilterNews = lazy(() => import("@/Pages/News/FilterNews"));

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

import Checkbox from '@/Components/Checkbox';
import DeleteModal from '@/Modals/DeleteModal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Toast from '@/Components/Toast';

export default function List({t,origin,news,setNews,imagesPaths,loading,page,options,
    internal,setInternal,baseUrl,csrf_token}){
    
    const [ toastMsg, setToastMsg ] = useState('');
    const [ toastErrorMsg, setToastErrorMsg ] = useState('');
    const [ openToast, setOpenToast ] = useState(false);

    const [ itemsPerPage, setItemsPerPage ] = useState(itemsPerPageList(origin));

    const [ filterUsed, setFilterUsed ] = useState(false);

    const [ filteredNews, setFilteredNews ] = useState(news);

    const [ openSearch, setOpenSearch ] = useState(false);

    const handleOpenSearch = (e) => {
        setOpenSearch(!openSearch);
    };

    const [ checksDelete, setChecksDelete ] = useState({});

    const handleChecksDelete = (e) => {
        
        const name = e.target.name;
        const value = e.target.checked;

        var newChecksDelete = checksDelete;
        newChecksDelete[name] = value;
        setChecksDelete(newChecksDelete);        
    }

    const handleCellChecksDelete = (id) => {
        
        var newChecksDelete = checksDelete;

        if(Object.hasOwn(checksDelete,id)){
            var value = checksDelete[id];
            // the opposite
            newChecksDelete[id] = value ? false : true;
            document.getElementById(id).checked = value ? false : true;
        }
        else{
            newChecksDelete[id] = true;
            document.getElementById(id).checked = true;
        }

        setChecksDelete(newChecksDelete);
    }

    const [ showNews, setShowNews ] = useState(false);
    const [ newsItem, setNewsItem ] = useState(null);
    const [ position, setPosition ] = useState(null);

    const [ showEditNews, setShowEditNews ] = useState(false);
    const [ newsEditItem, setNewsEditItem ] = useState(null);

    const [ order, setOrder ] = useState('desc');
    const [ orderBy, setOrderBy ] = useState('date');

    // check if concrete item by parameter. it is the id of the element
    const [ parameter, setParameter ] = useState(parseInt(getParameter('view')));

    var parameterPos = false;
    if(parameter && filteredNews && filteredNews.length > 0){

        parameterPos = filteredNews.sort(getComparator(order, orderBy, origin)).findIndex(item => item?.id === parameter);

        // add 1 because pos 0 means element 1
        if(parameterPos !== -1){
            parameterPos++;
        }
        else{
            parameterPos = false; // we can use 0
        }
    }

    const [ length, setLength ] = useState(filteredNews && filteredNews.length ? filteredNews.length : 0);
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
        var newPages = Math.max(1,Math.ceil(newLength/itemsPerPage)); // in case 0 items
        setPages(newPages);  

        // show initial value
        parameterPos = false;
        if(parameter && filteredNews && filteredNews.length > 0){
            
            var itemsArray = filteredNews.sort(getComparator(order, orderBy, origin));
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

        var newPageCurrent = parameterPos ? Math.min(Math.ceil(parameterPos/itemsPerPage),newPages) : Math.min(pageCurrent,newPages);
        setPageCurrent(newPageCurrent);

        // the useEffect for pageCurrent is not called, so changing from and to here
        // maybe you cannot call useEffect twice?
        setFrom((newPageCurrent-1)*itemsPerPage);
        setTo((newPageCurrent*itemsPerPage)-1);
    }

    // when filtering
    useEffect(() => {        
        setValues(filteredNews);
    },[filteredNews]);

    // when loading people each time when clicking the tab
    useEffect(() => {

        // check the change is not because of adding/editing/removing items
        if(!internal){
            setFilteredNews(news);
            // not necessary because it calls the useEffect above
            //setValues(people);
        }
    },[news]);

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
        setNewsItem(elem);
        setPosition(pos);
        setShowNews(true);
    };

    const columns = [
        {id:'date',align:'left',text:t('news.record.date'),type:'text'},
        {id:'hidden',align:'left',text:t('news.record.hidden'),type:'boolean'},
        //{id:'user_name',align:'left',text:t('news.record.user'),type:'text'},
        {id:'title',align:'left',text:t('news.record.title'),type:'text'}, 
        //{id:'description',align:'left',text:t('news.record.description'),type:'text'}       
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
        setNewsEditItem(null);   
        setPosition(null); 
        setShowEditNews(true);
    }

    const handleExport = (e) => {

        if(filteredNews && filteredNews.length > 0){

            //foto,edad,tamaño,raza,fecha entrada,adopción,fecha esterilización,defunción];
            const headerCols = [                       
                {id:'date',text:t('news.record.date')},
                {id:'hidden',text:t('news.record.hidden')},
                //{id:'user_name',text:t('news.record.name')},
                {id:'title',text:t('news.record.title')},
                {id:'image',text:t('news.record.image')},
                {id:'description',text:t('news.record.description')}
            ];  

            csv('news',t,t('user.news.title'),baseUrl,imagesPaths,headerCols,filteredNews);
        }
    }

    const [ massiveDeleteConfirm , setMassiveDeleteConfirm ] = useState(false);

    const handleConfirmMassiveDelete = (e) => {
        setMassiveDeleteConfirm(true);
    }

    const handleMassiveDelete = (e) => {

        setMassiveDeleteConfirm(false);

        if(checksDelete && checksDelete.length > 0){

            axios.post(route('news.delete.massive'),{ids:checksDelete})
            .then(function (response){            
                
                if(response.data.result){

                    const deletedIds = response.data.deletedIds;
                    
                    // update array to remove it from the list
                    const removeElements = filteredNews.filter((item, index) => !deletedIds.includes(item?.id));
                    setFilteredNews(removeElements);                
                    
                    // show message
                    setToastMsg(t('trans.Deleted'));
                    setOpenToast(true);                
                }
                else{
                    // error  
                    setToastMsg('');                 
                    setToastErrorMsg(response.data.error);
                    setOpenToast(true);                
                }                
            })
            .catch(function (error){    
                setToastMsg('');
                setToastErrorMsg(t('Error'));    
                setOpenToast(true);        
            });
        }
        else{
            setToastMsg('');
            setToastErrorMsg(t('trans.noElementsSelected'));
            setOpenToast(true);      
        }
    }

    /*
    <div className='loading mt-8'>
        <CircularProgress sx={{color:"#FF8C00"}}/>
    </div>
    */

    return (
        <>        
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={toastMsg}
            error={toastErrorMsg}
        />
        <h1 className='title-user-list'>            
            {t('user.news.title')}
            {
                !loading && filteredNews?.length > 0 && ' ('+filteredNews?.length+')'                
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
                        showEditNews &&
                        <Suspense>
                        <NewsEditModal       
                            origin={origin}                 
                            t={t}        
                            show={showEditNews}
                            setShow={setShowEditNews}  
                            items={filteredNews}               
                            setItems={setFilteredNews}
                            item={newsEditItem}
                            setItem={setNewsItem}
                            position={position}
                            news={news}
                            setNews={setNews}
                            filterUsed={filterUsed}
                            setInternal={setInternal}
                            imagesPaths={imagesPaths}
                            options={options}
                            data={data}
                            setData={setData}
                            csrf_token={csrf_token}
                        />
                        </Suspense>
                    }
                    {
                        openSearch &&
                        <Suspense>
                        <FilterNews
                            origin={origin}
                            t={t}                        
                            openSearch={openSearch}
                            setOpenSearch={setOpenSearch}
                            originalItems={news}
                            items={filteredNews}
                            setItems={setFilteredNews} 
                            filterUsed={filterUsed}
                            setFilterUsed={setFilterUsed} 
                            options={options}                      
                        />
                        </Suspense>
                    }
                    {
                        filteredNews && filteredNews.length > 0 ?

                            <>
                            <DeleteModal
                                t={t}
                                show={massiveDeleteConfirm}
                                setShow={setMassiveDeleteConfirm}
                                handleDelete={handleMassiveDelete}
                            />
                            {
                                showNews &&
                                <Suspense>
                                <NewsModal
                                    origin={origin}
                                    t={t}
                                    show={showNews}
                                    setShow={setShowNews}      
                                    newsItem={newsItem}  
                                    imagesPaths={imagesPaths}    
                                    setNewsEditItem={setNewsEditItem}
                                    setShowEditNews={setShowEditNews}   
                                    items={filteredNews}               
                                    setItems={setFilteredNews}  
                                    news={news}
                                    setNews={setNews}
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
                                            <StyledTableCell
                                                key='checkbox'
                                                align='left'                                                
                                                sx={{zIndex:0}}
                                            >
                                                <IconButton onClick={handleConfirmMassiveDelete} className='deleteIcon'>
                                                    <DeleteIcon sx={{fontSize: '20px'}}/>
                                                </IconButton> 
                                            </StyledTableCell>
                                            {
                                                columns && columns.length > 0 && columns.map((item,i) => (
                                                <StyledTableCell
                                                    key={item?.id}
                                                    align='left'
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
                                            filteredNews.sort(getComparator(order, orderBy, origin)).slice(from,to+1).map((item,i) => (

                                                <StyledTableRow
                                                    hover                                                    
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <StyledTableCell 
                                                        align='left'
                                                        onClick={(event) => handleCellChecksDelete(item?.id)}
                                                    >
                                                        <Checkbox
                                                            id={item?.id}
                                                            name={item?.id}
                                                            checked={checksDelete[item?.id]}
                                                            onChange={handleChecksDelete}
                                                        />
                                                    </StyledTableCell>
                                                    {
                                                        columns && columns.length > 0 && columns.map((column,j) => (
                                                            <StyledTableCell 
                                                                align={column?.align}
                                                                onClick={(event) => handleInfo(item,from+i)}
                                                            >
                                                                {
                                                                    item[column?.id] !== null ? 

                                                                        column?.id === 'description' ? 
                                                                            <div 
                                                                                className='text-left text-sm text-nowrap text-ellipsis'
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: item[column?.id].length > 100 ? item[column?.id].slice(0,97)+'...' : item[column?.id]
                                                                                }}
                                                                            >
                                                                            </div>  
                                                                        :
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
                                                                                    column?.type === 'boolean' ?
                                                                                        !item[column?.id] ? t('trans.No') : t('trans.Yes')
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
                                {t('user.news.empty')}
                            </div>
                    }
                </div>
        }
        </>
    )
}