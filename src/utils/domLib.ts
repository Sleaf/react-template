type Element = HTMLElement | null;

export function removeElement(el: Element): Element {
  if (el !== null) {
    el.parentNode!.removeChild(el)
  }
  return el;
}

export function removeClass(el: Element, className: string): Element {
  if (className.length > 0) {
    el!.classList!.remove(className);
  }
  return el;
}

export const setTagTitle = (titleName: string) => document.title = titleName;
