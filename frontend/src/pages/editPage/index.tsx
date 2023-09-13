import { useParams } from 'react-router-dom';

// get details of the activity
// propagate data reveived to the form
// ? add edit/remove button to image input file

export default function EditActivity() {
  const { id } = useParams();
  return (
    <>
      <h1>render edit form here activity id is {id}</h1>
    </>
  );
}
