import { Container, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getActyById from '../../services/getActyById';

// get details of the activity
// propagate data reveived to the form
// ? add edit/remove button to image input file

export default function EditActivity() {
  const { id: actyId } = useParams();
  if (!actyId) throw new Error('activity id not defined');
  useEffect(() => {
    // TODO: fetch API
    const fetchActyDetail = async () => {
      const data = await getActyById(actyId);
      console.log(data);
    };

    fetchActyDetail();
  }, [actyId]);

  return (
    <Container maxWidth="sm">
      <h1>render edit form here activity id is {actyId}</h1>
      <Paper variant="outlined">
        <Typography variant="h4" fontSize={'1.875rem'} textAlign={'center'}>
          Edit 'acty_title'
        </Typography>
      </Paper>
    </Container>
  );
}
