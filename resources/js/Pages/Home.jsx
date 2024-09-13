import { useMemo } from 'react';
import { useTranslation } from "react-i18next";
//import i18n from 'i18next';
//const lang =  i18n.language // lang === 'es' etc.
import Header from '@/Pages/Header/Header';
import { setLanguage } from "@/Utils/Cookies";

export default function Home({user,email,language}){

	const { t, i18n } = useTranslation('global');

	useMemo(() => {

        if(language){
			i18n.changeLanguage(language);
			setLanguage(language);
		}

    }, []);

    return (
    	<>
    	<Header user={user} t={t} from='home'/>
    	<main>
    		<h1 className="title">
    			{t('introduction.title')}
    		</h1>
			<p>
				{t('introduction.line1')}
			</p>
			<p>
				{t('introduction.line2')}<br/>
				<ul>
					<li> - <a href='https://amigosbarcelona.com' target='_blank'>amigosbarcelona</a></li>
					<li> - <a href='https://amigosvalencia.com' target='_blank'>amigosvalencia</a></li>
				</ul>
			</p>
			<p>
				{t('introduction.line3')}
			</p>
			<p>
				{t('introduction.line4')}
			</p>
			<p>
				{t('introduction.line5')}
			</p>
			<p>
				{t('introduction.line6')} <a href='mailto:{email}' target='_blank'>{email}</a>
			</p>
			<p className='mt-16 text-center'>
				<a href={route('policy')} className='policy-link'>
					{t('trans.Policy')}
				</a>
			</p>
			<p className='mt-4 text-center'>
				<a href={route('terms')} className='terms-link'>
					{t('trans.Terms')}
				</a>
			</p>
    	</main>
    	</>
    )
}