import { useTranslation } from "react-i18next";
import Header from '@/Pages/Header/Header';
import Terms from '@/Pages/Info/Terms';
import Policy from '@/Pages/Info/Policy';

export default function Info({user,item}){

	const { t } = useTranslation('global');

    return (
    	<>
    	<Header user={user} t={t} from='home'/>
    	<main>
    		{
    			item === 'terms' ?
    				<Terms t={t}/>
    			:
    				item === 'policy' ? 
    					<Policy t={t}/>
    				:
    					''
    		}
    	</main>
    	</>
    )
}