import axios from './axios';

interface ICreateReview {
  reviewCreated: {
    body: string;
    rating: 5;
    _id: string;
    owner: string;
  };
}
export default async function createReview(id: string, rating: number, body: string, accessToken: string) {
  const res = await axios.post<ICreateReview>(
    `/activities/${id}/review`,
    {
      review: {
        body,
        rating,
      },
    },
    { withCredentials: true, headers: { Authorization: `bearer ${accessToken}` } }
  );

  return res.data;
}
