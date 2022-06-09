import { useEffect } from 'react';
import useTimeoutFn from './useTimeoutFn';

const useTimout = (fn, ms) => {
  const [run, clear] = useTimeoutFn(fn, ms);

  useEffect(() => {
    run();
    return clear;
  }, [run, clear]);

  return clear;
};

export default useTimout;
