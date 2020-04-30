import { useCallback, useEffect, useRef, useState } from 'react';
import { useBoolean } from 'react-hanger';
import _ from 'lodash';
import { PromiseFunc } from '@/utils/func';

type InnerPromiseType<T> = T extends Promise<infer F> ? F : never;
type ResultValueType<F extends PromiseFunc> = InnerPromiseType<ReturnType<F>>;

type Config<F extends PromiseFunc> = {
  cache?: boolean; // 发起请求之前是否还原value
  resetDelay?: number; // 发起请求延迟ms后再重制值，以消除闪烁
};

const useFetchData = <F extends PromiseFunc>(
  fetchFunc: F,
  defaultValue?: Nullable<ResultValueType<F>> | any,
  config?: Config<F>,
) => {
  const cachedDefaultValue = useRef(defaultValue);
  const cachedConfig = useRef(config);
  const [value, setValue] = useState(cachedDefaultValue.current);
  const { value: isTriggered, setValue: setTriggered } = useBoolean(false);
  const { value: isFetching, setValue: setFetching } = useBoolean(false);
  const componentAlive = useRef(true);
  useEffect(() => () => void (componentAlive.current = false), []);
  const cache = _.get(cachedConfig.current, 'cache', false);
  const resetDelay = _.get(cachedConfig.current, 'resetDelay', 0);
  const fetchData = useCallback(
    async (...payloads) => {
      if (typeof fetchFunc !== 'function') {
        return null;
      }
      let resetTimer;
      const handlerReset = () => {
        setValue(cachedDefaultValue.current);
        setFetching(true);
      };
      if (!cache && resetDelay > 0) {
        resetTimer = setTimeout(handlerReset, resetDelay);
      } else {
        handlerReset();
      }
      setTriggered(true);
      try {
        const result = await fetchFunc(...payloads);
        clearTimeout(resetTimer);
        if (componentAlive.current) {
          setValue(result);
          setFetching(false);
          return result;
        }
      } catch (e) {
        // eslint-disable-next-line no-underscore-dangle
        if (componentAlive.current && !e.__CANCEL__) {
          setFetching(false);
        }
      }
      return null;
    },
    [fetchFunc, cache, resetDelay, setFetching, setTriggered],
  );
  const dryFetchData = useCallback(async () => {
    !cache && setValue(cachedDefaultValue.current);
    setFetching(true);
    setTriggered(true);
  }, [cache, setFetching, setTriggered]);
  return {
    value: value as ResultValueType<F>,
    fetchData: fetchData as F,
    dryFetchData, // 假装发出请求，用于启动loading之类的标志
    isFetching,
    isTriggered,
  };
};

export default useFetchData;
