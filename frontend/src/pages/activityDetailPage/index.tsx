import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { Link, useParams } from 'react-router-dom';
import ImageDisplay from '../../components/ImageDisplay';
import getActyById, { TActyDetail } from '../../services/getActyById';

function Activity() {
  const { showBoundary } = useErrorBoundary();

  const { id } = useParams();
  console.log('Activity ID: ', id);
  const [actyDetail, setActyDetail] = useState<TActyDetail | undefined>(undefined);

  // * if want to check if id is in database, use id param
  // * check if id exist then return details, otherwise, navigate to not found
  useEffect(() => {
    console.log('useEffect runs');

    (async () => {
      if (id) {
        try {
          const res = await getActyById(id);
          // console.log('file: index.tsx:22 ~ res:', res);
          setActyDetail(res);
        } catch (error) {
          showBoundary(error);
        }
      } else {
        showBoundary(new Error('Id not found'));
      }
    })();
  }, [id, showBoundary]);

  if (actyDetail) {
    return (
      <>
        <h1>Activity Detail {id}</h1>
        <Box>
          <ImageDisplay images={actyDetail.image} />
        </Box>
        <Link to={`/activities/${id}/edit`}>Edit Activity</Link>
      </>
    );
  }
}

export default Activity;
