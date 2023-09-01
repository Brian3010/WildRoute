import { IAuthContext } from '../context/AuthProvider';
import axios from '../services/axios';
import useAuth from './useAuth';
// import from '../hooks/useAuth';

const useRefeshToken = () => {
  const { auth, setAuth } = useAuth() as IAuthContext;

  const refresh = async () => {
    // const res = await axios.post('/user/refresh-token',{username:auth.user.username})
    // ! refreshtoken granted when passing different _id
  };
};

export default useRefeshToken;
