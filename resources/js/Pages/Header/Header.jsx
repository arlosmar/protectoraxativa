import BarTop from '@/Pages/Header/BarTop';
import BarBottom from '@/Pages/Header/BarBottom';
import Title from '@/Pages/Header/Title';

export default function Header({user,t,from}){

	return (
		<>
		<Title t={t} from={from}/>
		<BarTop user={user} t={t} from={from}/>
		<BarBottom t={t} from={from}/>
		</>
	)
}