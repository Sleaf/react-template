import { removeClass, removeElement, setTagTitle } from '../domLib';

test('Should remove element', () => {
  const TEST_ID = 'testDiv';
  document.body.innerHTML = `<div id='${TEST_ID}'></div>`;
  const testElement = document.getElementById(TEST_ID);
  expect(document.contains(testElement)).toBe(true);
  removeElement(testElement);
  expect(document.contains(testElement)).toBe(false);
});

test('Should remove class', () => {
  const TEST_ID = 'testDiv';
  const TEST_CLASS = 'testDiv';
  document.body.innerHTML = `<div id='${TEST_ID}' class='${TEST_CLASS}' />`;
  const testElement = document.getElementById(TEST_ID);
  expect(testElement?.classList.contains(TEST_CLASS)).toBe(true);
  removeClass(testElement, '');
  expect(testElement?.classList.contains(TEST_CLASS)).toBe(true);
  removeClass(testElement, TEST_CLASS);
  expect(testElement?.classList.contains(TEST_CLASS)).toBe(false);
});

test('Should set title', () => {
  const TEST_TITLE = 'testTitle';
  setTagTitle(TEST_TITLE);
  expect(document.title).toBe(TEST_TITLE);
});
