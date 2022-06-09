const storage = sessionStorage;

export const getItem = (key, defaultValue) => {
  try {
    const item = JSON.parse(storage.getItem(key));

    if (item) {
      return item;
    }

    return defaultValue;
  } catch (e) {
    console.error(e);

    return defaultValue;
  }
};
export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};
