import { removeClass, removeElement, setTagTitle } from "../domLib";

test('Should remove element', () => {
  const TEST_ID = 'testDiv';
  document.body.innerHTML = `<div id='${TEST_ID}'></div>`;
  const testElment = document.getElementById(TEST_ID);
  expect(document.contains(testElment)).toBe(true);
  removeElement(testElment);
  expect(document.contains(testElment)).toBe(false);
});

test('Should remove class', () => {
  const TEST_ID = 'testDiv';
  const TEST_CLASS = 'testDiv';
  document.body.innerHTML = `<div id='${TEST_ID}' class='${TEST_CLASS}' />`;
  const testElment = document.getElementById(TEST_ID);
  expect(testElment!.classList.contains(TEST_CLASS)).toBe(true);
  removeClass(testElment, '');
  expect(testElment!.classList.contains(TEST_CLASS)).toBe(true);
  removeClass(testElment, TEST_CLASS);
  expect(testElment!.classList.contains(TEST_CLASS)).toBe(false);
});

test('Should set title', () => {
  const TEST_TITLE = 'testTitle';
  setTagTitle(TEST_TITLE);
  expect(document.title).toBe(TEST_TITLE);
});

