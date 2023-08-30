import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { IAuthContext } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import getActyById from '../services/getActyById';

export default function IsOwner() {
  // console.log('IsOwner render');
  const { auth } = useAuth() as IAuthContext;
  const [owner, setOwner] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  // console.log('file: IsOwner.tsx:13 ~ IsOwner ~ id:', id);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('useEffect in IsOwner rendering');
    setIsLoading(true);
    if (id) {
      (async () => {
        try {
          const data = await getActyById(id);
          // console.log('file: IsOwner.tsx:22 ~ data :', data);
          // owner.current = data.author._id;
          setOwner(data.author._id);
          setIsLoading(false);
        } catch (error) {
          console.error(error);

          return navigate('/activities');
        }
      })();
    }
  }, [id, navigate]);

  if (!isLoading) {
    const isOwner = auth && auth.user._id === owner;
    // console.log('file: IsOwner.tsx:32 ~ IsOwner ~ owner:', owner);
    // console.log('file: IsOwner.tsx:32 ~ IsOwner ~ auth.user._id:', auth.user._id);
    // console.log('file: IsOwner.tsx:29 ~ IsOwner ~ isOwner:', isOwner);

    return isOwner ? (
      <Outlet />
    ) : (
      <Navigate
        to="/activities"
        state={{ flashMessage: { type: 'error', message: 'You do not have permission to do that' } }}
      />
    );
  }
}
