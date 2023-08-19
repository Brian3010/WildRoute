export type TypeMapper<T, U> = {
  [Key in keyof T]: U;
};
