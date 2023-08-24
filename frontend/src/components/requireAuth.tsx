import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { IAuthContext } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth() as IAuthContext;
  const location = useLocation();
  console.log('file: requireAuth.tsx:8 ~ RequireAuth ~ location:', location);
  return auth.user.username.length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/activities/user/login" state={{ from: location }} replace={true} />
  );
};

export default RequireAuth;
