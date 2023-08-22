import axios from 'axios';
import { BACKEND_URL } from './config';

interface LoginInfo {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    email: string;
    username: string;
  };
}

export default async function loginUserIn(username: string, password: string): Promise<LoginInfo> {
  const res = await axios.post<LoginInfo>(`${BACKEND_URL}/user/login`, {
    username,
    password,
  });

  return res.data;
}
