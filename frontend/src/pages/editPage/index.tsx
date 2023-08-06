import { useParams } from 'react-router-dom';

export default function EditActivity() {
  const { id } = useParams();
  // TODO: fetch data from backend using :id and display on the web
  return (
    <>
      <h1>render edit form here activity id is {id}</h1>
    </>
  );
}
