import Header from '@/Pages/Header/Header';
import { useMemo, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { date } from '@/Utils/Format';
import Toast from '@/Components/Toast'; 

import LoadMore from '@/Components/LoadMore';

import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import ShareModal from '@/Modals/ShareModal';
import FilterListIcon from '@mui/icons-material/FilterList';
import SettingsIcon from '@mui/icons-material/Settings';

import NewsModal from "@/Modals/NewsModal";

import FilterNews from '@/Pages/News/FilterNews';
import { formatNews } from "@/Utils/Format";

export default function News({user,imagesPaths,page,news,disabled,initialNews}){

	const { t } = useTranslation('global');

	const [ filterUsed, setFilterUsed ] = useState(false);
	
	const formattedNews = useMemo(() => formatNews(t,news), [news]);
	const [ filteredNews, setFilteredNews ] = useState(formattedNews);
    const [ openSearch, setOpenSearch ] = useState(false);

    const handleOpenSearch = (e) => {
        setOpenSearch(!openSearch);
    };

	const [ share , setShare ] = useState(false);
	const [ link, setLink ] = useState('');

	const [ showNews, setShowNews ] = useState(initialNews ? true : false);

	const [ pageCurrent, setPageCurrent ] = useState(page ? parseInt(page) : 1);

	const [ newsPaged, setNewsPaged ] = useState(formattedNews);
	const [ newsOriginalFilter, setNewsOriginalFilter ] = useState(formattedNews);

	const [ toastMsg, setToastMsg ] = useState('');
    const [ toastErrorMsg, setToastErrorMsg ] = useState('');
    const [ openToast, setOpenToast ] = useState(false);

    const [ disableLoadMore, setDisableLoadMore ] = useState(false);
	
	const handleChange = () => {

		const newPage = pageCurrent+1;

		var path = '?page='+newPage;
		
		axios.get(route('news.get')+path)
        .then(function (response){
            
            if(response.data.result){
                
                // success
                var result = JSON.parse(response.data.news);

                // format
                var resultFormatted = formatNews(t,result);
                
                // if empty result it means on more news. so keep on current page
    	        // remove load more button
                if(response.data.disabled){
                	setDisableLoadMore(true);
                }
           
           		// if more news
           		if(result){
                
	                // add news to current ones                
    	            setNewsPaged([...newsPaged,...resultFormatted]);
    	            setNewsOriginalFilter([...newsPaged,...resultFormatted]);

    	            setPageCurrent(newPage);

			        // change url on the browser
			        var url = route('news')+'/'+newPage;
			        window.history.pushState({path:url},'',url);
    	        }
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
            //setToastErrorMsg(error);
            setToastErrorMsg('Error');
            setOpenToast(true);
        });      
    }

    const handleShare = async (newId) => {

    	const linkNews = route('news')+'?view='+newId;    	

        // if native mobile share        
        if(navigator?.share) {
            
            try{
                const shareData = {
                    title: t('share.title-native'),
                    //text: t('trans.text'),
                    url: linkNews
                };
                await navigator.share(shareData);
                onSuccess?.();
            }
            catch(err){           
                //onError?.(err);
                // if user cancels the sharing it goes here as well                
            }
        } 
        else{
            // if no native mobile share, show popup
            setLink(linkNews);
            setShare(true);
        }
    }

    const sxIcon = {
        fontSize: '35px'
    };

    const goAdmin = (newId) => {
        window.location = route('admin.news')+'?view='+newId;
    }

    useEffect(() => {

        if(initialNews){            
            //myRef.current.scrollIntoView();
            const element = document.getElementById('news-'+initialNews?.id);              
            if(element){    
            	element.scrollIntoView({behavior: 'smooth'});
            }
        }

    }, []);

	return (
		<>
		<ShareModal
            t={t}
            show={share}
            setShow={setShare}
            link={link}          
        />
        <NewsModal
        	user={user}
            origin='news'
            t={t}
            show={showNews}
            setShow={setShowNews}      
            newsItem={initialNews}  
            imagesPaths={imagesPaths}
        />
		<Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={toastMsg}
            error={toastErrorMsg}
        />
		<Header user={user} t={t} from='news'/>
    	<main>
    		{/*
            <h1 className="title-news">
    			{t('news.title')}
    		</h1>
    		*/}
    		<FilterNews
	            origin='news'
	            t={t}                        
	            openSearch={openSearch}
	            setOpenSearch={setOpenSearch}
	            originalItems={newsOriginalFilter}
	            items={newsPaged}
	            setItems={setNewsPaged} 
	            filterUsed={filterUsed}
	            setFilterUsed={setFilterUsed}                       
	        />
	    	<div className='list-icons'>               
                <IconButton onClick={handleOpenSearch} id='filter'>
                    <FilterListIcon sx={{ fontSize: '50px' }}/>
                </IconButton>
            </div>
    		{
    			newsPaged && newsPaged.length > 0 ?
    				<>
    				{
		    			newsPaged.map((newsItem,index) => (
				            <div className='news-div-box' id={'news-'+newsItem?.id}>
				            	{
				            		newsItem?.title && newsItem?.title.length > 0 &&
					            	<h1 className='news-title'>
					                	{newsItem?.title}
					            	</h1>
					            }
					            {
					            	newsItem?.date && newsItem?.date.length > 0 &&
					            	<div className='news-date'>
					                	{newsItem?.date}
					            	</div>
					            }
					            {
					            	newsItem?.image && newsItem?.image.length > 0 &&
					            	<div className='news-image'>
					            		<a href={imagesPaths?.news+newsItem?.image} target='_blank'>
					            			<img src={imagesPaths?.news+newsItem?.image}/>
					            		</a>
					            	</div>
					            }
					            {
					            	newsItem?.description && newsItem?.description.length > 0 &&
						            <div 
						                className='news-description'
						                dangerouslySetInnerHTML={{__html: newsItem?.description}}
						            >                
						            </div>
						        }
						        <div className={`w-full flex items-center ${user && user?.admin ? 'justify-between' : 'justify-center'}`}>
		                            <IconButton onClick={(e) => handleShare(newsItem?.id)} className='shareIcon'>
		                                <ShareIcon sx={sxIcon}/>
		                            </IconButton> 
		                            {
                             	   		(user && user?.admin === 1) &&
		                                <IconButton onClick={(e) => goAdmin(newsItem?.id)} className='editIcon'>
		                                    <SettingsIcon sx={sxIcon}/>
		                                </IconButton> 
		                            }
		                        </div>
				        	</div>
				        ))
				    }
			        {
			        	!disabled && !filterUsed &&
				        <div className='text-center'>
				        	<LoadMore 
				        		t={t}
				        		handleChange={handleChange}
				        		disabled={disableLoadMore}
				        	/>
				        </div>
				    }
			        </>
	        	:
                    <div className='text-center'>
                        {t('news.empty')}
                    </div>
	        }
        </main>
        </>
	);
}