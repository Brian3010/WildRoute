import axios from 'axios';
import { FallbackProps } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';
import LoginPage from '../pages/loginPage';

export default function ErrorFallBack(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  !axios.isAxiosError && console.log('Other Error', error.name);

  // if (
  //   error.response?.status === 404 &&
  //   error.response?.data.error === 'username and password not found (redirect to login)'
  // ) {
  //   console.log(error.response?.data.error);
  // }

  if (axios.isAxiosError(error)) {
    console.log('Axios Error: ', error.name);
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
        return <Navigate to={'/activities'} />;
      }

      if (error.response?.data.error === 'Incorrect username and password') {
        console.log(error.response);
        // * reset the error boundary state, clearing the error and attempting to render the component tree again.
        // * error persists when navigating, so need to reset/
        resetErrorBoundary();
        return <Navigate to={'/activities/user/login'} />;
      }
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <p>Something went wrong</p>
      {/* <LoginPage /> */}
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );

  // if (
  //   axios.isAxiosError(error) &&
  //   error.response?.status === 500 &&
  //   error.response.data.error.includes('ECONNREFUSED')
  // ) {
  //   return (
  //     <div style={{ width: '100%' }}>
  //       <p>Something went wrong:</p>
  //       <pre style={{ color: 'red' }}>{error.message}</pre>
  //       <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
  //       <button onClick={resetErrorBoundary}>Try again</button>
  //     </div>
  //   );
  // }
}
