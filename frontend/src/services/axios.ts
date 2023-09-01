import axios from 'axios';
import { BACKEND_URL } from './config';
export default axios.create({
  baseURL: BACKEND_URL,
});

export const axiosInterceptor = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
