import axios from '../services/axios';

export interface ILoginInfo {
  accessToken: string;
  // refreshToken: string;
  user: {
    _id: string;
    email: string;
    username: string;
  };
}

export default async function loginUserIn(username: string, password: string): Promise<ILoginInfo> {
  const res = await axios.post<ILoginInfo>(
    '/user/login',
    {
      username,
      password,
    },
    { withCredentials: true }
  );
  console.log(res);

  return res.data;
}
