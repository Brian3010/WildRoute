import axios from 'axios';
import { IAuthContext } from '../context/AuthProvider';
import useAuth from './useAuth';
// import from '../hooks/useAuth';

const useRefeshToken = () => {
  const { setAuth } = useAuth() as IAuthContext;

  // const refrehs
};

export default useRefeshToken;
