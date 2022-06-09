import { useCallback, useState } from 'react';

const useToggle = (currentState = false) => {
  const [state, setState] = useState(currentState);

  const handleToggle = useCallback(() => setState((state) => !state), []);

  return [state, handleToggle];
};

export default useToggle;
