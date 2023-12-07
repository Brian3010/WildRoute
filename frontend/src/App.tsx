// import { Container } from '@mui/material';
import { AxiosError } from 'axios';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useLocation } from 'react-router-dom';
import './assets/App.css';
import ErrorFallBack from './components/ErrorFallBack';
// import FlashMessage from './components/FlashMessage';
import IsOwner from './components/IsOwner';
import NavBar from './components/NavBar';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/requireAuth';
import PageNotFound from './pages/PageNotFound';
import RegisterPage from './pages/RegisterPage';
import Activity from './pages/activityDetailPage';
import ActivityList from './pages/activityListPage';
import EditActivity from './pages/editPage';
import HomePage from './pages/homepage';
import LoginPage from './pages/loginPage';
import NewActivity from './pages/newPage';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  function logError(error: Error | AxiosError, info: { componentStack: string }) {
    console.error('Caught an error by ErrorBoundary:', error, info);
    // if (axios.isAxiosError(error) && error.response?.status != 500) {
    //   // flashMsg.current = error.response?.data.error;
    //   // console.log('file: App.tsx:30 ~ logError ~ flashMsg.current:', flashMsg.current);
    // }
  }

  return (
    <div className="App">
      {/* <NavBar /> */}

      {/* <FlashMessage /> */}

      <Routes>
        {/* <Route element={<PersistLogin />}> */}
        <Route element={<NavBar />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/activities">
            {/* public routes */}
            <Route
              index
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallBack}
                  onError={logError}
                  key={location.pathname}
                  children={<ActivityList />}
                />
              }
            />
            <Route element={<PersistLogin />}>
              <Route
                path=":id"
                element={<ErrorBoundary FallbackComponent={ErrorFallBack} onError={logError} children={<Activity />} />}
              />
              <Route
                path="user/login"
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallBack} onError={logError} children={<LoginPage />} />
                }
              />
              <Route path="user/register" element={<RegisterPage />} />
              {/* -------------- */}

              {/* private routes */}

              <Route element={<RequireAuth />}>
                <Route path="new" element={<NewActivity />} />
                {/* <Route path="user/logout" element={<div>logout </div>} /> */}

                <Route element={<IsOwner />}>
                  <Route
                    path=":id/edit"
                    element={
                      <ErrorBoundary FallbackComponent={ErrorFallBack} onError={logError} children={<EditActivity />} />
                    }
                  />
                </Route>
              </Route>
            </Route>
          </Route>
          {/* -------------- */}

          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/* </Route> */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
