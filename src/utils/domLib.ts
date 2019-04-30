export const removeElement = el => el && el.parentNode.removeChild(el);
export const removeClass = (el, className) => el && el.classList.remove(className);
export const setTagTitle = titleName => document.title = titleName;
