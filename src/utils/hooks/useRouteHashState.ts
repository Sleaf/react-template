import { useCallback, useEffect } from 'react';
import useDirectState from '@/utils/hooks/useDirectState';

const useHashState = <T extends Nullable<string>>(defaultState?: T, range?: Array<string>) => {
  const { value, onChange: changeState } = useDirectState(defaultState);
  useEffect(() => {
    const currentHash = decodeURIComponent(window.location.hash).slice(1) as T;
    if (!range?.includes(currentHash as string)) {
      changeState(defaultState);
      window.location.hash = (defaultState || '') as string;
    } else if (currentHash) {
      changeState(currentHash);
    } else {
      window.location.hash = (value || '') as string;
    }
  }, [changeState, defaultState, range?.includes, value]);
  const onChange = useCallback(
    nextValue => {
      window.location.hash = nextValue;
      changeState(nextValue);
    },
    [changeState],
  );
  return {
    value,
    onChange,
  };
};

export default useHashState;
