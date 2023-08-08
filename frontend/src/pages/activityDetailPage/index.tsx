import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { Link, useParams } from 'react-router-dom';
import getActyById, { TActyDetail } from '../../services/getActyById';
import ImageDisplay from './ImageDisplay';

function Activity() {
  const { showBoundary } = useErrorBoundary();

  const { id } = useParams();
  console.log('Activity ID: ', id);
  const [actyDetail, setActyDetail] = useState<TActyDetail | undefined>(undefined);

  // * if want to check if id is in database, use id param
  // * check if id exist then return details, otherwise, navigate to not found
  useEffect(() => {
    console.log('useEffect runs');
    // ? TODO: implement catchError function
    // TODO: errors occur -> return to the activities page and flash the message
    (async () => {
      if (id) {
        try {
          const actyDetail = await getActyById(id);
          console.log('file: index.tsx:22 ~ res:', actyDetail);
          setActyDetail(actyDetail);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log('file: index.tsx:29 ~ error:', error.response);
            // console.log(object);
            showBoundary(new Error(error.response?.data.error));
          } else {
            showBoundary(error);
          }
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
