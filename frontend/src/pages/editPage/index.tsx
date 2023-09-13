import { useParams } from 'react-router-dom';

export default function EditActivity() {
  const { id } = useParams();
  return (
    <>
      <h1>render edit form here activity id is {id}</h1>
    </>
  );
}
