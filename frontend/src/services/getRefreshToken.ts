import axios from './axios';

type TgetRefreshToken = (userId: string, username: string) => Promise<{ accessToken: string; refreshToken: string }>;

const getRefreshToken: TgetRefreshToken = async (userId, username) => {
  const res = await axios.post<{ accessToken: string; refreshToken: string }>(
    '/user/refresh-token',
    { _id: userId, username },
    { withCredentials: true }
  );
  console.log(res);

  return res.data;
};

export default getRefreshToken;
