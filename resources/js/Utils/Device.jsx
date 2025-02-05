import * as deviceInfo from 'react-device-detect';
import { getParameter } from "@/Utils/Variables";
import Cookies from 'universal-cookie';

// set a unique string as a kind of device id
export const setDeviceId = (deviceId = null) => {

	const cookies = new Cookies();

	// coming from app
	if(deviceId !== null){
		localStorage.setItem("deviceId",deviceId);
		cookies.set("deviceId",deviceId,{path: '/'});
		//setCookie("deviceId",deviceId);
	}
	else{
		// check if value on local storage
		deviceId = localStorage.getItem("deviceId");
		var newDeviceId = null;

		// if not there, create
		if(deviceId && deviceId.length > 0){
			newDeviceId = deviceId;
		}
		else{
			newDeviceId = Date.now();
			localStorage.setItem("deviceId",newDeviceId); 
		}

		// set a cookie with the value. cookie because we need it on backend
		//setCookie("deviceId",newDeviceId);
		cookies.set("deviceId",newDeviceId,{path: '/'});
	}
}

export const getDeviceId = () => {

	var result = null;
	var deviceId = localStorage.getItem("deviceId");//getCookie("deviceId");

	if(deviceId && deviceId.length > 0){
		result = deviceId;
	}

	return result;
}

// https://www.npmjs.com/package/react-device-detect
// https://github.com/duskload/react-device-detect/blob/HEAD/docs/selectors.md
/*
    isBrowser
    isMobile
    isTablet
    isIE
    browserName
    isAndroid
    isIOS
    isWinPhone
    isChrome
	isFirefox
	isSafari
	isOpera
	isIE
	isEdge
	isChromium
	isMobileSafari
	isSamsungBrowser
	osVersion
	osName
	fullBrowserVersion
	mobileVendor
	mobileModel
	engineName
	engineVersion
	getUA
	isWindows
	isMacOs
	deviceDetect => "{\"deviceDetect\":{\"isBrowser\":true,\"browserMajorVersion\":\"130\",\"browserFullVersion\":\"130.0.0.0\",\"browserName\":\"Chrome\",\"engineName\":\"Blink\",\"engineVersion\":\"130.0.0.0\",\"osName\":\"Linux\",\"osVersion\":\"x86_64\",\"userAgent\":\"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36\"}}"
*/
export const getDeviceInfo = () => {
    
	const deviceDetect = deviceInfo.deviceDetect();
	return deviceDetect;
	/*
	return {
		deviceDetect: deviceDetect
	};
	*/
}

export const setDeviceInfo = () => {

	const cookies = new Cookies();

	var deviceInfo = localStorage.getItem("device");
	var deviceInfoCookie = cookies.get("device");

	var device = null;
	if(!deviceInfo || deviceInfo.length === 0){
		device = getDeviceInfo();
		localStorage.setItem("device",device); 
	}
	else{
		device = deviceInfo;
	}

	if(!deviceInfoCookie || deviceInfoCookie.length === 0){
		cookies.set("device",device,{path: '/'});
	}

	// set unique device id
	setDeviceId();
}

export const checkIsIOS = () => {
    const isIOS = /(iPhone|iPod|iPad)/i.test(navigator.userAgent);    
    //const isIOS = deviceInfo.isIOS(); => throws an error
    return isIOS;
}

export const checkIsApple = () => {
    
    // chrome in linux
    // Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
    const isApple = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
    return isApple;
    
    /*
    throws an error
    const isIOS = deviceInfo.isIOS()
    const isMacOs = deviceInfo.isMacOs();
    if(isIOS || isMacOs){
    	return true;
    }
    else{
    	return false;
    }
    */
}

export const checkIsAndroid = () => {

	// false until public app
	return false;
    //const isAndroid = deviceInfo.isAndroid(); => throws an error
    const isAndroid = /(android)/i.test(navigator.userAgent);
    return isAndroid;
}

// ONLY APP. WEBVIEW on android/ios
export const isApp = () => {

	const param = getParameter('isApp');

	if(param && param.length > 0){
		return true;
	}
	else{
		return false;
	}
}

// WEBAPP OR APP. it is a webview on app android/ios OR pwa
export const isAppOrWebApp = () => {

	const param = getParameter('isApp');

	if(param && param.length > 0){
		return true;
	}
	else{
		// if pwa
		if(
			navigator.standalone ||
			window.matchMedia('(display-mode: standalone)').matches
		){
			return true;
		}
		else{
			return false;
		}
	}
}