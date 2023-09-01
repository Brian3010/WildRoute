import axios from '../services/axios';
import { IAuthContext } from '../context/AuthProvider';
import useAuth from './useAuth';
// import from '../hooks/useAuth';

const useRefeshToken = () => {
  const { setAuth } = useAuth() as IAuthContext;

  // const refresh = async () => {
  //   const res = await axios.

  // }
};

export default useRefeshToken;
