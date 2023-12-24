/**
 * map through property T and assign type U to it.
 */
export type TypeMapper<T, U> = {
  [Key in keyof T]: U;
};
