import axios from 'axios';
import { FallbackProps } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';
import useFlashMessage from '../hooks/useFlashMessage';

export default function ErrorFallBack(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  const { setFlashMessage } = useFlashMessage();

  // console.log(error);

  !axios.isAxiosError && console.log('Other Error', error.name);

  // useEffect(() => {
  //   if (error.response?.data.error === 'Incorrect username and password') {
  //     resetErrorBoundary();
  //     navigate('/activities/user/login');
  //   }
  // }, [error, resetErrorBoundary, navigate]);

  if (axios.isAxiosError(error)) {
    // console.log('Axios Error: ', error.name);
    const errorMessage = error.response?.data.error;
    // const errorMessage = error.response?.data;

    // *render this only with network error in production, other error types should be handled (redirect?)
    if (
      (error.response?.status === 500 && errorMessage.includes('ECONNREFUSED')) ||
      (error.response?.status === 404 && errorMessage.includes('Page Not Found'))
    ) {
      return (
        <div style={{ width: '100%' }}>
          <p>Something went wrong:</p>
          <pre style={{ color: 'red' }}>{error.message}</pre>
          <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      );
    }

    if (error.response?.status === 404) {
      if (errorMessage.includes('Invalid Activity ID') || errorMessage.includes('Activity does not exist')) {
        setFlashMessage({ type: 'error', message: errorMessage });

        return <Navigate to={'/activities'} state={{ openFlashMsg: true }} />;
      }
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <p>Something went wrong</p>
      {/* <LoginPage /> */}
      <button onClick={() => resetErrorBoundary()}>Try again</button>
    </div>
  );
}
