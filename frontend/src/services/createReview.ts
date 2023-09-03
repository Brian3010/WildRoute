// import { AxiosInstance } from 'axios';

export interface ICreateReview {
  reviewCreated: {
    body: string;
    rating: 5;
    _id: string;
    owner: string;
  };
}

// export default async function createReview(axiosInterceptor: AxiosInstance, id: string, rating: number,body: string, accessToken: string) {

// }
// // export default async function createReview(id: string, rating: number, body: string, accessToken: string) {
// //   const axiosInterceptor = useAxiosInterceptor();

// //   const res = await axiosInterceptor.post<ICreateReview>(
// //     `/activities/${id}/review`,
// //     {
// //       review: {
// //         body,
// //         rating,
// //       },
// //     },
// //     { withCredentials: true, headers: { Authorization: `bearer ${accessToken}` } }
// //   );

// //   return res.data;
// // }
