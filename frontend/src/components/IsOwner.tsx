import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Outlet, useNavigate, useParams } from 'react-router-dom';
// import { IAuthContext } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import useFlashMessage from '../hooks/useFlashMessage';
import getActyById from '../services/getActyById';

export default function IsOwner() {
  console.log('IsOwner render');
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { setFlashMessage } = useFlashMessage();

  const [isOwner, setIsOnwer] = useState(false);

  useEffect(() => {
    const fetchActyDetail = async () => {
      if (id) {
        try {
          const actyDetail = await getActyById(id);
          setIsOnwer(actyDetail.author._id === auth.user._id);
          if (actyDetail.author._id !== auth.user._id) {
            throw new Error('not an owner');
          }

          console.log({ checkOwner: actyDetail.author._id === auth.user._id });
        } catch (error) {
          console.error(error);
          if (error instanceof Error) {
            if (error.message === 'not an owner') {
              setFlashMessage({ type: 'error', message: 'You do not have permission to do that' });
              return navigate('/activities', { state: { openFlashMsg: true } });
            }
          }
        }
      }
    };

    fetchActyDetail();

    // return function () {
    //   setIsOnwer(false);
    // };
  }, [auth.user._id, id, navigate, setFlashMessage]);

  if (isOwner) {
    return <Outlet />;
  }
}
// export default function IsOwner() {
//   console.log('IsOwner render');
//   const { auth } = useAuth() as IAuthContext;
//   const [isOwner, setIsOwner] = useState<boolean>(false);
//   const { setFlashMessage } = useFlashMessage();
//   const [isLoading, setIsLoading] = useState(true);
//   const { id } = useParams();
//   // console.log('file: IsOwner.tsx:13 ~ IsOwner ~ id:', id);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // console.log('useEffect in IsOwner rendering');
//     setIsLoading(true);
//     if (id) {
//       (async () => {
//         try {
//           const data = await getActyById(id);
//           // console.log('file: IsOwner.tsx:22 ~ data :', data);
//           // owner.current = data.author._id;
//           setIsOwner(data.author._id === auth.user._id);
//           setIsLoading(false);
//         } catch (error) {
//           console.error(error);

//           return navigate('/activities');
//         }
//       })();
//     }
//   }, [auth.user._id, id, isLoading, isOwner, navigate, setFlashMessage]);
//   if (!isLoading && !isOwner) {
//     setFlashMessage({ type: 'error', message: 'You do not have permission to do that' });
//     return navigate('/activities', { state: { openFlashMsg: true } });
//   }

//   if (!isLoading) {
//     return <Outlet/>
//   }
// }
