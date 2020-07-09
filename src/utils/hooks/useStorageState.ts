import { useCallback, useEffect, useState } from 'react';
import { getStorage, setStorage } from '@/utils/storage';

const useStorageState = <T extends Record<string, any>>(key: string, initState?: T, initType = localStorage) => {
  const [storageType, setStorageType] = useState(initType);
  const [value, setValue] = useState<T>({ ...initState, ...getStorage(key, storageType) });
  useEffect(() => setStorage(key, value, storageType), [storageType, key, value]);
  const onChange = useCallback((nextValue, storageLocation?: Storage) => {
    storageLocation && setStorageType(storageLocation);
    setValue(nextValue);
  }, []);
  return { value, onChange };
};
export default useStorageState;
