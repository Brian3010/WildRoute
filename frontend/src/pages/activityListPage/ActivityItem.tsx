import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { TActies } from '../../services/getActies';

type ActyItemProps = {
  data: TActies;
};

export default function ActivityItem(props: ActyItemProps) {
  const data = props.data;

  const trucateString = (text: string, numWords: number) => {
    const words = text.split(' ');
    const truncatedWords = words.slice(0, numWords);
    return truncatedWords.join(' ');
  };

  return (
    <>
      <Card sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ height: 200 }}
          image={data.image[0] && (data.image[0].imgThumbnail || data.image[0].url)}
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
          <Typography
            sx={{ maxHeight: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}
            variant="body2"
            color="text.primary"
          >
            {trucateString(data.description, 20)}...
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {data.location}
          </Typography>
        </CardContent>
        <CardActions sx={{ position: 'absolute', bottom: '2px' }}>
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
