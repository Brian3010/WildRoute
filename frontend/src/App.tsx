import { Container, CssBaseline } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useLocation } from 'react-router-dom';
import './assets/App.css';
import ErrorFallBack from './components/ErrorFallBack';
import NavBar from './components/NavBar';
import PageNotFound from './pages/PageNotFound';
import Activity from './pages/activityDetailPage';
import ActivityList from './pages/activityListPage';
import EditActivity from './pages/editPage';
import HomePage from './pages/homepage';
import LoginPage from './pages/loginPage';
import NewActivity from './pages/newPage';

function logError(error: Error, info: { componentStack: string }) {
  console.error('Caught an error:', error, info);
}

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <CssBaseline />
      <>
        <NavBar />
        <main style={{ marginTop: '2em' }}>
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/activities">
                <Route
                  index
                  element={
                    <ErrorBoundary FallbackComponent={ErrorFallBack} onError={logError} key={location.pathname}>
                      <ActivityList />
                    </ErrorBoundary>
                  }
                />

                <Route
                  path=":id"
                  element={
                    <ErrorBoundary FallbackComponent={ErrorFallBack} onError={logError}>
                      <Activity />
                    </ErrorBoundary>
                  }
                />
                <Route path="new" element={<NewActivity />} />
                <Route path=":id/edit" element={<EditActivity />} />
                <Route path="user/login" element={<LoginPage />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Container>
        </main>
      </>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/activities">Activity List</Link>
//           </li>
//           <li>
//             <Link to="/activities/new">New Activity</Link>
//           </li>
//         </ul>
//       </nav>

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/activities">
//           <Route index element={<ActivityList />} />
//           <Route path=":id" element={<Activity />} />
//           <Route path="new" element={<NewActivity />} />
//           <Route path=":id/edit" element={<EditActivity />} />
//         </Route>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }
// TODO: implement navigation refer to this https://youtu.be/Ul3y1LXxzdU?t=1010

export default App;
