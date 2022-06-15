import { useEffect } from 'react';

const useInfiniteScroll = ({
  target,
  onIntersect,
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    if (!target) {
      return;
    }

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [target, root, rootMargin, onIntersect, threshold]);



  
};

export default useInfiniteScroll;
