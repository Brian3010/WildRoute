import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

interface LoadingProps {
  styles: CircularProgressProps;
}

export default function Loading({ styles }: LoadingProps) {
  return <CircularProgress {...styles} />;
}
