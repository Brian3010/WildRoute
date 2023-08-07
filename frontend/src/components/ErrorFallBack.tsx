import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallBack(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  // console.log('file: ErrorFallBack.tsx:5 ~ ErrorFallBack ~ error:', error);
  return (
    <div style={{ width: '100%' }}>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <pre style={{ color: 'red' }}>{error.stack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
