import { CSSProperties } from 'react';

interface ImageItemProps {
  key: string;
  imgItem: string;
}

export default function ImageItem(props: ImageItemProps) {
  const imageStyles: CSSProperties = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  };
  return <img style={{ ...imageStyles }} src={props.imgItem} alt="image item" />;
  // return (
  //   <CardMedia
  //     component="img"
  //     sx={{ border: '2px solid green'}}
  //     image={props.imgItem}
  //     alt="activity image"
  //   ></CardMedia>
  // );
}
