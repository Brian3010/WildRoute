import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, CircularProgress, Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { Link, useParams } from 'react-router-dom';
import '../../assets/ActivityDetailPage.css';
import getActyById, { TActyDetail } from '../../services/getActyById';
import ActyDetailDisplay from './ActyDetailDisplay';

function Activity() {
  const { showBoundary } = useErrorBoundary();
  const { id } = useParams();
  // console.log('Activity ID: ', id);

  const [actyDetail, setActyDetail] = useState<TActyDetail | undefined>(undefined);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    // console.log('useEffect runs');

    (async () => {
      if (!id) return showBoundary('id not found in useParams');
      setIsloading(true);
      try {
        const actyDetail = await getActyById(id);
        // actyDetail && setActyDetail(actyDetail);

        if (actyDetail) {
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
  }, [id, showBoundary]);

  if (isLoading) {
    return <CircularProgress className="loader" color="inherit" />;
  }

  if (actyDetail) {
    return (
      <>
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
          <Box sx={{ display: { sm: 'inline-block', md: 'none' }, marginBottom: '15px' }}>
            <Button disableRipple size="small" startIcon={<ArrowBackIcon />} className="back-to-list-btn">
              <Link to="/activities" style={{ textDecoration: 'none', color: 'inherit' }}>
                Back to the list
              </Link>
            </Button>
          </Box>
          <ActyDetailDisplay actyData={actyDetail} />
        </Container>
      </>
    );
  }
}

export default Activity;
