import useLocalStorage from './useLocalStrorage';

const LOCAL_TOKEN_KEY = 'greenButlerUserToken';

export default () => useLocalStorage(LOCAL_TOKEN_KEY, '');
