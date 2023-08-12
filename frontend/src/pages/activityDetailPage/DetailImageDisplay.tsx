import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/detailImageDisplay.css';
import { TActyDetail } from '../../services/getActyById';
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
        {/* <Typography component="div" variant="h5">
          {actyDetail.activity_title}
        </Typography> */}

        <Card sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px' }}>
          <CardContent sx={{ padding: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ textAlign: 'center', padding: 2, letterSpacing: '.05rem', fontWeight: 700 }}
              >
                {actyDetail.activity_title}
              </Typography>
              <Box sx={{ display: 'flex', marginBottom: 2 }}>
                <Typography flexGrow={1}>{actyDetail.rating}</Typography>
                <Typography flexGrow={2}>
                  <span style={{ fontWeight: 700 }}>${actyDetail.avg_price} AUD</span> total
                </Typography>
              </Box>
              <Typography variant="body2" padding={'10px 0 20px 0'}>
                {actyDetail.description}
              </Typography>
              // TODO: make line to divide separate section for title, description, and author maybe review star and number of review in 1 section, place aud after description
              <Typography variant="caption" color="text.secondary">
                Submitted by {actyDetail.author.username}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
