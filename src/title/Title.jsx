import { useRef, useEffect } from 'react'

export default function Title(title, prevailOnUnmount = false) {
    const defaultTitle = useRef(document.title);
  
    useEffect(() => {
      document.title = title;
    }, [title]);
  
    useEffect(() => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    }, [])
  }
  

