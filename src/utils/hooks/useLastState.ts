import useDirectState from '@/utils/hooks/useDirectState';
import { useEffect } from 'react';

/*
 * 建议使用curValue代替value使用，防止渲染不同步的问题
 * */
const useLastState = <T>(value: T) => {
  const { value: lastValue, onChange: setLastValue } = useDirectState(value);
  const { value: curValue, onChange: setCurValue } = useDirectState(value);
  useEffect(() => {
    if (curValue !== value) {
      setLastValue(curValue);
      setCurValue(value);
    }
  }, [value, curValue, setCurValue, setLastValue]);
  return {
    curValue,
    lastValue,
  };
};
export default useLastState;
