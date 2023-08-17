import { Grid, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/detailImageDisplay.css';
import { TActyDetail } from '../../services/getActyById';
import ActyInfoItem from './ActyInfoItem';
import ActyReviews from './ActyReviews';
import ImageItem from './ImageItem';
import MapDisplay from './MapDisplay';
interface ImageDisplayProps {
  actyData: TActyDetail;
}
// TODO: style iamge and detail side by side

export default function ActyDetailDisplay(props: ImageDisplayProps) {
  const actyDetail = props.actyData;
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
        {actyDetail.reviews.length > 0 ? <ActyReviews reviews={actyDetail.reviews} /> : <h4>No reviews yet</h4>}
      </Grid>
    </Grid>
    // https://mui.com/material-ui/react-grid/#interactive
  );
}
