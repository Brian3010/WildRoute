import { Box, Card, CardContent, Rating, Typography } from '@mui/material';
import '../../assets/ActivityInfoItem.css';
import { TActyDetail } from '../../services/getActyById';

interface ActivityInfoItemProps {
  data: Omit<TActyDetail, 'image' | 'reviews'>;
  reviewTotal: number;
}

// interface ActivityInfoItemProps {
//   data: {
//     activity_title: string;
//     location: string;
//     description: string;
//     avg_price: number;
//     author: {
//       _id: string;
//       email: string;
//       username: string;
//     };

//     rating: number;
//   };
//   reviewTotal: number;
// }

export default function ActivitiyInfoItem(props: ActivityInfoItemProps) {
  const actyDetail = props.data;
  const reviewTotal = props.reviewTotal;
  return (
    <Card  sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px', height:'100%' }}>
      <CardContent sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: 'start', letterSpacing: '.05rem', fontWeight: 700 }}
          >
            {actyDetail.activity_title}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {actyDetail.location}
          </Typography>

          <Typography>
            <span style={{ fontWeight: 700 }}>${actyDetail.avg_price} AUD</span> total
          </Typography>
          <hr className="line-break" />

          <Typography sx={{ display: 'flex' }}>
            <Rating size="small" name="read-only" value={actyDetail.rating} readOnly />
            <span style={{ fontSize: 'smaller', alignSelf: 'end', paddingLeft: 5, color: 'rgba(0, 0, 0, 0.6)' }}>
              {reviewTotal > 1 ? `${reviewTotal} reviews` : `${reviewTotal} review`}
            </span>
          </Typography>

          <Typography maxHeight={'500px'} variant="body2" padding={'10px 0 20px 0'}>
            {actyDetail.description}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Submitted by {actyDetail.author.username}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
