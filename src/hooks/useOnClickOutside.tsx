import {RefObject, useEffect } from 'react';

function useOnClickOutside(ref:RefObject<HTMLElement>, handler:(event: MouseEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside

// Usage
// const [open,setOpen]=useState(false)
// const ref = useRef();
// useOnClickOutside(ref, () => setIsOpen(false));
