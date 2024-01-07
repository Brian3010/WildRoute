import axios from './axios';

export default async function verifyUsernameEmail(username: string, email: string) {
  return axios.post<{ message: string }>('/user/forgot-password', { username, email }, { withCredentials: true });
}
