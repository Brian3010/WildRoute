import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type ActyItemProps = {
  key: number;
  data: { id: number; title: string; description: string; location: string; image: string };
};
export default function ActivityItem(props: ActyItemProps) {
  const data = props.data;

  return (
    <>
      <Card sx={{ maxWidth: 335 }}>
        <CardMedia sx={{ height: 200 }} image={data.image} title="activity image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
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
            <Link to={`/activities/${data.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              View More
            </Link>
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
