import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/detailImageDisplay.css';
import { TActyDetail } from '../../services/getActyById';
import ActyInfoItem from './ActyInfoItem';
import ActyReviews from './ActyReviews';
import ImageItem from './ImageItem';
import LeaveReview from './LeaveReview';
// import MapDisplay from './MapDisplay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link } from 'react-router-dom';
import SingleMarkerMap from '../../components/SingleMarkerMap';
interface ActyDetailDisplayProps {
  actyData: TActyDetail;
  onRatingChanged: (isRatingChanded: boolean) => void;
}
// TODO: style image and detail side by side

export default function ActyDetailDisplay(props: ActyDetailDisplayProps) {
  // const { auth } = useAuth() as IAuthContext;
  // console.log('file: ActyDetailDisplay.tsx:19 ~ ActyDetailDisplay ~ auth:', auth);
  const actyDetail = props.actyData;
  const isRating = props.onRatingChanged;
  const [reviewsToPrint, setReviewsToPrint] = useState<TActyDetail['reviews']>(actyDetail.reviews);

  const onReviewAdded = (newReview: TActyDetail['reviews'][number]) => {
    setReviewsToPrint(prevReview => [...prevReview, newReview]);
    isRating(true);
  };

  const onReviewDeleted = (deletedReview: TActyDetail['reviews'][number]) => {
    setReviewsToPrint(prevReview => prevReview.filter(r => r !== deletedReview));
    isRating(true);
  };

  return (
    <Grid container rowSpacing={2} columnSpacing={3}>
      <Grid item xs={12} md={6}>
        <Carousel
          className="carousel-image"
          showStatus={false}
          animationHandler={'fade'}
          swipeable={false}
          showThumbs={false}
          showArrows={true}
          autoPlay={true}
        >
          {actyDetail.image.map(img => (
            <ImageItem key={img._id} imgItem={img.url} />
          ))}
        </Carousel>
      </Grid>
      <Grid item xs={12} md={6}>
        <ActyInfoItem actyDetail={actyDetail} reviewTotal={reviewsToPrint.length} />
      </Grid>

      {/** display Mapbox */}
      <Grid item xs={12} md={6}>
        {/* <MapDisplay /> */}
        <SingleMarkerMap geometry={actyDetail.geometry} />
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'inline-block' }, marginTop: '15px' }}>
          <Button disableRipple size="small" startIcon={<ArrowBackIcon />} className="back-to-list-btn">
            <Link to="/activities" style={{ textDecoration: 'none', color: 'inherit' }}>
              Back to the list
            </Link>
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h5" margin={'20px 0 10px 0'}>
          Reviews
          <span style={{ fontSize: 'small', alignSelf: 'end', paddingLeft: 5, color: 'rgba(0, 0, 0, 0.6)' }}>
            {reviewsToPrint.length > 0 ? `${reviewsToPrint.length} reviews` : `${reviewsToPrint.length} review`}
          </span>
        </Typography>
        {/* // display review input text */}

        <LeaveReview onReviewAdded={onReviewAdded} />

        {reviewsToPrint.length > 0 ? (
          <Box sx={{ marginTop: 4 }}>
            <ActyReviews reviews={reviewsToPrint} onReviewDeleted={onReviewDeleted} />
          </Box>
        ) : (
          <Box>
            <h4>No reviews yet</h4>
          </Box>
        )}
      </Grid>
    </Grid>
    // https://mui.com/material-ui/react-grid/#interactive
  );
}
