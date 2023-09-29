import { CloudUpload, ContentPasteGo } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  ImageList,
  ImageListItem,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { TActyEdit } from '.';
import { TypeMapper } from '../../@types/TypeMapper';
import { TActyDetail } from '../../services/getActyById';

interface EditFormProps {
  editData: TActyEdit;
}

type EditFormInputs = {
  updatedTitle: string;
  updatedAvgPrice: number;
  updatedLocation: string;
  updatedDesc: string;
  updatedImage?: FileList;
  updatedTags: [];
};

type TRegisterEditInputs = TypeMapper<EditFormInputs, RegisterOptions>;
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
const validateInput: TRegisterEditInputs = {
  updatedTitle: {
    required: { value: true, message: 'Title must not be empty' },
    minLength: { value: 5, message: 'Title should have at minimum length of 5' },
  },
  updatedLocation: {
    required: { value: true, message: 'Location must not be empty' },
    minLength: { value: 5, message: 'Location should have at minimum length of 5' },
    maxLength: { value: 80, message: 'Location must be 80 characters or shorter' },
  },
  updatedDesc: {
    required: { value: true, message: 'Description must not be empty' },
    minLength: { value: 5, message: 'Description must be 5 characters or longer' },
    maxLength: { value: 300, message: 'Description must be 300 characters or shorter' },
  },
  updatedAvgPrice: {
    required: { value: true, message: 'Price must not be empty' },
    valueAsNumber: true,
    max: { value: 10000, message: 'Too expensive' },
  },
  updatedTags: { required: { value: true, message: 'At least one tag must be selected' } },
  // updatedImage:{}
};

type TUpdatedData = {
  activity: Pick<TActyDetail, 'activity_title' | 'location' | 'description' | 'avg_price' | 'tags'> & {
    deletedImages?: Array<{ dbsId: string; cldId: string }>;
  };
};
// type TUpdatedData = Pick<TActyDetail, 'activity_title' | 'location' | 'description' | 'avg_price' | 'tags'> & {
//   deletedImages?: Array<{ dbsId: string; cldId: string }>;
// };

function EditForm({ editData }: EditFormProps) {
  // const imgFileList = editData.image;
  // console.log(imgFileList);
  //!
  const [imgFileList, setImgFileList] = useState(editData.image);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<EditFormInputs>();

  const tagsToDisplay: TActyDetail['tags'] = ['Adventure', 'Camping', 'Climbing', 'Nature', 'Water Sport'];
  const actyTags: TActyDetail['tags'] = editData.tags;
  // console.log({tagsToDisplay,actyTags});

  const update: SubmitHandler<EditFormInputs> = data => {
    console.log({ data });
    const updatedData: TUpdatedData = {
      activity: {
        activity_title: data.updatedTitle,
        location: data.updatedLocation,
        description: data.updatedLocation,
        avg_price: data.updatedAvgPrice,
        tags: data.updatedTags,
        // deletedImages: data.updatedImage,
      },
    };

    if (!data.updatedImage) return console.error('image file not defined');
    if (data.updatedImage && data.updatedImage.length < 0) return console.error('file not uploaded');

    const formData = new FormData();
    // append updated data
    formData.append('jsonData', JSON.stringify(updatedData));
    console.log({ jsonData: formData.get('jsonData') });

    // check if files attached
    if (data.updatedImage.length > 0) {
      // console.log(data.updatedImage);
      for (const imgFile of data.updatedImage) {
        // console.log(imgFile);
        formData.append('imageFiles', imgFile, imgFile.name);
      }
    }
    // TODO: append jsonData (updated actyData, deletedImags if any) and imageFiles to form-data
    // TODO: attach formData to axios request to update the activity -> check if the formData correctly present like in PostMan

    console.log({ imageFiles: formData.getAll('imageFiles') });

    // reset();
  };

  return (
    <>
      <Grid component={'form'} onSubmit={handleSubmit(update)} container spacing={3}>
        <Grid item xs={12} sm={8}>
          <TextField
            error={Boolean(errors.updatedTitle)}
            label="Title"
            id="updatedTitle"
            variant="standard"
            defaultValue={editData.activity_title}
            fullWidth
            {...register('updatedTitle', validateInput.updatedTitle)}
            helperText={errors.updatedTitle?.message}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            error={Boolean(errors.updatedAvgPrice)}
            type="number"
            id="updatedAvgPrice"
            variant="standard"
            label="Average Price"
            defaultValue={String(editData.avg_price)}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            fullWidth
            {...register('updatedAvgPrice', validateInput.updatedAvgPrice)}
            helperText={errors.updatedAvgPrice?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={Boolean(errors.updatedLocation)}
            id="updatedLocation"
            variant="standard"
            label="Location"
            defaultValue={editData.location}
            fullWidth
            {...register('updatedLocation', validateInput.updatedLocation)}
            helperText={errors.updatedLocation?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={Boolean(errors.updatedDesc)}
            id="updatedDesc"
            variant="filled"
            label="Description"
            defaultValue={editData.description}
            multiline
            rows={5}
            fullWidth
            {...register('updatedDesc', validateInput.updatedDesc)}
            helperText={errors.updatedDesc?.message}
          />
        </Grid>

        {/* Upload Image */}
        <Grid item xs={12} display={{ sm: 'flex' }} gap={2}>
          <Button component={'label'} startIcon={<CloudUpload />} color="info" variant="contained">
            Upload Image
            <input
              id="updatedImage"
              type="file"
              hidden
              {...register('updatedImage', validateInput.updatedImage)}
              multiple
            />
          </Button>
          <Typography marginTop={{ xs: 2, sm: 'inherit' }} alignSelf={'center'}>
            Choose files
          </Typography>
          {/* <TextField label="Image" type="file" InputProps={{ style: {}, startAdornment: <CloudUpload /> }} /> */}
        </Grid>

        {/* Preview Image*/}
        {imgFileList.length > 0 ? (
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
          <FormControl error={Boolean(errors.updatedTags)} component="fieldset" variant="standard">
            <FormLabel component="legend">Tags</FormLabel>
            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
              {tagsToDisplay.map((t, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    label={t}
                    control={
                      <Checkbox
                        defaultChecked={actyTags.includes(t)}
                        value={t}
                        {...register('updatedTags', validateInput.updatedTags)}
                      />
                    }
                  />
                );
              })}
            </FormGroup>
            {Boolean(errors.updatedTags) && <FormHelperText>{errors.updatedTags?.message}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default EditForm;

/** render tags
{Object.entries(tagStateVal).map(([tag, checked], index) => {
  return (
    <FormControlLabel
      key={index}
      control={
        <Checkbox
          checked={checked}
          value={tag}
          {...register('updatedTags')}
          onChange={handleTags}
          name={tag}
        />
      }
      label={tag}
    />
    // <FormControlLabel
    //   key={index}
    //   control={
    //     <Controller
    //       name={`updatedTags`}
    //       control={control}
    //       render={({ field: props }) => {
    //         console.log(props);
    //         return <Checkbox {...props} checked={checked}  onChange={handleTags} />;
    //       }}
    //     />
    //   }
    //   label={tag}
    // />
  );
})}
**/
