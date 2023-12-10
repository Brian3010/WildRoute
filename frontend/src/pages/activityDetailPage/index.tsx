import { CircularProgress, Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import getActyById, { TActyDetail } from '../../services/getActyById';
import ActyDetailDisplay from './ActyDetailDisplay';

function Activity() {
  const { showBoundary } = useErrorBoundary();
  const { id } = useParams();
  // console.log('Activity ID: ', id);

  const [actyDetail, setActyDetail] = useState<TActyDetail | undefined>(undefined);
  const [isRatingChanged, setIsRatingChanged] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    // console.log('useEffect runs');

    (async () => {
      if (!id) return showBoundary('id not found in useParams');
      setIsloading(true);
      try {
        const actyDetail = await getActyById(id);
        // actyDetail && setActyDetail(actyDetail);

        if (actyDetail || isRatingChanged) {
          setActyDetail(actyDetail);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // console.log('file: index.tsx:29 ~ error:', error.response);
          // showBoundary(new Error(error.response?.data.error));
          showBoundary(error);
        } else {
          showBoundary(error);
        }
      } finally {
        setIsloading(false);
      }
    })();

    return function () {
      setIsRatingChanged(false);
    };
  }, [id, isRatingChanged, showBoundary]);

  const onRatingChanged = (isRatingChanded: boolean) => {
    setIsRatingChanged(isRatingChanded);
  };

  if (isLoading) {
    return <CircularProgress className="loader" color="inherit" />;
  }

  if (actyDetail) {
    return (
      <>
        <Container maxWidth="lg"  sx={{marginTop:4}}>
          <ActyDetailDisplay actyData={actyDetail} onRatingChanged={onRatingChanged} />
        </Container>
      </>
    );
  }
}

export default Activity;
