import { IAuthContext } from '../context/AuthProvider';
import getRefreshToken from '../services/getRefreshToken';
import useAuth from './useAuth';
// import from '../hooks/useAuth';

const useRefeshToken = () => {
  const { auth, setAuth } = useAuth() as IAuthContext;

  const refreshToken = async () => {
    const data = await getRefreshToken(auth.user._id, auth.user.username);
    console.log('file: useRefreshToken.ts:13 ~ refresh ~ res:', data);
    return data
  };

  return refreshToken;
};

export default useRefeshToken;
