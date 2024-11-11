import { setCookie } from '@/Utils/Cookies';

import { itemsPerPageListOptions } from "@/Utils/Variables";

export default function ItemsPerPage({origin,t,itemsPerPage,setItemsPerPage}){

    const options = itemsPerPageListOptions(origin);

    const handleItemsPerPage = (option) => {
        setItemsPerPage(option);
        setCookie('itemsPerPageList-'+origin,option);
    }

    return (
        options && options.length > 0 &&
        <div className='items-per-page-div'>
            {
                options.map((option,index) => (
                    <>
                    <a 
                        onClick={(e) => handleItemsPerPage(option)} 
                        className={`${itemsPerPage === option && 'link-selected'} px-2 cursor-pointer`}
                    >
                        {option}
                    </a>| 
                    </>
                ))
            }
            <a 
                onClick={(e) => handleItemsPerPage(100000)} 
                className={`${itemsPerPage === 100000 && 'link-selected'} px-2 cursor-pointer`}
            >
                {t('trans.All-Male-Singular')}
            </a>
        </div>
    );
}