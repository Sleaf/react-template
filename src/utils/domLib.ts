export const removeElement = (el: HTMLElement | null) => el && el.parentNode && el.parentNode.removeChild(el);
export const removeClass = (el: HTMLElement | null, className: string) => el && el.classList.remove(className);
export const setTagTitle = (titleName: string) => document.title = titleName;
