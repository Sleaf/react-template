import { useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useDirectState from '@/utils/hooks/useDirectState';
import { fillURL } from '@/utils/string';

const useRouteParamState = <T extends Nullable<string>>(paramField: string, defaultValue?: T) => {
  const history = useHistory();
  const { path, params } = useRouteMatch();
  const { value, onChange: setValue } = useDirectState<T>(params[paramField] || defaultValue);
  const onChange = useCallback(
    nextValue => {
      setValue(nextValue);
      const baseDist = fillURL(path, { ...params, [paramField]: nextValue });
      const dist = path.includes(`:${paramField}`) ? baseDist : `${baseDist}/${nextValue}`;
      history.push(dist);
    },
    [history, paramField, params, path, setValue],
  );
  return {
    value,
    onChange,
  };
};
export default useRouteParamState;
