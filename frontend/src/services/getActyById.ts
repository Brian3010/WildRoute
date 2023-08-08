import axios from 'axios';
import { BACKEND_URL } from './config';

export interface TActyDetail {
  _id: number;
  activity_title: string;
  location: string;
  description: string;
  avg_price: number;
  image: Array<{
    url: string;
    _id: string;
  }>;
  author: {
    _id: string;
    email: string;
    username: string;
  };
  reviews: Array<{
    _id: string;
    body: string;
    rating: number;
    owner: string;
  }>;
  message?: string;
}

export default async function getActyById(id: string): Promise<TActyDetail> {
  // console.log(id);
  const res = await axios.get<TActyDetail>(`${BACKEND_URL}/activities/${id}`);

  console.log('file: getActyById.ts:30 ~ getActyById ~ res:', res);
  return res.data;
}
