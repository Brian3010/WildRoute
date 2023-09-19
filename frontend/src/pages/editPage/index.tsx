import { Button, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/EditPage.css';
import getActyById, { TActyDetail } from '../../services/getActyById';
import FormInputs from './FormInputs';

// ? add edit/remove button to image inputs file

export type TActyEdit = Pick<
  TActyDetail,
  'activity_title' | 'location' | 'avg_price' | 'description' | 'image' | 'tags'
>;

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
    console.log({ tagName, checked, tags });
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
          <FormInputs editData={editData} onTagsChange={handleTags} tagStateVal={tags} />

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
            <Button variant="contained">Update</Button>
          </Grid>
        </Grid>
        {/* ===edit form=== */}
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
