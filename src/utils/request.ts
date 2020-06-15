import axiosFactory, { CancelTokenSource } from 'axios';
import _ from 'lodash';
import { pourIntoURL } from '@/utils/string';
import { HttpStatus } from '@/constants/enums';

const requestPool: Record<string, CancelTokenSource> = {};

export const request = axiosFactory.create({
  withCredentials: true,
});

request.interceptors.request.use(config => {
  // 防止重复发送
  const sendPath = config.url || '';
  // const sendPath = sendURL.includes('?') ? getRegxOrder(sendURL, /.+?(?=\?)/, 0) : sendURL;
  let source = requestPool[sendPath];
  source && source.cancel();
  source = axiosFactory.CancelToken.source();
  requestPool[sendPath] = source;
  config.cancelToken = source.token;
  // 序列化JS对象
  const sendPayload = config.data;
  if (sendPayload && !config.headers['Content-Type'] && typeof sendPayload === 'object') {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
    };
    config.data = JSON.stringify(sendPayload);
  }
  return config;
});

request.interceptors.response.use(
  response => response.data,
  err => {
    const errorMsg = _.get(err.response, 'data.message');
    const errorStatus = _.get(err.response, 'status');
    switch (errorStatus) {
      case HttpStatus.UnprocessableEntity:
        return Promise.reject(err);
      case HttpStatus.InternalServerError:
      default:
        errorMsg && console.error(`Error: ${errorMsg}`, 0);
        return Promise.reject(err);
    }
  },
);

/*
 * 由于拦截器设置，强制声明返回结构
 * */
const UrlMethod = {
  get: <T>(baseURL = '', params?: Params, dealParamsWith = pourIntoURL): Promise<T> =>
    request.get(dealParamsWith(baseURL, params)),
  post: <T>(baseURL = '', params?: Params, payload?: Params | string, dealParamsWith = pourIntoURL): Promise<T> =>
    request.post(dealParamsWith(baseURL, params), payload),
  put: <T>(baseURL = '', params?: Params, payload?: Params | string, dealParamsWith = pourIntoURL): Promise<T> =>
    request.put(dealParamsWith(baseURL, params), payload),
  patch: <T>(baseURL = '', params?: Params, payload?: Params | string, dealParamsWith = pourIntoURL): Promise<T> =>
    request.patch(dealParamsWith(baseURL, params), payload),
  delete: <T>(baseURL = '', params?: Params, dealParamsWith = pourIntoURL): Promise<T> =>
    request.delete(dealParamsWith(baseURL, params)),
};

/*
 * 默认声明返回值为any , 需要强制声明可改为never
 * */
export const GET = <T = any>([url]: TemplateStringsArray) => (params?: Params) => UrlMethod.get<T>(url, params);
export const POST = <T = any>([url]: TemplateStringsArray) => (params?: Params, payload?: Params | string) =>
  UrlMethod.post<T>(url, params, payload);
export const PUT = <T = any>([url]: TemplateStringsArray) => (params?: Params, payload?: Params | string) =>
  UrlMethod.put<T>(url, params, payload);
export const PATCH = <T = any>([url]: TemplateStringsArray) => (params?: Params, payload?: Params | string) =>
  UrlMethod.patch<T>(url, params, payload);
export const DELETE = <T = any>([url]: TemplateStringsArray) => (params?: Params) => UrlMethod.delete<T>(url, params);

export default UrlMethod;
