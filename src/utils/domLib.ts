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

export const isIE = (() => {
  const cachedResult = {};
  return (version?: number, compare?: 'lt' | 'gt'): boolean => {
    const key = version ? (compare ? `is${compare}IE${version}` : `isIE${version}`) : 'isIE';
    let judgeResult = cachedResult[key];
    if (judgeResult != null) {
      return judgeResult;
    }
    if (!version) {
      judgeResult = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;
    } else {
      const match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:|Edge\/)(\d+)/);
      if (match) {
        const v1 = parseInt(match[1], 10);
        judgeResult = compare
          ? compare === 'lt'
            ? v1 < version
            : compare === 'gt'
            ? v1 > version
            : undefined
          : v1 === version;
      } else if (version <= 9) {
        const testElement = document.createElement('b');
        testElement.innerHTML = `<!--[if ${compare || ''} IE ${version}]><i></i><![endif]-->`;
        judgeResult = testElement.getElementsByTagName('i').length === 1;
      } else {
        judgeResult = undefined;
      }
    }
    cachedResult[key] = judgeResult;
    return judgeResult;
  };
})();
