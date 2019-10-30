import axiosFactory, { CancelTokenSource } from 'axios';
import _ from 'lodash';
import { pourIntoURL } from '@/utils/string';
import { HttpStatus } from '@/constants/enums';

const requestPool: Record<string, CancelTokenSource> = {};

export const request = axiosFactory.create({
  headers: {
    'Content-type': 'application/json',
  },
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
  if (sendPayload && typeof sendPayload === 'object') {
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
  });

const UrlMethod = {
  get: (baseURL = '', params: Params = {}, dealParamsWith = pourIntoURL): any => request.get(dealParamsWith(baseURL, params)),
  post: (baseURL = '', params: Params = {}, payload: Params = {}, dealParamsWith = pourIntoURL): any => request.post(dealParamsWith(baseURL, params), payload),
  put: (baseURL = '', params: Params = {}, payload: Params = {}, dealParamsWith = pourIntoURL): any => request.put(dealParamsWith(baseURL, params), payload),
  patch: (baseURL = '', params: Params = {}, payload: Params = {}, dealParamsWith = pourIntoURL): any => request.patch(dealParamsWith(baseURL, params), payload),
  delete: (baseURL = '', params: Params = {}, dealParamsWith = pourIntoURL): any => request.delete(dealParamsWith(baseURL, params)),
};
/*
* 默认声明返回值为never , 需要说明
* */
export const GET = <T = never>([url]: TemplateStringsArray) => (params: Params = {}): Promise<T> => UrlMethod.get(url, params);
export const POST = <T = never>([url]: TemplateStringsArray) => (params: Params = {}, payload: Params = {}): Promise<T> => UrlMethod.post(url, params, payload);
export const PUT = <T = never>([url]: TemplateStringsArray) => (params: Params = {}, payload: Params = {}): Promise<T> => UrlMethod.put(url, params, payload);
export const PATCH = <T = never>([url]: TemplateStringsArray) => (params: Params = {}, payload: Params = {}): Promise<T> => UrlMethod.patch(url, params, payload);
export const DELETE = <T = never>([url]: TemplateStringsArray) => (params: Params = {}): Promise<T> => UrlMethod.delete(url, params);

export default UrlMethod;