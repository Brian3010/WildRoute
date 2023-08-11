import { Box, CardMedia } from '@mui/material';

interface ImageItemProps {
  key: string;
  imgItem: string;
}

export default function ImageItem(props: ImageItemProps) {
  return <img style={{ width: '100%', objectFit: 'cover' }} src={props.imgItem} alt="image item" />;
  // return (
  //   <CardMedia
  //     component="img"
  //     sx={{ border: '2px solid green'}}
  //     image={props.imgItem}
  //     alt="activity image"
  //   ></CardMedia>
  // );
}
