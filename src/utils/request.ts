import _ from 'lodash';
import axiosFactory, { AxiosInstance, CancelTokenSource } from 'axios';
import { pourIntoURL } from '@/utils/string';
import { HttpStatus } from '@/constants/enums';

const requestPool: Record<string, CancelTokenSource> = {};

export const request = axiosFactory.create({ baseURL: PUBLIC_PATH, withCredentials: true });

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
  response => response,
  err => {
    const errorMsg = _.get(err.response, 'data.message');
    const errorStatus = _.get(err.response, 'status');
    switch (errorStatus) {
      case HttpStatus.UnprocessableEntity:
        return Promise.reject(err);
      case HttpStatus.InternalServerError:
      default:
        errorMsg && console.error(`Error: ${errorMsg}`, errorStatus);
        return Promise.reject(err);
    }
  },
);

/*
 * 由于拦截器设置，强制声明返回结构
 * */
const toSimpleMethod = (requestMethod: AxiosInstance['get'] | AxiosInstance['delete']) => <T>(
  baseURL = '',
  params?: Params,
  dealParamsWith = pourIntoURL,
): Promise<T> => requestMethod(dealParamsWith(baseURL, params)).then(res => res.data);
const toPayloadMethod = (requestMethod: AxiosInstance['post'] | AxiosInstance['patch'] | AxiosInstance['put']) => <T>(
  baseURL = '',
  params?: Params,
  payload?: Params | string,
  dealParamsWith = pourIntoURL,
): Promise<T> => requestMethod(dealParamsWith(baseURL, params), payload).then(res => res.data);
const UrlMethod = {
  get: toSimpleMethod(request.get),
  post: toPayloadMethod(request.post),
  put: toPayloadMethod(request.put),
  patch: toPayloadMethod(request.patch),
  delete: toSimpleMethod(request.delete),
};

/*
 * 默认声明返回值为any , 需要强制声明可改为never
 * */
type BaseMethodType = typeof UrlMethod;
const toSimpleTemplateReq = <M extends BaseMethodType['get'] | BaseMethodType['delete']>(req: M) => <T = any>([
  url,
]: TemplateStringsArray) => (params?: Params) => req<T>(url, params);

const toPayloadTemplateReq = <M extends BaseMethodType['post'] | BaseMethodType['patch'] | BaseMethodType['put']>(
  req: M,
) => <T = any>([url]: TemplateStringsArray) => (params?: Params, payload?: Params | string) =>
  req<T>(url, params, payload);

export const GET = toSimpleTemplateReq(UrlMethod.get);
export const POST = toPayloadTemplateReq(UrlMethod.post);
export const PATCH = toPayloadTemplateReq(UrlMethod.patch);
export const PUT = toPayloadTemplateReq(UrlMethod.put);
export const DELETE = toSimpleTemplateReq(UrlMethod.delete);

export default UrlMethod;
