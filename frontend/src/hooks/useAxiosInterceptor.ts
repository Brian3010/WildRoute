import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { IAuthContext } from '../context/AuthProvider';
import { axiosInterceptor } from '../services/axios';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

const useAxiosInterceptor = () => {
  const refreshToken = useRefreshToken();
  const { auth } = useAuth() as IAuthContext;

  useEffect(() => {
    const requestInterceptor = axiosInterceptor.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // response interceptor 
    const responseInterceptor = axiosInterceptor.interceptors.response.use(
      response => response,
      async (error: AxiosError<{ error: string }>) => {
        const originalRequest = error.config;

        if (
          originalRequest &&
          error.response?.status === 403 &&
          error.response.data.error === 'jwt expired' &&
          !originalRequest.sent
        ) {
          originalRequest.sent = true; // prevent infinite loop
          console.log('interceptor running');
          const newAccessToken = await refreshToken(); // get new access token
          originalRequest.headers['Authorization'] = `bearer ${newAccessToken}`;
          return axiosInterceptor(originalRequest); // making the request again
        }
      }
    );

    return () => {
      // clear the interceptor's setup
      axiosInterceptor.interceptors.request.eject(requestInterceptor);
      axiosInterceptor.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refreshToken]);

  return axiosInterceptor;
};

export default useAxiosInterceptor;
