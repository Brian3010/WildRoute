import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import './assets/App.css';
import NavBar from './components/NavBar';
import PageNotFound from './pages/PageNotFound';
import Activity from './pages/activityDetailPage';
import ActivityList from './pages/activityListPage';
import EditActivity from './pages/editPage/EditActivity';
import HomePage from './pages/homepage';
import LoginPage from './pages/loginPage';
import NewActivity from './pages/newPage';

function App() {
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
                <Route index element={<ActivityList />} />
                <Route path=":id" element={<Activity />} />
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
