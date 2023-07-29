import { Link } from 'react-router-dom';

function ActivityList() {
  return (
    <>
      <h1>Acitivity List Page</h1>

      <Link to="/activities/1">Activity 1 </Link>
      <Link to="/activities/2">Activity 2 </Link>
    </>
  );
}

export default ActivityList;
