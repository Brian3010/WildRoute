interface ImageDisplayProps {
  images: Array<{
    url: string;
    _id: string;
  }>;
}
// TODO:try to display <https://mui.com/material-ui/react-stepper/#text-with-carousel-effect>
// TODO: control text overflow of <h1>{images[1].url}</h1> and the ones in ErrorFallBack.tsx

export default function ImageDisplay({ images }: ImageDisplayProps) {
  return (
    <>
      <h1>{images[1].url}</h1>
    </>
  );
}
