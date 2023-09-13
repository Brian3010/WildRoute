import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { IAuthContext } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

const PersistLogin = () => {
  console.log('PersistLogin render');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth() as IAuthContext;
  // console.log('file: PersistLogin.tsx:12 ~ PersistLogin ~ auth:', auth);

  const refresh = useRefreshToken();

  useEffect(() => {
    // console.log('PersistLogin useEffect');
    let isMounted = true; // prevent loop

    const verifyRefreshToken = async () => {
      // console.log('verifyRefreshToken run ');
      try {
        await refresh();
      } catch (error) {
        console.error('Caught an error: ', error);
        return <Navigate to={'/activities/user/login'} />;
        // return navigate('/activities/user/login',{replace: true});
      } finally {
        setIsLoading(false);
      }
    };
    !(auth.accessToken.length > 0) && isMounted ? verifyRefreshToken() : setIsLoading(false);
    // !(auth.accessToken.length > 0) ? verifyRefreshToken() : setIsLoading(false);
    // console.log('file: PersistLogin.tsx:30 ~ useEffect ~ auth?.accessToken.length:', auth?.accessToken.length);
    return function () {
      isMounted = false;
    };
  }, [auth.accessToken.length, navigate, refresh]);

  // console.log({isLoading});

  return <>{isLoading ? <CircularProgress className="loader" color="inherit" /> : <Outlet />}</>;
};

export default PersistLogin;

// if Auth is empty after refreshing
// check if auth empty the run the following:
// verify the refresh token sit in the cookies - verifyRefreshToken function
// useRefreshToken hook to get a new accessToken- the hook replace the global authContext for us
// only run the verifyRefreshToken when auth is empty
// proceed to the route if done verifying.
