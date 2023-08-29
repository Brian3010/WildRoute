import { Container } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useLocation } from 'react-router-dom';
import './assets/App.css';
import ErrorFallBack from './components/ErrorFallBack';
import FlashMessage from './components/FlashMessage';
import IsOwner from './components/IsOwner';
import NavBar from './components/NavBar';
import RequireAuth from './components/requireAuth';
import useFlashMessage from './hooks/useFLashMessage';
import PageNotFound from './pages/PageNotFound';
import Activity from './pages/activityDetailPage';
import ActivityList from './pages/activityListPage';
import EditActivity from './pages/editPage';
import HomePage from './pages/homepage';
import LoginPage from './pages/loginPage';
import NewActivity from './pages/newPage';

function App() {
  const location = useLocation();
  // const flashMsg = useRef<string>();
  const { flashMsg } = useFlashMessage();
  console.log('file: App.tsx:24 ~ App ~ flashContext:', flashMsg);

  function setFlashError(error: Error | AxiosError, info: { componentStack: string }) {
    console.warn('Caught an error:', error, info);
    if (axios.isAxiosError(error) && error.response?.status != 500) {
      // flashMsg.current = error.response?.data.error;
      // console.log('file: App.tsx:30 ~ setFlashError ~ flashMsg.current:', flashMsg.current);
    }
  }

  // clear flashMsg after render
  useEffect(() => {
    // flashMsg.current = undefined;
    // clearFlashMsg();
    // setTimeout(() => {
    //   clearFlashMsg();
    // }, 7000);
  });

  return (
    <div className="App">
      <NavBar />
      {/* {flashMsg.current && <FlashMessage flashMsg={flashMsg.current} key={Math.random()} />} */}
      {flashMsg.length > 0 && <FlashMessage flashMsg={flashMsg} />}
      <main style={{ marginTop: '2em' }}>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/activities">
              {/* public routes */}
              <Route
                index
                element={
                  <ErrorBoundary
                    FallbackComponent={ErrorFallBack}
                    onError={setFlashError}
                    key={location.pathname}
                    children={<ActivityList />}
                  />
                }
              />

              <Route
                path=":id"
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallBack} onError={setFlashError} children={<Activity />} />
                }
              />
              <Route
                path="user/login"
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallBack} onError={setFlashError} children={<LoginPage />} />
                }
              />

              {/* private routes */}
              <Route element={<RequireAuth />}>
                <Route path="new" element={<NewActivity />} />
                <Route path="user/logout" element={<div>logout </div>} />
              </Route>

              <Route element={<IsOwner />}>
                <Route path=":id/edit" element={<EditActivity />} />
              </Route>
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

// TODO: implement navigation refer to this https://youtu.be/Ul3y1LXxzdU?t=1010

export default App;
