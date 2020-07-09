import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useDirectState from '@/utils/hooks/useDirectState';
import { appendParams, parseQuery } from '@/utils/string';

const useRouteQueryState = <T extends Nullable<string>>(queryString: string, defaultState?: T) => {
  const history = useHistory();
  const { value, onChange } = useDirectState((parseQuery(history.location.search)[queryString] || defaultState) as T);
  useEffect(() => {
    const newSearch = appendParams('', {
      ...parseQuery(history.location.search),
      [queryString]: value,
    });
    if (history.location.search !== newSearch) {
      // 仅在不同的情况下进行跳转
      const routeMethod = history.location.search === '' ? history.replace : history.push;
      routeMethod(`${history.location.pathname}${newSearch}`);
    }
  }, [history, queryString, value]);
  return { value, onChange };
};

export default useRouteQueryState;
