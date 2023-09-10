import { useContext } from 'react';
import AuthContext, { IAuthContext } from '../context/AuthProvider';

const useAuth = () => {
  return useContext(AuthContext) as IAuthContext;
};


export default useAuth;
