import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useBoolean } from 'react-hanger';
import _ from 'lodash';
import { PromiseFunc } from '@/utils/func';

type Result<F, R> = {
  value: R;
  fetchData: F;
  dryFetchData: () => Promise<void>; // 假装发出请求
  isTriggered: boolean;
  isFetching: boolean;
  isFetched: boolean;
};

type InnerPromiseType<T> = T extends Promise<infer F> ? F : never;
type ResultValueType<F extends PromiseFunc> = InnerPromiseType<ReturnType<F>>;

type Config<F extends PromiseFunc> = {
  cache?: boolean; // 发起请求之前是否还原value
};

const useFetchData = <F extends PromiseFunc>(
  fetchFunc: F,
  defaultValue?: ResultValueType<F> | any,
  config?: Config<F>,
): Result<F, ResultValueType<F>> => {
  const cachedDefaultValue = useRef(defaultValue);
  const cachedConfig = useRef(config);
  const [value, setValue] = useState(cachedDefaultValue.current);
  const { value: isTriggered, setValue: setTriggered } = useBoolean(false);
  const { value: isFetching, setValue: setFetching } = useBoolean(false);
  const { value: isFetched, setValue: setFetched } = useBoolean(false);
  const componentAlive = useRef(true);
  useLayoutEffect(() => () => void (componentAlive.current = false), []);
  const fetchData = useCallback(
    async (...payloads) => {
      const cache = _.get(cachedConfig.current, 'cache', false);
      !cache && setValue(cachedDefaultValue.current);
      setFetched(false);
      setFetching(true);
      setTriggered(true);
      try {
        const result = await fetchFunc(...payloads);
        if (componentAlive.current) {
          setValue(result);
          setFetched(true);
          return result;
        }
      } finally {
        if (componentAlive.current) {
          setFetching(false);
        }
      }
      return null;
    },
    [fetchFunc, setFetched, setFetching, setTriggered],
  );
  const dryFetchData = useCallback(async () => {
    const cache = _.get(cachedConfig.current, 'cache', false);
    !cache && setValue(cachedDefaultValue.current);
    setFetched(false);
    setFetching(true);
    setTriggered(true);
  }, [setFetched, setFetching, setTriggered]);
  return {
    value: value as ResultValueType<F>,
    fetchData: fetchData as F,
    dryFetchData,
    isFetched,
    isFetching,
    isTriggered,
  };
};

export default useFetchData;
