import _ from 'lodash';
import { doNothing } from '@/utils/func';

export enum Splitter {
  PATH_COLON = ':',
  COLON = ':',
  BRACE = '{}',
  DOR_BRACE = '${}',
  PARENTHESES = '()',
  SQR_BRACKET = '[]',
}

const getSplitterReg = (splitter: Splitter) => {
  switch (splitter) {
    case Splitter.PATH_COLON:
      return /:(\w+)(?=\/?)/g;
    case Splitter.COLON:
      return /:(\w+)/g;
    case Splitter.BRACE:
      return /{(\w+)}/g;
    case Splitter.DOR_BRACE:
      return /\${(\w+)}/g;
    case Splitter.PARENTHESES:
      return /\((\w+)\)/g;
    case Splitter.SQR_BRACKET:
      return /\[(\w+)]/g;
    default:
      return '';
  }
};

export const fillParamsToString = (
  str: string,
  params: Params,
  splitter = Splitter.BRACE,
  callback: (paramKey: string) => any = doNothing,
) => str && params
  ? str.replace(getSplitterReg(splitter), (match: string, paramKey: string) => {
    callback(paramKey);
    const param = params[paramKey];
    return param != null ? String(param) : '';
  })
  : str;

/**
 * @example appendParams('www.foo.com',{bar:'baz',aaa:1}) // return 'www.foo.com?bar=baz&aaa=1'
 * */
export const appendParams = (URL = window.location.origin, params: Params = {}) =>
  Object.entries(params).filter(([key, value]) => value)
    .reduce((acc, [key, value], index) => `${acc + (index > 0 || acc.includes('?') ? '&' : '?')}${key}=${value}`, URL);

/**
 * @example fillURL('user/:id/info',{id:123,aaa:1}) // return '/user/123/info'
 * */
export const fillURL = (
  template = '',
  params: Params = {},
  splitter = Splitter.PATH_COLON,
  callback = doNothing,
) => fillParamsToString(template, params, splitter, callback);

/**
 * @example fillURL('user/:id/info',{id:123,aaa:1}) // return '/user/123/info?aaa=1'
 * */
export const pourIntoURL = (template = '', params: Params = {}, splitter = Splitter.PATH_COLON) => {
  let restParams = { ...params };
  const filledURL = fillURL(template, params, splitter, (paramKey: string) => restParams = _.omit(restParams, paramKey));
  return appendParams(filledURL, restParams);
};

/**
 * @example parseQuery('http:www.baidu.com/index?name=username&age=27&pwd=zbc|123@&likes=lol&likes=beautifull girl&$id=main#flag=66')
 * // return
 * { name: 'username',
 *   age: '27',
 *   pwd: 'zbc|123@',
 *   likes: [ 'lol', 'beautifull girl' ],
 *   '$id': 'main'
 * }
 * */
export const parseQuery = (template = '') => {
  const queryObj: Record<string, string | Array<string>> = {};
  const reg = /[?&]([^=&#]+)=([^&#]*)/g;
  const matches = template.match(reg);
  if (matches) {
    for (const match of Object.values(matches)) {
      const query = match.split('=');
      const key = query[0].substr(1);
      const value = query[1];
      if (queryObj[key]) {
        queryObj[key] = ([] as Array<string>).concat(queryObj[key], value);
      } else {
        queryObj[key] = value;
      }
    }
  }
  return queryObj;
};

/*
* 代替 String#match 使用
* */
export const getRegxOrder = (template: string, regexp: string | RegExp, path: string | number): string =>
  _.get(template.match(regexp), path) || '';
