import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { TActies } from '../services/getActies';

type ActyItemProps = {
  data: TActies;
};

export default function ActivityItem(props: ActyItemProps) {
  const data = props.data;
  // todo: seed the database again :))
  return (
    <>
      <Card sx={{ width: '100%', height: '100%' }}>
        <CardMedia
          component="img"
          sx={{ height: 200 }}
          image={'/d/ies/mynn_230/278876908_934063843941879_4810330787763993630_n.jpg'}
          title="activity image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            sx={{
              height: '24px',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {data.activity_title}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {data.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {data.location}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined">
            <Link to={`/activities/${data._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              View More
            </Link>
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
