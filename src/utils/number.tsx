import React from 'react';
import { safeFunc } from '@/utils/func';

export type  DataFormatter = (num?: Nullable<number>) => React.ReactNode;

/*
* 测试数字是否为null或不合法
* eg. const a = holderFilter(num) || Func(num);
* */
export const NAN_PLACEHOLDER = '--';
const holderFilter = (number?: Nullable<number>): string | false => typeof number !== 'number' || Number.isNaN(number) ? NAN_PLACEHOLDER : false;
export const toLocaleString = (number?: Nullable<number>, config?: Intl.NumberFormatOptions) => holderFilter(number) || Number(number).toLocaleString('zh', config);
export const toRound = (number?: Nullable<number>, config?: Intl.NumberFormatOptions) => holderFilter(number) || toLocaleString(Math.round(Number(number)), config);
export const toPercent = (number?: Nullable<number>) => toLocaleString(number, { style: 'percent' });
export const toSignificantDigits = (number?: Nullable<number>, digit: number = 3) => toLocaleString(number, {
  minimumSignificantDigits: digit,
  maximumSignificantDigits: digit,
});
export const toPercent1 = (number?: Nullable<number>) => holderFilter(number) || `${toFixed1(Number(number) * 100)}%`;
export const toPercent2 = (number?: Nullable<number>) => holderFilter(number) || `${toFixed2(Number(number) * 100)}%`;
export const toFixed = (number?: Nullable<number>, fractionDigits = 1) => holderFilter(number) || Number(number).toFixed(fractionDigits);
export const toFixed1 = (number?: Nullable<number>) => toFixed(number, 1);
export const toFixed2 = (number?: Nullable<number>) => toFixed(number, 2);
export const formatInt = (number?: Nullable<number>) => toFixed(number, 0);
export const toBn = (number?: Nullable<number>) => holderFilter(number) || `${toFixed2(number)} bn`;
export const toKilo = (number?: Nullable<number>, formatter = toRound) => holderFilter(number) || `${formatter(Number(number) / 1_000)} K`;
export const toMillionn = (number?: Nullable<number>, formatter = toRound) => holderFilter(number) || `${formatter(Number(number) / 1_000_000)} M`;
export const toGiga = (number?: Nullable<number>, formatter = toRound) => holderFilter(number) || `${formatter(Number(number) / 1_000_000_000)} G`;
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
      return toMillionn(number, formatter);
    default:
      return toGiga(number, formatter);
  }
};
export const toIntAutoUnit = (number?: Nullable<number>) => number && number < 1000 ? toRound(number) : toAutoUnit(number, toFixed1);
export const toTimeString = (seconds: Nullable<number>) => {
  if (seconds == null || holderFilter(seconds)) {
    return `${NAN_PLACEHOLDER}:${NAN_PLACEHOLDER}:${NAN_PLACEHOLDER}`;
  }
  seconds = Math.round(seconds);
  let hour, minute, second;
  hour = Math.floor(seconds / 3600);
  seconds %= 3600;
  minute = Math.floor(seconds / 60);
  seconds %= 60;
  second = Math.floor(seconds);
  return [hour, minute, second].map(i => toLocaleString(i, { minimumIntegerDigits: 2 })).join(':');
};
/*
* return first legal number
* */
export const legalNumber = (...numbers: Array<any>) => numbers.find(num => typeof num === 'number' && !Number.isNaN(num));

/*
* return non-zero number or null
* */
export const zeroFilter = (number: number) => number === 0 ? null : number;

const toPostFix = (type: number) => {
  switch (type) {
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
export const toRMB = (number?: Nullable<number>, formatter = toRound) => `￥${formatter(number)}`;
export const toRankText = (rank: number) => holderFilter(rank) || `${~~rank} ${~~rank < 20 ? toPostFix(~~rank) : toPostFix(~~rank % 10)}`;
export const toRankNode = (rank: number, props?: any) => {
  const postfix = ~~rank < 20 ? toPostFix(~~rank) : toPostFix(~~rank % 10);
  return holderFilter(rank) || <span {...props}>{~~rank}<sup>{postfix}</sup></span>
};
export const toCeilSize = (originNum: number, gap: number = 10) => Math.ceil(originNum / gap) * gap;