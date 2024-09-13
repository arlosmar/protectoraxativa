import { Head } from '@inertiajs/react';

export default function Title({t,from}){

	var title = 'Web';

	switch(from){

		case 'home':
			title = t('Title.Home');
			break;

		case 'groups':
			title = t('Title.Groups');
			break;

		case 'events':
			title = t('Title.Events');
			break;

		case 'login':
			title = t('Title.Login');
			break;
		
		case 'user':
			title = t('Title.User');
			break;

		case 'contact':
			title = t('Title.Contact');
			break;
	}

	return (
		<Head title={title}/>
	)
}