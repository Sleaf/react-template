import { useCallback, useEffect, useRef, useState } from 'react';
import { useBoolean } from 'react-hanger';
import _ from 'lodash';
import { PromiseFunc } from '@/utils/func';

type InnerPromiseType<T> = T extends Promise<infer F> ? F : never;
type ResultValueType<F extends PromiseFunc> = InnerPromiseType<ReturnType<F>>;

type Config<F extends PromiseFunc> = {
  cache?: boolean; // 发起请求之前是否还原value
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
  const fetchData = useCallback(
    async (...payloads) => {
      !cache && setValue(cachedDefaultValue.current);
      setFetching(true);
      setTriggered(true);
      try {
        const result = await fetchFunc(...payloads);
        if (componentAlive.current) {
          setValue(result);
          return result;
        }
      } finally {
        if (componentAlive.current) {
          setFetching(false);
        }
      }
      return null;
    },
    [fetchFunc, cache, setFetching, setTriggered],
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
