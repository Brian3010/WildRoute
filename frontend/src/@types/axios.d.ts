import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    sent?: boolean;
  }
}
