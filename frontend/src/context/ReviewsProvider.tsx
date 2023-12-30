import { ReactElement, createContext, useState } from 'react';
import { TActyDetail } from '../services/getActyById';

interface ReviewProviderProps {
  children: ReactElement;
}

export interface IReviewContext {
  reviews: TActyDetail['reviews'];
  setReviews?: React.Dispatch<React.SetStateAction<TActyDetail['reviews']>>;
}

const ReviewsContext = createContext<IReviewContext>({ reviews: [] });

export function ReviewProvider({ children }: ReviewProviderProps) {
  const [reviews, setReviews] = useState<TActyDetail['reviews']>([]);

  return <ReviewsContext.Provider value={{ reviews, setReviews }}>{children}</ReviewsContext.Provider>;
}

export default ReviewsContext;
