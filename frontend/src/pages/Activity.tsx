import { useParams } from 'react-router-dom';

function Activity() {
  const { id } = useParams();
  return (
    <>
      <h1>Activity Detail {id}</h1>
    </>
  );
}

export default Activity;
