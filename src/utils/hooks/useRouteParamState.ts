import { useEffect } from 'react';
import { usePrevious } from 'react-hanger';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useDirectState from '@/utils/hooks/useDirectState';
import { fillURL } from '@/utils/string';

const useRouteParamState = <T extends Nullable<string>>(paramField: string, defaultValue?: T) => {
  const history = useHistory();
  const { url, path, params } = useRouteMatch();
  const { value, onChange } = useDirectState<T>(params[paramField] || defaultValue);
  const prvPath = usePrevious(path);
  useEffect(() => {
    const filledURL = fillURL(path.replace(/\/+$/, ''), { ...params, [paramField]: value });
    if (path.includes(`:${paramField}`)) {
      // path中存在这个参数
      if (paramField in params && params[paramField] !== value) {
        // 如果当前param没有值则跳转至该值
        history.push(filledURL);
      }
    } else if (!prvPath || path.includes(prvPath)) {
      // prvPath不存在或Path包含prvPath
      if (value) {
        // value有值则推入这个参数
        // 当没有存在路由时可能会爆栈
        history.replace(`${filledURL}/${value}`);
      }
    } else {
      onChange(params[paramField]);
    }
  }, [history, onChange, paramField, params, path, prvPath, url, value]);
  return {
    value,
    onChange,
  };
};

export default useRouteParamState;
