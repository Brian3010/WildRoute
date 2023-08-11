import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { CSSProperties } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/imageDisplayDetail.css';
import { TActyDetail } from '../../services/getActyById';
import ImageItem from './ImageItem';
interface ImageDisplayProps {
  actyData: TActyDetail;
}
// TODO: style iamge and detail side by side

export default function DetailImageDisplay(props: ImageDisplayProps) {
  const actyDetail = props.actyData;

  // return (
  //   <Card sx={{ display: 'flex', border: '2px solid red', position: 'relative' }}>
  //     <Carousel
  //       duration={1000}
  //       autoPlay={false}
  //       indicatorContainerProps={{
  //         style: {
  //           display: 'inline-block',
  //           backgroundColor: 'blue',
  //           marginTop: 0,
  //           position: 'absolute',
  //           bottom: 2,
  //           zIndex: 100,
  //         },
  //       }}
  //       sx={{ flex: '1 0 auto', border: '2px solid blue' }}
  //     >
  //       {actyDetail.image.map(img => (
  //         <ImageItem key={img._id} imgItem={img.url} />
  //       ))}
  //     </Carousel>
  //     <Box flexGrow={1}>
  //       <CardContent>
  //         <Typography component="div" variant="h5">
  //           {actyDetail.activity_title}
  //         </Typography>
  //       </CardContent>
  //     </Box>
  //   </Card>
  // );
  const arrowStyles: CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
  };
  return (
    <Grid container border={'2px solid #E7EDF3'}>
      <Grid item xs={12} md={6}>
        <Carousel
          className="carousel-image"
          showStatus={false}
          animationHandler={'fade'}
          swipeable={false}
          showThumbs={false}
          showArrows={true}
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 10 }}>
                +
              </button>
              //https://freefrontend.com/css-arrows/
            )
          }
        >
          {actyDetail.image.map(img => (
            <ImageItem key={img._id} imgItem={img.url} />
          ))}
        </Carousel>
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
    </Grid>
  );
}
