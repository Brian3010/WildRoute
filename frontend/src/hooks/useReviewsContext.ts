import { useContext } from 'react';
import ReviewsContext, { IReviewContext } from '../context/ReviewsProvider';

const useReviewsContext = () => {
  return useContext(ReviewsContext) as IReviewContext;
};

export default useReviewsContext;
