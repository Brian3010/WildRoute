import { CloudUpload } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  ImageList,
  ImageListItem,
  Input,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/EditPage.css';
import getActyById, { TActyDetail } from '../../services/getActyById';

// ? add edit/remove button to image inputs file

type TActyEdit = Pick<TActyDetail, 'activity_title' | 'location' | 'avg_price' | 'description' | 'image' | 'tags'>;

// this function return an object like this
// { Adventure:false,
//   Camping:false,
//   Climbing:true,
//   Water Sport: true,
//   Nature: false}
const checkedTags = (dbsTags: TActyDetail['tags']) => {
  const displayTags: Record<TActyDetail['tags'][number], boolean> = {
    Adventure: false,
    Nature: false,
    Camping: false,
    'Water Sport': false,
    Climbing: false,
  };
  const tagNames: TActyDetail['tags'] = ['Adventure', 'Camping', 'Climbing', 'Nature', 'Water Sport'];

  tagNames.forEach(t => {
    displayTags[t] = dbsTags.includes(t);
  });
  // console.log({ displayTags });

  return displayTags;
};

export default function EditActivity() {
  const { id: actyId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState<TActyEdit>(); // created to manage renders for this component
  const [tags, setTags] = useState<Record<TActyDetail['tags'][number], boolean>>({
    Adventure: false,
    Nature: false,
    Camping: false,
    'Water Sport': false,
    Climbing: false,
  });
  if (!actyId) throw new Error('activity id not defined');

  useEffect(() => {
    const fetchActyDetail = async () => {
      const data = await getActyById(actyId);
      // console.log(data.tags);
      setEditData(data);
      setTags(checkedTags(data.tags));
      // console.log(tags.current);
      setIsLoading(false);
    };

    fetchActyDetail();

    // return function(){
    //   setIsLoading(false);
    // }
  }, [actyId]);

  const handleTags = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const tagName = event.currentTarget.name;
    // console.log({ tagName, checked, tags });
    setTags(prevTags => {
      return {
        ...prevTags,
        [tagName]: checked,
      };
    });
  };

  if (isLoading) return <CircularProgress className="loader" color="inherit" />;

  return editData && tags ? (
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
              defaultValue={editData.activity_title}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="number"
              id="updatedAvgPrice"
              variant="standard"
              label="Average Price"
              defaultValue={String(editData.avg_price)}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="updatedLocation"
              variant="standard"
              label="Location"
              defaultValue={editData.location}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="updatedDesc"
              variant="filled"
              label="Description"
              defaultValue={editData.description}
              multiline
              rows={5}
              fullWidth
            />
          </Grid>

          {/* Upload Image */}
          <Grid item xs={12} display={{ sm: 'flex' }} gap={2}>
            <Button component={'label'} startIcon={<CloudUpload />} color="info" variant="contained">
              Upload Image
              <input type="file" hidden />
            </Button>
            <Typography marginTop={{ xs: 2, sm: 'inherit' }} alignSelf={'center'}>
              Choose files
            </Typography>
            {/* <TextField label="Image" type="file" InputProps={{ style: {}, startAdornment: <CloudUpload /> }} /> */}
          </Grid>

          {/* Preview Image*/}
          {editData.image.length > 0 ? (
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ padding: 2 }}>
                <ImageList sx={{ maxHeight: 180 }}>
                  {editData.image.map(i => (
                    <ImageListItem key={i._id}>
                      <img
                        src={`${i.url}`}
                        alt="activityImg"
                        loading="lazy"
                        style={{ maxHeight: '140px', objectFit: 'cover' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Paper>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <FormControl required component="fieldset" sx={{ m: 3 }} variant="standard">
              <FormLabel component="legend">Tags</FormLabel>
              <FormGroup>
                {Object.entries(tags).map(([tag, checked], index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox name={tag} checked={checked} onChange={handleTags} />}
                      label={tag}
                    />
                  );
                })}
              </FormGroup>
              {/* <FormHelperText>You can display an error</FormHelperText> */}
            </FormControl>
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
