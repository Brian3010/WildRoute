import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { IAuthContext } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import useFlashMessage from '../hooks/useFLashMessage';

const RequireAuth = () => {
  const { auth } = useAuth() as IAuthContext;
  const { setFlashMsg } = useFlashMessage();
  const location = useLocation();
  // console.log('file: requireAuth.tsx:8 ~ RequireAuth ~ location:', location);

  const isLoggedIn = auth.user._id.length > 0;
  if (!isLoggedIn) setFlashMsg('You must be signed in first!');

  return isLoggedIn ? <Outlet /> : <Navigate to="/activities/user/login" state={{ from: location }} replace={true} />;
};

export default RequireAuth;
