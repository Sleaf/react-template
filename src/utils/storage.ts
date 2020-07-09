export const storageEncode = (value: string) => btoa(value);
export const storageDecode = (value: string) => atob(value);

export const setStorage = <T extends Record<string, any>>(key: string, authInfo: T, storage = localStorage) =>
  storage.setItem(key, storageEncode(JSON.stringify(authInfo)));

export const getStorage = (key: string, storage = localStorage) => {
  const rawData = storage.getItem(key);
  try {
    return rawData && JSON.parse(storageDecode(rawData));
  } catch (e) {
    return null;
  }
};
