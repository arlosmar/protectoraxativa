import BarTop from '@/Pages/Header/BarTop';
import BarBottom from '@/Pages/Header/BarBottom';
import Title from '@/Pages/Header/Title';
import Cookies from "@/Components/Cookies";

export default function Header({user,t,from}){

	return (
		<>
		<Title t={t} from={from}/>
		<Cookies t={t}/>
		<BarTop user={user} t={t} from={from}/>
		<BarBottom t={t} from={from}/>
		</>
	)
}