import { useEffect, useRef } from 'react';

const events = ['mousedown', 'touchstart'];

const useClickAway = (handler) => {
  const ref = useRef(null);

  const saveHandler = useRef(handler);

  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const handleEvent = (e) => {
      !element.contains(e.target) && saveHandler.current(e);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent);
      }
    };
  }, [ref, saveHandler]);

  return ref;
};

export default useClickAway;
