import axios from '../services/axios';
import { TActies } from './getActies';

export type TTags = 'Adventure' | 'Nature' | 'Camping' | 'Water Sport' | 'Climbing';
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
    owner: {
      _id: string;
      username: string;
    };
  }>;
  message?: string;
  rating?: number;
  tags: TTags[];
  geometry: TActies['geometry'];
}

export default async function getActyById(id: string): Promise<TActyDetail> {
  // console.log(id);
  const res = await axios.get<TActyDetail>(`/activities/${id}`);

  // console.log('file: getActyById.ts:30 ~ getActyById ~ res:', res);
  return res.data;
}
