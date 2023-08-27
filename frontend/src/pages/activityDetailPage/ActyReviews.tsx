import { Box, Pagination, Paper, Rating, Typography } from '@mui/material';
import { useState } from 'react';
import { TActyDetail } from '../../services/getActyById';

interface ActyReviewProps {
  reviews: TActyDetail['reviews'];
}

export default function ActyReviews(props: ActyReviewProps) {
  const reviewPerPage = 6;
  const reviews = props.reviews.slice().reverse();

  const [currentPage, setCurrentPage] = useState(1);
  const numOfpages = Math.ceil(reviews.length / reviewPerPage);

  const lastReviewIndex = currentPage * reviewPerPage;
  const firstReviewIndex = lastReviewIndex - reviewPerPage;
  const currentReviews = reviews.slice(firstReviewIndex, lastReviewIndex);

  return (
    <>
      {currentReviews.map(r => {
        return (
          <Paper key={r._id} variant="outlined" sx={{ padding: '16px 24px 12px', marginBottom: '8px' }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {r.owner.username} 
            </Typography>
            <Rating sx={{ paddingTop: '8px' }} name="read-only" value={r.rating} readOnly />
            <Box sx={{ padding: '8px 0' }}>
              <Typography sx={{ color: '#333' }}>{r.body}</Typography>
            </Box>
          </Paper>
        );
      })}

      <Pagination
        sx={{ display: 'flex', justifyContent: 'center' }}
        count={numOfpages}
        size="small"
        onChange={(_ev, numPage) => setCurrentPage(numPage)}
      />
    </>
  );
}
