import axios, { AxiosResponse } from 'axios';

export type TActies = {
  _id: number;
  activity_title: string;
  description: string;
  location: string;
  image: Array<{
    url: string;
    _id: string;
  }>;
};

export async function getAllActivities(): Promise<TActies[]> {
  const res = await axios.get<TActies[]>('/activities');
  return res.data;
}
