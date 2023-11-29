import axios from '../services/axios';
import { TTags } from './getActyById';

export type TActies = {
  _id: number;
  activity_title: string;
  description: string;
  location: string;
  image: Array<{
    url: string;
    _id: string;
    imgThumbnail?: string;
  }>;
  geometry: { type: 'Point'; coordinates: [number, number] };
  tags: TTags[];
};

export default async function getActies(): Promise<TActies[]> {
  const res = await axios.get('/activities');
  // return res.data.reverse();
  return res.data.actyList?.reverse();
}
