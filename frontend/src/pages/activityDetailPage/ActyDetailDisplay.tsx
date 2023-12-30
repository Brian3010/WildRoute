import { Box, Button, Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/detailImageDisplay.css';
import { TActyDetail } from '../../services/getActyById';
import ActyInfoItem from './ActyInfoItem';
import ImageItem from './ImageItem';
import Reviews from './Reviews';
// import MapDisplay from './MapDisplay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link } from 'react-router-dom';
import SingleMarkerMap from '../../components/SingleMarkerMap';
import { ReviewProvider } from '../../context/ReviewsProvider';

interface ActyDetailDisplayProps {
  actyData: TActyDetail;
}

export default function ActyDetailDisplay(props: ActyDetailDisplayProps) {
  // const { auth } = useAuth() as IAuthContext;
  // console.log('file: ActyDetailDisplay.tsx:19 ~ ActyDetailDisplay ~ auth:', auth);
  const actyDetail = props.actyData;

  return (
    <ReviewProvider>
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
          <ActyInfoItem actyDetail={actyDetail} />
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
          <Reviews reviewList={actyDetail.reviews} />
        </Grid>
      </Grid>
    </ReviewProvider>
    // https://mui.com/material-ui/react-grid/#interactive
  );
}
