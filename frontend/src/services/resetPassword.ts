import axios from './axios';

export default function resetPassword(newPassword: string, confirmPwd: string) {
  return axios.post('/user/reset-password', { newPassword, confirmPwd }, { withCredentials: true,headers:{'Authorization': `bearer `} });
}
