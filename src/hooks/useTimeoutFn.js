import { useRef, useCallback, useEffect } from 'react';

const useTimeoutFn = (fn, ms) => {
  const timeoutId = useRef();
  const cb = useRef(fn);

  useEffect(() => {
    cb.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      cb.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  useEffect(clear, [clear]);

  return [run, clear];
};

export default useTimeoutFn;
