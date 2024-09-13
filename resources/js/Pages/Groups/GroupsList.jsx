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

import Chip from '@mui/material/Chip';

export default function GroupsList({t,user,groups,from}){

	const [ expanded, setExpanded ] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

	return (
        groups && groups.length > 0 ?
            groups.map((group,index) => {

                var icon = <WorkspacesIcon/>;
                var iconName = '';
                if(group.type){

                    switch(group.type.name){
                        
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
                            expanded={expanded === group.id} 
                            onChange={handleChange(group.id)}
                            sx={{backgroundColor:'#FFFAFA', boxShadow: 5}}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}                                    
                                id={group.id}
                            >
                                <div className='flex items-center'>                      
                                    {icon} <span class="group-name">{group.name}</span>
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
                                    <CalendarIcon/> <span className='ml-1'>{t('groups.Created-Male')+': '+date(group.created_at)}</span>
                                </div>                                        
                                {
                                    group.description && group.description.length > 0 &&                                   
                                    <div className='mb-4'>
                                        {group.description}
                                    </div>
                                }
                                <Chip label={'#'+t('tags.names.'+group.tag.name)}/>
                                <div className='flex justify-center text-center mt-2'>
                                    <a 
                                        href={group.link}
                                        target='_blank'
                                        className='group-link'
                                    >
                                        {t('groups.link')}
                                    </a>

                                    {
                                    	user?.id && group.user_id === user.id &&
                                    	<div className='ms-2'>
	                                    	<a 
		                                        href={route('group.edit',group.id)+from}		                                        
		                                        className='group-link-edit'
		                                    >
		                                        {t('groups.edit')}
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
                {t('groups.empty')}
            </div>
	)
}