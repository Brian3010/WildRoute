import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/detailImageDisplay.css';
import { TActyDetail } from '../../services/getActyById';
import ActyInfoItem from './ActyInfoItem';
import ActyReviews from './ActyReviews';
import ImageItem from './ImageItem';
import LeaveReview from './LeaveReview';
import MapDisplay from './MapDisplay';
interface ImageDisplayProps {
  actyData: TActyDetail;
}
// TODO: style iamge and detail side by side

export default function ActyDetailDisplay(props: ImageDisplayProps) {
  // const { auth } = useAuth() as IAuthContext;
  // console.log('file: ActyDetailDisplay.tsx:19 ~ ActyDetailDisplay ~ auth:', auth);
  const actyDetail = props.actyData;
  const [reviewsToPrint, setReviewsToPrint] = useState<TActyDetail['reviews']>(actyDetail.reviews);

  const onReviewAdded = (newReview: TActyDetail['reviews'][number]) => {
    setReviewsToPrint(prevReview => [...prevReview, newReview]);
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
        <ActyInfoItem data={actyDetail} reviewTotal={actyDetail.reviews.length} />
      </Grid>
      <Grid item xs={12} md={6}>
        <MapDisplay />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" margin={'20px 0 10px 0'}>
          Reviews
        </Typography>
        {/* // display review input text */}
            
        <LeaveReview onReviewAdded={onReviewAdded} />

        {actyDetail.reviews.length > 0 ? (
          <Box sx={{ marginTop: 4 }}>
            <ActyReviews reviews={reviewsToPrint} />
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
