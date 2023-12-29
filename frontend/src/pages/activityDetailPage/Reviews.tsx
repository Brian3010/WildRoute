import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { TActyDetail } from '../../services/getActyById';
import ActyReviews from './ActyReviews';
import LeaveReview from './LeaveReview';

interface ReviewsProps {
  reviewList: TActyDetail['reviews'];
}

function Reviews({ reviewList }: ReviewsProps) {
  console.log('review list rendered');

  const [reviews, setReviews] = useState<TActyDetail['reviews']>(reviewList);

  const onReviewAdded = (newReview: TActyDetail['reviews'][number]) => {
    setReviews(prevReview => [...prevReview, newReview]);
  };

  const onReviewDeleted = (deletedReview: TActyDetail['reviews'][number]) => {
    setReviews(prevReview => prevReview.filter(r => r !== deletedReview));
  };

  return (
    <>
      <Typography variant="h5" margin={'20px 0 10px 0'}>
        Reviews
        <span style={{ fontSize: 'small', alignSelf: 'end', paddingLeft: 5, color: 'rgba(0, 0, 0, 0.6)' }}>
          {reviews.length > 0 ? `${reviews.length} reviews` : `${reviews.length} review`}
        </span>
      </Typography>
      {/* // display review input text */}

      <LeaveReview onReviewAdded={onReviewAdded} />

      {reviews.length > 0 ? (
        <Box sx={{ marginTop: 4 }}>
          <ActyReviews reviews={reviews} onReviewDeleted={onReviewDeleted} />
        </Box>
      ) : (
        <Box>
          <h4>No reviews yet</h4>
        </Box>
      )}
    </>
  );
}

export default Reviews;
