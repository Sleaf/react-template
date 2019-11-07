import { useCallback, useState } from 'react';
import { AnyFunc, safeFunc } from '../func';

const useDirectState = <T>(initState: T, callback?: AnyFunc) => {
  const [value, setValue] = useState<T>(initState);
  const onChange = useCallback((value: T) => setValue(safeFunc(callback)(value)), []);
  return { value, onChange };
};

export default useDirectState;