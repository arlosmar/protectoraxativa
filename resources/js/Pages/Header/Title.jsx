// https://inertiajs.com/title-and-meta

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

	// <Head title={title} description='armando'/>
	/*
	<meta name="description" content={title}/>
	<meta property="og:description" content={title}/>	        
	<meta property="og:url" content="{{config('app.url', '')}}"/>
    <meta property="og:image" content="{{url('storage/favicon.ico')}}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="{{str_replace('_', '-', app()->getLocale())}}"/>
	*/

	return (
		<Head>
		 	<title>{title}</title>
	        <meta property="og:title" content={title}/>	        
		</Head>
	)
}