import React from 'react';
import { safeFunc } from './func';

export const NAN_PLACEHOLDER = '--';
export type DataFormatter = (num?: Nullable<number>) => React.ReactNode;

/*
 * 测试数字是否为null或不合法
 * eg. const a = holderFilter(num) || Func(num);
 * */
const holderFilter = (number?: Nullable<number>) =>
  typeof number !== 'number' || Number.isNaN(number) ? NAN_PLACEHOLDER : false;

/*
 * 替换placeholder
 * */
export const replaceHolder = (res: string, newPlaceholder = NAN_PLACEHOLDER) =>
  res === NAN_PLACEHOLDER ? newPlaceholder : res;

/*
 * 格式化数字
 * */
export const toLocaleString = (number?: Nullable<number>, config?: Intl.NumberFormatOptions) =>
  holderFilter(number) ||
  Number(number)
    .toLocaleString('zh', config)
    .replace(/-0([.0%]*)$/, (...args) => `0${args[1]}`);

/*
 * 四舍五入为带分隔符的整数字符串
 * 并转化-0
 * */
export const toRound = (number?: Nullable<number>, config?: Intl.NumberFormatOptions) =>
  holderFilter(number) || toLocaleString(Math.round(Number(number)), config);

/*
 * 保留有效位数
 * */
export const toSignificantDigits = (number?: Nullable<number>, digits = 3, configs?: Intl.NumberFormatOptions) =>
  toLocaleString(number, {
    ...configs,
    minimumSignificantDigits: digits,
    maximumSignificantDigits: digits,
  });

/*
 * 取相关位数整数
 * */
export const toFixed = (number?: Nullable<number>, fractionDigits = 1) =>
  holderFilter(number) || Number(number).toFixed(fractionDigits);
export const toFixed1 = (number?: Nullable<number>) => toFixed(number, 1);
export const toFixed2 = (number?: Nullable<number>) => toFixed(number, 2);

/*
 * 取相关精度百分数
 * */
export const toPercent = (number?: Nullable<number>, fractionDigits = 0) =>
  toLocaleString(number, {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
export const toPercent1 = (number?: Nullable<number>) => toPercent(number, 1);
export const toPercent2 = (number?: Nullable<number>) => toPercent(number, 2);

/*
 * 取相关单位缩进
 * */
export const toKilo = (number?: Nullable<number>, formatter = toRound) =>
  holderFilter(number) || `${formatter(Number(number) / 1_000)}K`;
export const toMillion = (number?: Nullable<number>, formatter = toRound) =>
  holderFilter(number) || `${formatter(Number(number) / 1_000_000)}M`;
export const toGiga = (number?: Nullable<number>, formatter = toRound) =>
  holderFilter(number) || `${formatter(Number(number) / 1_000_000_000)}G`;
export const toAutoUnit = (number?: Nullable<number>, formatter = toRound) => {
  const holder = holderFilter(number);
  if (holder) {
    return holder;
  }
  switch (true) {
    case Number(number) < 1_000:
      return safeFunc(formatter)(number);
    case Number(number) < 1_000_000:
      return toKilo(number, formatter);
    case Number(number) < 1_000_000_000:
      return toMillion(number, formatter);
    default:
      return toGiga(number, formatter);
  }
};

/*
 * 格式化时间格式
 * */
export const toTimeString = (seconds: Nullable<number>) => {
  if (seconds == null || holderFilter(seconds)) {
    return `${NAN_PLACEHOLDER}:${NAN_PLACEHOLDER}:${NAN_PLACEHOLDER}`;
  }
  seconds = Math.round(seconds);
  const hour = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minute = Math.floor(seconds / 60);
  seconds %= 60;
  const second = Math.floor(seconds);
  return [hour, minute, second].map(i => toLocaleString(i, { minimumIntegerDigits: 2 })).join(':');
};

/*
 * 格式化为排名
 * */
const toPostFix = (rawValue: number) => {
  const symbolValue = Math.ceil(Math.abs(rawValue)) % 100;
  const numberType = symbolValue < 20 ? symbolValue : symbolValue % 10;
  switch (numberType) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
export const toRankText = (rank: Nullable<number>) =>
  holderFilter(rank) || `${Math.ceil(Number(rank))}${toPostFix(Number(rank))}`;
export const toRankNode = (rank: Nullable<number>, props?: any) =>
  holderFilter(rank) || (
    <span {...props}>
      {Math.ceil(Number(rank))}
      <sup>{toPostFix(Number(rank))}</sup>
    </span>
  );
