import { CloudUpload, UploadFile } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Input,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/EditPage.css';
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

  return EditData ? (
    <Container maxWidth="sm">
      {/* <h1>render edit form here activity id is {actyId}</h1> */}
      <Paper variant="outlined" sx={{ padding: 3 }}>
        <Typography component="h1" variant="h4" align="center" marginBottom={5}>
          Update Activity
        </Typography>

        {/* edit form */}
        <Grid component={'form'} container spacing={3}>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Title"
              id="updatedTitle"
              variant="standard"
              defaultValue={EditData.activity_title}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="number"
              id="updatedAvgPrice"
              variant="standard"
              label="Average Price"
              defaultValue={String(EditData.avg_price)}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="updatedLocation"
              variant="standard"
              label="Location"
              defaultValue={EditData.location}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="updatedDesc"
              variant="filled"
              label="Description"
              defaultValue={EditData.description}
              multiline
              rows={5}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} display={{ sm: 'flex' }} gap={2}>
            <Button component={'label'} startIcon={<CloudUpload />} color="info" variant="contained">
              Upload Image
              <input type="file" hidden />
            </Button>
            <Typography marginTop={{ xs:2, sm:'inherit'}} alignSelf={'center'}>Choose files</Typography>
            {/* <TextField label="Image" type="file" InputProps={{ style: {}, startAdornment: <CloudUpload /> }} /> */}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  ) : null;
}

// export const activitySchema = customJoi.object({
//   activity: customJoi
//     .object({
//       activity_title: customJoi.string().min(5).required().escapeHTML(),
//       location: customJoi.string().min(5).required().escapeHTML(),
//       description: customJoi.string().min(5).max(50).required().escapeHTML(),
//       avg_price: customJoi.number().max(10000).required(),
//       tags: customJoi
//         .array()
//         .items(customJoi.string().valid('Adventure', 'Nature', 'Camping', 'Water Sport', 'Climbing').required()),
//       image: customJoi.array().items(
//         customJoi
//           .object({
//             url: customJoi.string().required(),
//             // url: customJoi.string().required().escapeHTML(),
//             //fileName: customJoi.string()
//           })
//           .required()
//       ),
//     })
//     .required(),
// });
