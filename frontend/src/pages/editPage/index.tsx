import { Box, CircularProgress, Container, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getActyById, { TActyDetail } from '../../services/getActyById';

// get details of the activity
// propagate data reveived to the form
// ? add edit/remove button to image inputs file

type TActyEdit = Pick<TActyDetail, 'activity_title' | 'location' | 'avg_price' | 'description' | 'image' | 'tags'>;

export default function EditActivity() {
  const { id: actyId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [EditData, setEditData] = useState<TActyEdit>(); // created to manage renders for this component
  if (!actyId) throw new Error('activity id not defined');

  useEffect(() => {
    // TODO: fetch API
    const fetchActyDetail = async () => {
      const data = await getActyById(actyId);
      // console.log(data);
      setEditData(data);
      setIsLoading(false);
    };

    fetchActyDetail();

    // return function(){
    //   setIsLoading(false);
    // }
  }, [actyId]);

  if (isLoading) return <CircularProgress className="loader" color="inherit" />;

  return (
    EditData && (
      <Container maxWidth="sm">
        <h1>render edit form here activity id is {actyId}</h1>
        <Paper variant="outlined" sx={{ padding: 3 }}>
          <Typography variant="h4" textAlign={'center'}>
            Update Activity
          </Typography>

          <Box component={'form'}></Box>
        </Paper>
      </Container>
    )
  );
}
