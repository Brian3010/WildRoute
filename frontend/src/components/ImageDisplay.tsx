interface ImageDisplayProps {
  images: Array<{
    url: string;
    _id: string;
  }>;
}
// TODO:try to display <https://mui.com/material-ui/react-stepper/#text-with-carousel-effect>

export default function ImageDisplay({ images }: ImageDisplayProps) {
  return (
    <>
      <h1 style={{ whiteSpace: 'pre-wrap' }}>{images[1].url}</h1>
    </>
  );
}
