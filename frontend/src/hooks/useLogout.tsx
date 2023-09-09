import { IAuthContext } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import logUserOut from '../services/logUserOut';

function useLogout() {
  console.log('useLogout');
  const { auth, setAuth } = useAuth() as IAuthContext;

  const logout = async () => {
    try {
      const res = await logUserOut(auth.accessToken);
      console.log(res);
      localStorage.clear();
      setAuth({ accessToken: '', user: { _id: '', email: '', username: '' } });
    } catch (error) {
      console.error('Caugth an error: ', error);
    }
  };

  return logout;
}

export default useLogout;
