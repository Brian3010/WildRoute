import DeleteIcon from '@mui/icons-material/Delete';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Chip, IconButton, Pagination, Paper, Rating, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosInterceptor from '../../hooks/useAxiosInterceptor';
import { TActyDetail } from '../../services/getActyById';

interface ActyReviewProps {
  reviews: TActyDetail['reviews'];
  onReviewDeleted: (deletedReview: TActyDetail['reviews'][number]) => void;
}

export default function ActyReviews({ reviews, onReviewDeleted }: ActyReviewProps) {
  const { id: actyId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const axiosInterceptor = useAxiosInterceptor();
  const { auth } = useAuth();

  const reviewPerPage = 6;
  const reviewList = reviews.slice().reverse();

  const numOfpages = Math.ceil(reviewList.length / reviewPerPage);

  const lastReviewIndex = currentPage * reviewPerPage;
  const firstReviewIndex = lastReviewIndex - reviewPerPage;
  const currentReviews = reviewList.slice(firstReviewIndex, lastReviewIndex);

  // useEffect(() => {
  //   const deleteReview = async (actyId: string, reviewId: string, accessToken: string) => {
  //     const res = await axiosInterceptor.delete(`/activities/${actyId}/review/${reviewId}`, {
  //       headers: { Authorization: `bearer ${accessToken}` },
  //     });

  //     return res;
  //   };

  // },[]
  const handleRemoveClick = async (
    reviewId: string,
    reviewOwnerId: string,
    deletedReview: TActyDetail['reviews'][number]
  ) => {
    console.log('handleRemoveClick clicked');
    if (reviewOwnerId !== auth.user._id) return; // not review onwer
    const loginUser = auth.user._id;
    console.log({ actyId, reviewId, reviewOwnerId, loginUser, deletedReview });

    try {
      const res = await axiosInterceptor.delete(`/activities/${actyId}/review/${reviewId}`, {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      });
      if (res === undefined) throw new Error('cannot find the review id');
      onReviewDeleted(deletedReview);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {currentReviews.map(r => {
        return (
          <Paper key={r._id} variant="outlined" sx={{ padding: '16px 24px 12px', marginBottom: '8px' }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {r.owner.username}

              <Chip
                // sx={{fontSize:'0.8rem'} }
                sx={{ display: { xs: 'none', sm: 'inherit' }, fontSize: '0.75rem' }}
                label="Remove"
                onClick={() => handleRemoveClick(r._id, r.owner._id, r)}
                icon={<DeleteIcon sx={{ fontSize: '1rem' }} />}
                variant="outlined"
                color="error"
                disabled={r.owner._id === auth.user._id ? false : true}
              />
              <IconButton
                aria-label="delete"
                size="small"
                sx={{ display: { xs: 'inherit', sm: 'none' } }}
                color="error"
                onClick={() => handleRemoveClick(r._id, r.owner._id, r)}
                disabled={r.owner._id === auth.user._id ? false : true}
              >
                <DeleteRoundedIcon sx={{ fontSize: 'inherit' }} />
              </IconButton>
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
