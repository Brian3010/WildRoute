import { URLSearchParams } from 'url';

// contert a string to url query
export const convertStringToURLParams = (value: string) => {
  return new URLSearchParams({ q: value }).toString().slice(2);
};

// convert a string to lower case
// export const convertStringToLowerCase = (value: string) => value.toLowerCase();
