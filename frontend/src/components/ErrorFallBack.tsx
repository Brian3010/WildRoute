import axios from 'axios';
import { FallbackProps } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';

export default function ErrorFallBack(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;

  // console.log('file: ErrorFallBack.tsx:5 ~ ErrorFallBack ~ error:', error);

  if (axios.isAxiosError(error) && error.response?.status != 500) {
    console.log('AXIOS ERROR: ', error.response?.status);
    return <Navigate to="/activities" />;
  }
  return (
    <div style={{ width: '100%' }}>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
