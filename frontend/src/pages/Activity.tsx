import { Link, useParams } from 'react-router-dom';
function Activity() {
  const { id } = useParams();
  return (
    <>
      <h1>Activity Detail {id}</h1>
      <Link to={`/activities/${id}/edit`}>Edit Activity</Link>
    </>
  );
}

export default Activity;
