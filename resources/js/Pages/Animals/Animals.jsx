import Header from '@/Pages/Header/Header';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { styleTabs } from '@/Utils/Styles';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AdoptIcon from '@mui/icons-material/Home';
import SponsorIcon from '@mui/icons-material/Savings';
import HeavenIcon from '@mui/icons-material/Star';

import Adopt from '@/Pages/Animals/Adopt';
import Sponsor from '@/Pages/Animals/Sponsor';
import Heaven from '@/Pages/Animals/Heaven';

import Toast from '@/Components/Toast';

import { formatAnimals, datesDif, now } from "@/Utils/Format";

import { useSwipeable } from 'react-swipeable';
import Sticky from '@/Components/Sticky';

export default function Animals({user,section,subsection,emails,social,baseUrl,imagesPaths,
    page,forms,prices,guides,reloadAfterTime,itemsPerPage}){

    const [ alreadyLoaded, setAlreadyLoaded ] = useState([]);

    const { t } = useTranslation('global');
    const [ animals, setAnimals ] = useState([]);
    const [ options, setOptions ] = useState(null);

    const [ tab, setTab ] = useState(section ? section : "adopt");
    const [ subtab, setSubtab ] = useState(subsection ? subsection : "");

    const [ loading, setLoading ] = useState(false);

    const [ toastMsg, setToastMsg ] = useState('');
    const [ openToast, setOpenToast ] = useState(false);

    // we use this because if not, when opening directly a page, if we change tab
    // it keeps on that page
    const [ pageInitial, setPageInitial ] = useState(page);

    const { stickyRef, sticky, offset } = Sticky();

    const { classes, sx, sxIcon } = styleTabs();

    const handleTabChange = (event, newValue) => {

        setTab(newValue);
        setSubtab('');

        // reset page in case it came by url
        setPageInitial(1);

        if(sticky){            
            window.scrollTo({top: offset});
        }

        // change url on the browser
        var url = route("animals")+'/'+newValue;
        window.history.pushState({path:url},'',url);
    };

    useEffect(() => {        

        //setAnimals([]);
            
        // call by ajax to get animals
        if(
            subtab &&
            subtab.length > 0 &&
            subtab !== 'info' &&
            subtab !== 'apu'
        ){                    
            if(
                !alreadyLoaded[tab+'-'+subtab]?.date ||
                (datesDif(alreadyLoaded[tab+'-'+subtab]?.date,now()) >= reloadAfterTime)
            ){

                setLoading(true);            

                // axios.get to select
                // axios.post to insert
                // axios.put to update
                // adios.delete to delete
                axios.get(route('animals.get')+'?section='+tab+'&subsection='+subtab)
                .then(function (response){            
                    
                    if(response.data.result){
                        
                        // success
                        var result = JSON.parse(response.data.animals);                    
                        
                        // format animals
                        var resultFormatted = formatAnimals(t,result);
                        
                        setAnimals(resultFormatted);
                        setOptions(JSON.parse(response.data.options));

                        var newAlreadyLoaded = alreadyLoaded;                    
                        newAlreadyLoaded[tab+'-'+subtab] = {
                            date: now(),
                            animals: resultFormatted
                        };
                        setAlreadyLoaded(newAlreadyLoaded);

                        setLoading(false);
                    }
                    else{
                        // error      
                        setLoading(false);
                        setToastMsg(response.data.error);
                        setOpenToast(true);
                    }                
                })
                .catch(function (error){
                    setLoading(false);
                    setToastMsg(error);
                    setOpenToast(true);
                });     

                // another way without axios
                //put(route('language.update'));
                
                // another way with fetch
                /*
                fetch(route('language.update'), {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        language: 'a'
                    })
                })
                .then(function (response) {
                    
                })
                .catch(function (error) {
                    
                });
                */  
            }
            else{
                setAnimals(alreadyLoaded[tab+'-'+subtab]?.animals);
            }
        }        
    },[subtab])

    const [ tabsArray , setTabsArray ] = useState(['adopt','sponsor','heaven']);
    const [ tabsLength , setTabsLength ] = useState(3);
    const [ posTab , setPosTab ] = useState(0);

    const handleSwipe = (e,move) => {

        var newPos = posTab+move;

        if(newPos >= 0 && newPos < tabsLength){
            setPosTab(newPos);
            handleTabChange(e,tabsArray[newPos]);
        }
    }

    // https://commerce.nearform.com/open-source/react-swipeable/
    const handlers = useSwipeable({
        onSwipedRight: (e) => handleSwipe(e,-1),
        onSwipedLeft: (e) => handleSwipe(e,1),        
        //onTouchEndOrOnMouseUp: (e) => handleSwipe("User Touched!", e),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    return (    	
        <>
        <Toast 
            open={openToast}
            setOpen={setOpenToast}
            message={toastMsg}
        />
    	<Header user={user} t={t} from='animals'/>
    	<main {...handlers}>
            {/*
            <h1 className="title">
    			{t('animals.title')}
    		</h1>
            */}
            <div className='tabs-container'>
                <Tabs 		
                    id="tabs"
                    ref={stickyRef} 
                    className={`${classes.tabs} ${sticky && 'sticky'}`}
                    sx={{zIndex:1}} 
                    value={tab} 
                    onChange={handleTabChange}
                    variant="scrollable"
                >					
                    <Tab icon={<AdoptIcon sx={sxIcon}/>} value="adopt" sx={sx} iconPosition="top" label={t('animals.adopt.icon')}/>
					<Tab icon={<SponsorIcon sx={sxIcon}/>} value="sponsor" sx={sx} iconPosition="top" label={t('animals.sponsor.icon')}/>
                    <Tab icon={<HeavenIcon sx={sxIcon}/>} value="heaven" sx={sx} iconPosition="top" label={t('animals.heaven.icon')}/>
                </Tabs>
                <div className='content-container'>
                {
                    tab === 'adopt' ?
                        <Adopt
                            user={user}
                            subsection={subtab}
                            setSubsection={setSubtab}
                            t={t}
                            email_adoptions={emails?.email_adoptions}
                            social={social}                            
                            imagesPaths={imagesPaths}
                            animals={animals}
                            page={pageInitial}
                            setPage={setPageInitial}
                            loading={loading}
                            options={options}
                            forms={forms}
                            guides={guides}
                            baseUrl={baseUrl}
                            prices={prices}
                            itemsPerPage={itemsPerPage}
                        />
                    :
                        tab === 'sponsor' ?
                            <Sponsor
                                user={user}
                                subsection={subtab}
                                setSubsection={setSubtab}
                                t={t}
                                imagesPaths={imagesPaths}
                                animals={animals}
                                page={pageInitial}
                                setPage={setPageInitial}
                                loading={loading}
                                options={options}
                                email_colaboration={emails?.email_colaboration}
                                forms={forms}
                                prices={prices}
                                baseUrl={baseUrl}
                                itemsPerPage={itemsPerPage}
                            />
                        :
                            tab === 'heaven' ?
                                <Heaven   
                                    user={user} 
                                    subsection={subtab}  
                                    setSubsection={setSubtab}                              
                                    t={t}
                                    imagesPaths={imagesPaths}
                                    email_info={emails?.email_info}
                                    animals={animals}                                    
                                    page={pageInitial}
                                    setPage={setPageInitial}
                                    loading={loading}
                                    options={options}
                                    baseUrl={baseUrl}
                                    itemsPerPage={itemsPerPage}
                                />
                            :
                                ''
                }
                </div>
            </div>
        </main>
        </>
    )
}