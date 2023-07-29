import { Link, Route, Routes } from 'react-router-dom';
import './assets/App.css';
import Activity from './pages/Activity';
import ActivityList from './pages/ActivityList';
import HomePage from './pages/HomePage';
import NewActivity from './pages/NewActivity';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/activities">Activity List</Link>
          </li>
          <li>
            <Link to="/activities/new">New Activity</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<ActivityList />} />
        <Route path="/activities/:id" element={<Activity />} />
        <Route path="/activities/new" element={<NewActivity />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
