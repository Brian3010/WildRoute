import { Box, Card, CardContent, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { TActyDetail } from '../../services/getActyById';
import ImageItem from './ImageItem';

interface ImageDisplayProps {
  actyData: TActyDetail;
}
// TODO: style iamge and detail side by side

export default function DetailImageDisplay(props: ImageDisplayProps) {
  const actyDetail = props.actyData;

  return (
    <Card>
      <Carousel sx={{ flexGrow: 1, objectFit: 'contain' }}>
        {actyDetail.image.map(img => (
          <ImageItem key={img._id} imgItem={img.url} />
        ))}
      </Carousel>
      <Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography component="div" variant="h5">
            {actyDetail.activity_title}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
