import CloseIcon from '@mui/icons-material/Close';

export default function GenericModal({close,show,setShow,text}){

    const handleClose = () => {
        setShow(false)
    }

    return (
        <div className={`${show?'':'hidden'} w-full h-[100vh] bg-transparent absolute top-0 left-0 backdrop-blur-sm z-50 full-screen`}>
            <div id="popup-modal" tabIndex="-1" className={`modal`} aria-hidden="true">
                {
                    close &&
                    <div className={`w-full flex justify-end`}>
                        <button type="button" className="inline-flex items-center"
                            data-modal-toggle="popup-modal"
                            onClick={handleClose}>
                            <CloseIcon/>
                        </button>
                    </div>
                }                  
                <div className="text-center mt-4">
                    {text}
                </div>
            </div>
        </div>
    );
}