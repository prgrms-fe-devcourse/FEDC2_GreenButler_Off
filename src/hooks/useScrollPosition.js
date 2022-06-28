import useSessionStorage from './useSessionStorage';

const SCROLL_POSITION_KEY = 'prevPostIndex';

export default () => useSessionStorage(SCROLL_POSITION_KEY, 0);
