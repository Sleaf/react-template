import { doNothing, safeFunc } from '../func';

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
