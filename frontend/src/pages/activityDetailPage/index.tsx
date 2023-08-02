import { Link, useParams } from 'react-router-dom';
function Activity() {
  const { id } = useParams();

  // * if want to check if id is in database, use id param
  // * check if id exist then return details, otherwise, navigate to not found
  return (
    <>
      <h1>Activity Detail {id}</h1>
      <Link to={`/activities/${id}/edit`}>Edit Activity</Link>
    </>
  );
}

export default Activity;
