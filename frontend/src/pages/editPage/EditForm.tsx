import { CloudUpload } from '@mui/icons-material';
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
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { TActyEdit } from '.';
import { TypeMapper } from '../../@types/TypeMapper';
import { TActyDetail } from '../../services/getActyById';

interface EditFormProps {
  editData: TActyEdit;
}

type EditFormInputsV2 = {
  updatedTitle: string;
  updatedAvgPrice: string;
  updatedLocation: string;
  updatedDesc: string;
  updatedImage?: FileList;
  updatedTags: [];
};

type TRegisterEditInputs = TypeMapper<EditFormInputsV2, RegisterOptions>;
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
    maxLength: { value: 250, message: 'Description must be 250 characters or shorter' },
  },
  updatedAvgPrice: {
    required: { value: true, message: 'Price must not be empty' },
    valueAsNumber: true,
    max: { value: 10000, message: 'Too expensive' },
  },
  updatedTags: { required: { value: true, message: 'At least one tag must be selected' } },
  // updatedImage:{}
};

function EditForm({ editData }: EditFormProps) {
  //!
  const imgFileList = editData.image;
  // console.log(imgFileList);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<EditFormInputsV2>();

  const tagsToDisplay: TActyDetail['tags'] = ['Adventure', 'Camping', 'Climbing', 'Nature', 'Water Sport'];
  const actyTags: TActyDetail['tags'] = editData.tags;
  // console.log({tagsToDisplay,actyTags});

  const update: SubmitHandler<EditFormInputsV2> = data => {
    console.log({ data });
    if (!data.updatedImage) return console.error('Filename undefined');

    console.log(data.updatedImage);

    //! use FormData proly for append 'file' to form in order to submit it using axios
    // const formData = new FormData();
    // formData.append("file",data.updatedImage.item(0))

    // console.log(data.updatedImage[0]);
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
