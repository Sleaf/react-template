import {
  NAN_PLACEHOLDER,
  replaceHolder,
  toAutoUnit,
  toFixed,
  toFixed2,
  toPercent,
  toPercent1,
  toPercent2,
  toRankText,
  toRound,
  toSignificantDigits,
  toTimeString,
} from '../number';

test('common utils', () => {
  expect(replaceHolder(NAN_PLACEHOLDER, '***')).toBe('***');
  expect(replaceHolder('2,132,133', '***')).toBe('2,132,133');
});

test('toRound', () => {
  expect(toRound(1.213)).toBe('1');
  expect(toRound(213214.2313213)).toBe('213,214');
  expect(toRound()).toBe(NAN_PLACEHOLDER);
  expect(toRound(null)).toBe(NAN_PLACEHOLDER);
  expect(toRound(0)).toBe('0');
  expect(toRound(-0)).toBe('0');
  expect(toRound(-0.3)).toBe('0');
});

test('toSignificantDigits', () => {
  expect(toSignificantDigits()).toBe(NAN_PLACEHOLDER);
  expect(toSignificantDigits(null)).toBe(NAN_PLACEHOLDER);
  expect(toSignificantDigits(1)).toBe('1.00');
  expect(toSignificantDigits(1, 2)).toBe('1.0');
  expect(toSignificantDigits(0, 2)).toBe('0.0');
  expect(toSignificantDigits(0.3234464, 2)).toBe('0.32');
  expect(toSignificantDigits(0.3654, 2)).toBe('0.37');
  expect(toSignificantDigits(1354153.2416165, 2)).toBe('1,400,000');
});

test('toFixed', () => {
  expect(toFixed()).toBe(NAN_PLACEHOLDER);
  expect(toFixed(null)).toBe(NAN_PLACEHOLDER);
  expect(toFixed(1)).toBe('1.0');
  expect(toFixed(1, 2)).toBe('1.00');
  expect(toFixed(0.3234464, 2)).toBe('0.32');
  expect(toFixed(0.3654, 2)).toBe('0.37');
  expect(toFixed(1354153.2416165, 2)).toBe('1354153.24');
});

test('toPercent', () => {
  expect(toPercent()).toBe(NAN_PLACEHOLDER);
  expect(toPercent(null)).toBe(NAN_PLACEHOLDER);
  expect(toPercent(1)).toBe('100%');
  expect(toPercent(-0.3)).toBe('-30%');
  expect(toPercent(-0.31654)).toBe('-32%');
  expect(toPercent(-0.0000002)).toBe('0%');
  expect(toPercent1(-0.3)).toBe('-30.0%');
  expect(toPercent2(-0.3)).toBe('-30.00%');
  expect(toPercent2(1)).toBe('100.00%');
  expect(toPercent2(0.3234464)).toBe('32.34%');
  expect(toPercent2(0.3654)).toBe('36.54%');
  expect(toPercent2(-0)).toBe('0.00%');
});

test('toUnit', () => {
  expect(toAutoUnit()).toBe(NAN_PLACEHOLDER);
  expect(toAutoUnit(null)).toBe(NAN_PLACEHOLDER);
  expect(toAutoUnit(20)).toBe('20');
  expect(toAutoUnit(8000)).toBe('8K');
  expect(toAutoUnit(8021321300)).toBe('8G');
  expect(toAutoUnit(8021321300, toFixed2)).toBe('8.02G');
});

test('toTimeString', () => {
  expect(toTimeString(undefined)).toBe(`${NAN_PLACEHOLDER}:${NAN_PLACEHOLDER}:${NAN_PLACEHOLDER}`);
  expect(toTimeString(null)).toBe(`${NAN_PLACEHOLDER}:${NAN_PLACEHOLDER}:${NAN_PLACEHOLDER}`);
  expect(toTimeString(20)).toBe('00:00:20');
  expect(toTimeString(80)).toBe('00:01:20');
});

test('toRankText', () => {
  expect(toRankText(undefined)).toBe(NAN_PLACEHOLDER);
  expect(toRankText(null)).toBe(NAN_PLACEHOLDER);
  expect(toRankText(1)).toBe('1st');
  expect(toRankText(2)).toBe('2nd');
  expect(toRankText(3)).toBe('3rd');
  expect(toRankText(7)).toBe('7th');
  expect(toRankText(11)).toBe('11th');
  expect(toRankText(12)).toBe('12th');
  expect(toRankText(13)).toBe('13th');
  expect(toRankText(21)).toBe('21st');
  expect(toRankText(102)).toBe('102nd');
  expect(toRankText(-43)).toBe('-43rd');
});
