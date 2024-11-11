import { useEffect, useRef, useState } from 'react';

export default function Sticky(){

    const stickyRef = useRef(null);
    const [sticky, setSticky] = useState(false);
    const [offset, setOffset] = useState(0);
    
    useEffect(() => {
        if(stickyRef.current){          
            setOffset(stickyRef.current.offsetTop);            
        }
    }, [stickyRef]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[offset]);

    const handleScroll = () => {    
        setSticky(window.scrollY > offset);
    };

    return { stickyRef, sticky, offset };
};
