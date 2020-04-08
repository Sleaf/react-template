export function removeElement<T extends Nullable<HTMLElement>>(el: T): T {
  if (el) {
    el.parentNode?.removeChild(el as Node);
  }
  return el;
}

export function removeClass<T extends Nullable<HTMLElement>>(el: T, className: string): T {
  if (className.length > 0) {
    el?.classList.remove(className);
  }
  return el;
}

export const setTagTitle = (titleName: string) => (document.title = titleName);
