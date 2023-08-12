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
    borderRadius:'3%'
  };
  return <img style={{ ...imageStyles }} src={props.imgItem} alt="image item" />;
}
