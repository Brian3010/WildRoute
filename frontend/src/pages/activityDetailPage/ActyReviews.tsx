import { Box, Paper, Rating, Typography } from '@mui/material';
import { TActyDetail } from '../../services/getActyById';

interface ActyReviewProps {
  review: TActyDetail['reviews'][number];
}

export default function ActyReviews(props: ActyReviewProps) {
  const review = props.review;

  return (
    <Paper variant="outlined" sx={{ padding: '16px 24px 12px', marginBottom: '8px' }}>
      <Typography variant="subtitle1" fontWeight={700}>
        {review.owner.username}
      </Typography>
      <Rating sx={{ paddingTop: '8px' }} name="read-only" value={review.rating} readOnly />
      <Box sx={{ padding: '8px 0' }}>
        <Typography sx={{ color: '#333' }}>{review.body}</Typography>
      </Box>
    </Paper>
  );
}
