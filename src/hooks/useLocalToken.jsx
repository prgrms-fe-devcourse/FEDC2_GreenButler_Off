import useLocalStorage from './useLocalStrorage';

const LOCAL_TOKEN_KEY = 'token';

export default () => useLocalStorage(LOCAL_TOKEN_KEY, '');
