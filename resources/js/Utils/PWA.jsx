
export const listenerPWA = (listener) => {
    window.addEventListener("beforeinstallprompt",listener);
}

export const removeListenerPWA = (listener) => {
    window.removeEventListener("beforeinstallprompt",listener);
}

export const installPWA = async (from,installPrompt,listener,setInstallPrompt,handleClose = null) => {    

    if(!installPrompt) {
        return;
    }  

    const result = await installPrompt.prompt();
    
    if(from === 'banner'){
        // dismissed, accepted
        //console.log(`Install prompt was: ${result.outcome}`);
        //if(result.outcome === 'dismissed'){
            disableInstallPrompt(setInstallPrompt,listener,handleClose);
        //}
    }
}

export const disableInstallPrompt = (setInstallPrompt,listener,handleClose) => {    
    setInstallPrompt(null);
    handleClose();
}

