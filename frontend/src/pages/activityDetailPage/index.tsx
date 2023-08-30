import { Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { Link, useParams } from 'react-router-dom';
import getActyById, { TActyDetail } from '../../services/getActyById';
import ActyDetailDisplay from './ActyDetailDisplay';

function Activity() {
  const { showBoundary } = useErrorBoundary();

  const { id } = useParams();
  // console.log('Activity ID: ', id);

  const [actyDetail, setActyDetail] = useState<TActyDetail | undefined>(undefined);

  // * if want to check if id is in database, use id param

  useEffect(() => {
    // console.log('useEffect runs');

    (async () => {
      if (!id) return showBoundary('id not found in useParams');

      try {
        const actyDetail = await getActyById(id);
        setActyDetail(actyDetail);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // console.log('file: index.tsx:29 ~ error:', error.response);
          // showBoundary(new Error(error.response?.data.error));
          showBoundary(error);
        } else {
          showBoundary(error);
        }
      }
    })();
  }, [id, showBoundary]);
  //? passing funcrtion to update the actyDetail
  if (actyDetail) {
    return (
      <>
        <Container maxWidth="lg">
          <ActyDetailDisplay actyData={actyDetail} />
        </Container>
        <Link to={`/activities/${id}/edit`}>Edit Activity</Link>
      </>
    );
  }
}

export default Activity;
