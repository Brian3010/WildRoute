import axios from './axios';

const logUserOut = async (accessToken: string) => {
  const res = await axios.get('/user/logout', {
    headers: { Authorization: `bearer ${accessToken}` },
    withCredentials: true,
  });
  console.log('file: logUserOut.ts:5 ~ logUserOut ~ res:', res);
  return res;
};

export default logUserOut;
