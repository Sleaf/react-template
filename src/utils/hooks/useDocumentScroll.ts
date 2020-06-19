import { useEffect } from 'react';
import _ from 'lodash';

type Callback = (scrollTop: number, info: HTMLElement) => void;
type Config = {
  debounce?: number;
};

export default (func: Callback, config?: Config) => {
  const debounceTime = config?.debounce;
  useEffect(() => {
    const debounced = debounceTime ? _.debounce(func, debounceTime) : func;
    const handler = () => {
      const htmlElement = window.document.documentElement ?? window.document.body;
      const scrollTop = htmlElement.scrollTop || window.pageYOffset || 0; // 当前滚动条距离顶部高度
      debounced(scrollTop, htmlElement);
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [func, debounceTime]);
};
