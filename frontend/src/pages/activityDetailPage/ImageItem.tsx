import { CardMedia } from '@mui/material';

interface ImageItemProps {
  key: string;
  imgItem: string;
}

export default function ImageItem(props: ImageItemProps) {
  return (
    <CardMedia
      component="img"
      sx={{ width: '100%', height: '100%' }}
      image={props.imgItem}
      alt="activity image"
    ></CardMedia>
  );
}
