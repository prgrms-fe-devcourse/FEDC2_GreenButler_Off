import { useRef, useState, useCallback, useEffect } from 'react';

const useHover = () => {
  const [isHover, setIsHover] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = useCallback(() => setIsHover(true), []);
  const handleMouseOut = useCallback(() => setIsHover(false), []);

  useEffect(() => {
    const { current: element } = ref;
    if (!element) {
      return;
    }

    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseout', handleMouseOut);

    return () => {
      element.removeEventListener('mouseover', handleMouseOver);
      element.removeEventListener('mouseout', handleMouseOut);
    };
  }, [ref, handleMouseOver, handleMouseOut]);

  return [ref, isHover];
};

export default useHover;
