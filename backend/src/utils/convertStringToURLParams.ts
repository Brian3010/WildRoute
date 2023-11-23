import { URLSearchParams } from 'url';

const convertStringToURLParams = (value: string) => {
  return new URLSearchParams({ q: value }).toString().slice(2);
};
export default convertStringToURLParams;
