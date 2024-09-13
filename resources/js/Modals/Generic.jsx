import Icon from "@/Pages/Auth/MyNiids/NiidComponents/Icon";

export default function LanguageModal({show,setShow,languages,handleLanguage}){

    const handleClose = () => {
        setShow(false)
    }

    return (
        <div className={`${show?'':'hidden'} w-full h-[100vh] bg-transparent absolute top-0 left-0 backdrop-blur-sm z-50 full-screen`}>
            <div className={``}>
                <div id="popup-modal" tabIndex="-1" className={`modal`} aria-hidden="true">
                    <div className={`w-full flex justify-end`}>
                        <button type="button" className="pt-3 pr-1 inline-flex items-center"
                            data-modal-toggle="popup-modal"
                            onClick={handleClose}>
                            <Icon fa='fa-regular fa-xmark' className="fa-lg text-gray"/>
                        </button>
                    </div>                    
                    {
                        languages && languages.length > 0 && languages.map((item,index) => (
                            <div className="text-center mt-4" id={item.value} onClick={handleLanguage}>
                                <button className="button-generic cursor-pointer">
                                    {item.name}
                                </button>
                            </div>
                        ))
                    }                   
                </div>
            </div>
        </div>
    );
}