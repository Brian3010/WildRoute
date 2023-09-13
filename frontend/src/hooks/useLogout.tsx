import { IAuthContext } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
// import logUserOut from '../services/logUserOut';
import useAxiosInterceptor from './useAxiosInterceptor';

function useLogout() {
  console.log('useLogout');
  const { auth, setAuth } = useAuth() as IAuthContext;
  const axiosInterceptor = useAxiosInterceptor();

  const logout = async () => {
    try {
      const res = await axiosInterceptor.get('/user/logout', {
        headers: { Authorization: `bearer ${auth.accessToken}` },
        withCredentials: true,
      });
      console.log(res);
      localStorage.clear();
      setAuth({ accessToken: '', user: { _id: '', email: '', username: '' } });
      return res;
    } catch (error) {
      console.error('Caugth an error: ', error);
    }
  };

  return logout;
}

export default useLogout;
