import { useCallback, useRef, useState } from 'react';
import _ from 'lodash';
import { AnyFunc, safeFunc } from '../func';

const useDirectState = <T>(initState: T, callback?: AnyFunc) => {
  const initStateRef = useRef(_.cloneDeep(initState));
  const [value, setValue] = useState<T>(initStateRef.current);
  const onChange: typeof setValue = useCallback(item => setValue(safeFunc(callback)(item)), [callback]);
  const reset = useCallback(() => onChange(initStateRef.current), [onChange]);
  return { value, onChange, reset };
};

export default useDirectState;
