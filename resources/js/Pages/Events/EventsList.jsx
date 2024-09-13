import { useState } from 'react';
import { date } from "@/Utils/Format";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import MicNoneIcon from '@mui/icons-material/MicNone';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

import CalendarIcon from '@mui/icons-material/CalendarToday';
import LocationIcon from '@mui/icons-material/LocationOn';

import Chip from '@mui/material/Chip';

export default function EventsList({t,user,events,from}){

	const [ expanded, setExpanded ] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

	return (
        events && events.length > 0 ?
            events.map((event,index) => {

                var icon = <WorkspacesIcon/>;
                var iconName = '';
                if(event.type){

                    switch(event.type.name){
                        
                         case 'Whatsapp':
                            icon = <WhatsAppIcon/>;
                            iconName='Whatsapp';
                            break;

                        case 'Telegram':
                            icon = <TelegramIcon/>;
                            iconName='Telegram';
                            break;

                        case 'Discord':
                            icon = <MicNoneIcon/>;
                            iconName='Discord';
                            break;
                    }
                }

                return (
                    <div className='mb-8'>
                        <Accordion 
                            expanded={expanded === event.id} 
                            onChange={handleChange(event.id)}
                            sx={{backgroundColor:'#FFFAFA', boxShadow: 5}}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}                                    
                                id={event.id}
                            >
                                <div className='flex items-center'>                      
                                    {icon} <span class="event-name">{event.name}</span>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails> 
                                {
                                    iconName &&
                                    <div className='mb-4'>
                                        [{iconName}]
                                    </div>
                                }
                                <div className='mb-4 flex items-center'>
                                    <CalendarIcon/> <span className='ml-1'>{date(event.date,true,false)}</span>
                                </div>  
                                <div className='mb-4 flex items-center'>
                                    <LocationIcon/> {event.location}
                                </div> 
                                {
                                    event.description && event.description.length > 0 &&                                   
                                    <div className='mb-4'>
                                        {event.description}
                                    </div>
                                }
                                <Chip label={'#'+t('tags.names.'+event.tag.name)}/>
                                <div className='flex justify-center text-center mt-2'>
                                    <a 
                                        href={event.link}
                                        target='_blank'
                                        className='event-link'
                                    >
                                        {t('events.link')}
                                    </a>                                   

                                    {
                                        user?.id && event.user_id === user.id &&
                                        <div className='ms-2'>
                                            <a 
                                                href={route('event.edit',event.id)+from}                                              
                                                className='event-link-edit'
                                            >
                                                {t('events.edit')}
                                            </a>
                                        </div>
                                    }                                
                                </div>                                    
                            </AccordionDetails>
                        </Accordion>
                    </div>
                )
            })
        :
            <div className='text-center'>
                {t('events.empty')}
            </div>
	)
}