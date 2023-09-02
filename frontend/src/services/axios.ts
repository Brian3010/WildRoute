import axios from 'axios';
import { BACKEND_URL } from './config';
export default axios.create({
  baseURL: BACKEND_URL,
});

export const axiosInterceptor = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

// axiosInterceptor.interceptors.request.use(
//   config => {
//     // if (!config.headers['Authorization']) {
//     //   config.headers['Authorization'] = `bearer ${auth.accessToken}`;
//     // }
//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error)
// );

// // response interceptor
// axiosInterceptor.interceptors.response.use(
//   response => response,
//   async (error: AxiosError<{ error: string }>) => {
//     const originalRequest = error.config;

//     if (
//       originalRequest &&
//       error.response?.status === 403 &&
//       error.response.data.error === 'jwt expired' &&
//       !originalRequest.sent
//     ) {
//       originalRequest.sent = true; // prevent infinite loop
//       console.log('interceptor running');
//       const newAccessToken = await getRefreshToken(); // get new access token
//       originalRequest.headers['Authorization'] = `bearer ${newAccessToken}`;
//       return axiosInterceptor(originalRequest); // making the request again
//     }
//   }
// );
