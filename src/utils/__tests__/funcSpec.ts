import { doNothing, factoryCall, safeFunc } from '../func';

test('Should do nothing', () => {
  expect(doNothing(1)).toBe(1);
  expect(doNothing(null)).toBe(null);
  expect(doNothing()).toBe(undefined);
  expect(doNothing(1, 2, 3, 4)).toBe(1);
});

test('Should be safe', () => {
  expect(safeFunc(null)()).toBe(undefined);
  expect(safeFunc(() => 1)()).toBe(1);
  expect(safeFunc(doNothing)(2)).toBe(2);
  expect(safeFunc(doNothing)).toBe(doNothing);
});

test('factory call', () => {
  expect(factoryCall(null)()).toBe(null);
  expect(factoryCall(() => 1)()).toBe(1);
  expect(factoryCall(doNothing)(2)).toBe(2);
  expect(factoryCall(2)(3)).toBe(2);
  const test: string | (() => string) = 'hello';
  const testFunc: string | ((name: string) => string) = (name: string) => `hello ${name}`;
  expect(factoryCall(test)(3)).toBe(test);
  expect(factoryCall(testFunc)('world')).toBe('hello world');
});
