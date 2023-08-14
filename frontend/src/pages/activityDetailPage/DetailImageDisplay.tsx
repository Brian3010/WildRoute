import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/detailImageDisplay.css';
import { TActyDetail } from '../../services/getActyById';
import ActivitiyInfoItem from './ActivityInfoItem';
import ImageItem from './ImageItem';
interface ImageDisplayProps {
  actyData: TActyDetail;
}
// TODO: style iamge and detail side by side

export default function DetailImageDisplay(props: ImageDisplayProps) {
  const actyDetail = props.actyData;
  return (
    <Grid container spacing={2}>
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
        <ActivitiyInfoItem data={actyDetail} reviewTotal={actyDetail.reviews.length} />
      </Grid>
      <Grid item xs={12} md={6}>
        <h3>Display a map here</h3>
      </Grid>
      <Grid item xs={12} md={6}>
        <h3>Reviews</h3>
      </Grid>
    </Grid>
    // https://mui.com/material-ui/react-grid/#interactive
  );
}
// TODO: add Tags: Adventure, Nature (display icon on the card based on the tags) to the model
// TODO: add difficulty level as well
// *note: remember to validate accordingly after adding those fields in the model, consider typesciprt to provide pre-set 'Tags' and 'difficulty'
