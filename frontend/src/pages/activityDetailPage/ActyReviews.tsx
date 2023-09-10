import DeleteIcon from '@mui/icons-material/Delete';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Chip, Pagination, Paper, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosInterceptor from '../../hooks/useAxiosInterceptor';
import { TActyDetail } from '../../services/getActyById';

interface ActyReviewProps {
  reviews: TActyDetail['reviews'];
}

export default function ActyReviews(props: ActyReviewProps) {
  const { id: actyId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const axiosInterceptor = useAxiosInterceptor();
  const { auth } = useAuth();

  const reviewPerPage = 6;
  const reviews = props.reviews.slice().reverse();

  const numOfpages = Math.ceil(reviews.length / reviewPerPage);

  const lastReviewIndex = currentPage * reviewPerPage;
  const firstReviewIndex = lastReviewIndex - reviewPerPage;
  const currentReviews = reviews.slice(firstReviewIndex, lastReviewIndex);

  // useEffect(() => {
  //   const deleteReview = async (actyId: string, reviewId: string, accessToken: string) => {
  //     const res = await axiosInterceptor.delete(`/activities/${actyId}/review/${reviewId}`, {
  //       headers: { Authorization: `bearer ${accessToken}` },
  //     });

  //     return res;
  //   };

  // },[])

  const handleRemoveClick = (reviewId: string, reviewOwner: string) => {
    console.log('handleRemoveClick clicked');

    const loginUser = auth.user._id;
    //check isLoggedIn and owner of the review, disable and enable button based on that.
    console.log({ actyId, reviewId, reviewOwner, loginUser });
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
                onClick={() => handleRemoveClick(r._id, r.owner._id)}
                icon={<DeleteIcon sx={{ fontSize: '1rem' }} />}
                variant="outlined"
                color="error"
              />
              <DeleteRoundedIcon
                onClick={() => handleRemoveClick(r._id, r.owner._id)}
                color="error"
                sx={{ display: { xs: 'inherit', sm: 'none' }, cursor: 'pointer', fontSize: '1.3rem' }}
              />
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
