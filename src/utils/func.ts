import _ from 'lodash';

export type AnyFunc<T = any> = (...args: Array<any>) => T;
export type PromiseFunc<T = any> = (...args: Array<any>) => Promise<T>;
export type NoArgsFunc<T = any> = () => T;

/*
 * 接受参数并返回第一个参数
 * */
export const doNothing: AnyFunc = raw => raw;

/*
 * 拼接函数，抛弃所有返回值
 * */
export const compose = (funArr: Array<AnyFunc> = []) => (...runtimeParams: Array<any>): void => {
  for (const func of funArr) {
    if (typeof func === 'function') {
      func(...runtimeParams);
    }
  }
};

/*
 * 安全调用函数
 * 传入可能为不可call
 * 返回安全的函数，
 * */
export const safeFunc = <T extends AnyFunc>(func: Nullable<T>) => (func && _.isFunction(func) ? func : doNothing);

/*
 * 安全调用可能为工厂函数的参数
 * 如果传入对应类型，则传出（）=> T
 * 如果传入工厂方法，则直接传出
 * */
type ParamType<T> = T extends (...args: infer P) => any ? P : any;
type ReturnType<T> = T extends (...args: any) => infer R ? R : T;
type ReturnFunc<T> = (...arg: ParamType<T>) => ReturnType<T>;
export const factoryCall = <T>(param: T): ReturnFunc<T> => (_.isFunction(param) ? param : () => param as ReturnType<T>);
