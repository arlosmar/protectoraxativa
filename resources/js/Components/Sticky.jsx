import { useEffect, useRef, useState } from 'react';
import { isAppOrWebApp } from "@/Utils/Device";

export default function Sticky(){

    const stickyRef = useRef(null);
    const [ isApplicationOrWebApp , setIsApplicationOrWebApp ] = useState(isAppOrWebApp());
    const [sticky, setSticky] = useState(isApplicationOrWebApp ? true : false);
    const [ extraOffset, setExtraOffset ] = useState(isApplicationOrWebApp ? 10 : 17);
    const [offset, setOffset] = useState(0);
    const [height, setHeight] = useState(0);
    
    useEffect(() => {
        if(stickyRef.current){
            setOffset(stickyRef.current.offsetTop);     
            setHeight(stickyRef.current.offsetHeight+extraOffset); // 20 because of padding/margin
        }
    }, [stickyRef]);

    useEffect(() => {
        if(!isApplicationOrWebApp){
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    },[offset]);

    const handleScroll = () => {
        setSticky(window.scrollY > offset);        
    };

    return { stickyRef, sticky, offset, height, isApplicationOrWebApp };
};
