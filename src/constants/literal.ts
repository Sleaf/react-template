// 可防止由于空对象导致的diff失败重新渲染
export const EmptyArray = (Object.freeze([]) as unknown) as Array<any>;
export const EmptyObject = (Object.freeze({}) as unknown) as object;
