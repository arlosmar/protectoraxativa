import { Head } from '@inertiajs/react';

export default function Title({t,from}){

	var title = 'Web';

	switch(from){

		case 'home':
			title = t('Title.Home');
			break;

		case 'animals':
			title = t('Title.Animals');
			break;

		case 'news':
			title = t('Title.News');
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