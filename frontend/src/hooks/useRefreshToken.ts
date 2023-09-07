import { IAuthContext } from '../context/AuthProvider';
import getRefreshToken from '../services/getRefreshToken';
import useAuth from './useAuth';
// import from '../hooks/useAuth';

const useRefeshToken = () => {
  const { auth, setAuth } = useAuth() as IAuthContext;
  const userStorage = localStorage.getItem('user');

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let userInfo: { _id: string; username: string; email: string } = JSON.parse(userStorage!);
  console.log('file: useRefreshToken.ts:11 ~ useRefeshToken ~  userInfo:', userInfo);

  // send the _id, username even when storage is null
  if (!userInfo) {
    userInfo = { _id: '', username: '', email: '' };
    // console.error('Cannot get item from local storage');
  }
  // console.log('file: useRefreshToken.ts:18 ~ useRefeshToken ~ userInfo.user._id:', userInfo._id);

  const refreshToken = async () => {
    const data = await getRefreshToken(auth.user._id || userInfo._id, (userInfo.username = auth.user.username));
    // console.log('file: useRefreshToken.ts:13 ~ refresh ~ res:', data);

    setAuth({
      accessToken: data.accessToken,
      user: {
        _id: userInfo._id || auth.user._id,
        email: userInfo.email || auth.user.email,
        username: userInfo.username || auth.user.username,
      },
    });
    return data.accessToken;
  };
  return refreshToken;
};

export default useRefeshToken;

// const [auth, setAuth] = useState<ILoginInfo>({
//   accessToken: '',
//   // refreshToken: '',
//   user: { _id: '', email: '', username: '' },
// });
