import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, Outlet, redirect, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IAuthContext } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import getActyById from '../services/getActyById';

export default function IsOwner() {
  console.log('IsOwner render');
  const { auth } = useAuth() as IAuthContext;
  const [owner, setOwner] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  // const ownerRef = useRef<string>(); // ! would delete it later when using redux?
  const { id } = useParams();
  console.log('file: IsOwner.tsx:13 ~ IsOwner ~ id:', id);
  const navigate = useNavigate();

  useMemo(() => {
    console.log('useEffect in IsOwner rendering');
    (async () => {
      try {
        if (id) {
          const data = await getActyById(id);
          console.log('file: IsOwner.tsx:22 ~ data :', data);
          // owner.current = data.author._id;
          setOwner(data.author._id);
          setIsLoading(true);
        }
      } catch (error) {
        console.error(error);
        return navigate('/activities');
      }
    })();
  }, [id, navigate]);

  const isOwner = auth && auth.user._id === owner;
  console.log('file: IsOwner.tsx:32 ~ IsOwner ~ owner:', owner);
  console.log('file: IsOwner.tsx:32 ~ IsOwner ~ auth.user._id:', auth.user._id);
  console.log('file: IsOwner.tsx:29 ~ IsOwner ~ isOwner:', isOwner);

  // ! the useEffect run after the component so that causes the owner undefine,
  // * have a look at isloading solution https://stackoverflow.com/questions/66213598/react-hooks-rendering-component-before-useeffect-finishes
  return isOwner && isLoading ? <Outlet /> : <Navigate to="/activities" />;

  // if (isOwner) ownerRef.current = auth.user._id;
  // console.log('file: IsOwner.tsx:35 ~ IsOwner ~ ownerRef.current:', ownerRef.current);

  // return isOwner ?  <Outlet /> : <Navigate to="/activities" />
  // return ownerRef.current === owner ? <Outlet /> : <Navigate to="/activities" />;
}
