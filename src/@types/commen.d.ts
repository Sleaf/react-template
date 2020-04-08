// modules
// ...

// global define, see `DefinePlugin`
declare const isPrd: boolean; // 是否为prd
declare const isDev: boolean; // 是否为dev
declare const isWindows: boolean; // 是否为windows

// alias
declare type Nullable<T> = T | null | undefined;
declare type InnerNullable<T> = {
  [P in keyof T]: T[P] | null | undefined;
};
declare type Timestamp = number;
declare type ISODateString = string;
declare type Params = Record<string, any>;
declare type LabelValue<T = string, V = any> = {
  label: T;
  value: V;
};
