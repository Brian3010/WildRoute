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
import React from 'react';
import { Controller, RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { TActyEdit } from '.';
import { TypeMapper } from '../../@types/TypeMapper';
import { TActyDetail } from '../../services/getActyById';

interface EditFormProps {
  onTagsChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  editData: TActyEdit;
  tagStateVal: Record<TActyDetail['tags'][number], boolean>;
}

// id = 'updatedTitle';
// id = 'updatedAvgPrice';
// id = 'updatedLocation';
// id = 'updatedDesc';
// id = 'updatedImage';
// id={`updated${tag}`}

type EditFormInputs = {
  [key in `updated${TActyDetail['tags'][number]}`]: string;
} & {
  updatedTitle: string;
  updatedAvgPrice: string;
  updatedLocation: string;
  updatedDesc: string;
  updatedImage: unknown;
};
type EditFormInputsV2 = {
  updatedTitle: string;
  updatedAvgPrice: string;
  updatedLocation: string;
  updatedDesc: string;
  updatedImage: unknown;
  updatedTags: Record<TActyDetail['tags'][number], boolean>;
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
// const validateInput: TRegisterEditInputs = {
//   updatedTitle: {
//     required: true,
//     minLength: { value: 5, message: 'Title should have at minimum length of 5' },

//   },
//   updatedLocation:{
//     required: true,
//     minLength: { value: 5, message: 'Location should have at minimum length of 5' },

//   },
//   updatedDesc: {
//     required: true,
//     minLength: { value: 5, message: 'Input must be 5 characters or longer' },
//     maxLength:{value:50, message:'Input must be 50 characters or shorter.'}
//   },
//   updatedAvgPrice: { required: true, valueAsNumber: true, max: { value: 10000, message: 'too expensive' } },

// }

function EditForm({ onTagsChange, editData, tagStateVal }: EditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<EditFormInputsV2>();

  const handleTags = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    // console.log({ event, checked });
    onTagsChange(event, checked);
  };

  const update: SubmitHandler<EditFormInputsV2> = data => {
    console.log({ data });
    // reset();
  };

  return (
    <>
      <Grid component={'form'} onSubmit={handleSubmit(update)} container spacing={3}>
        <Grid item xs={12} sm={8}>
          <TextField
            label="Title"
            id="updatedTitle"
            variant="standard"
            defaultValue={editData.activity_title}
            fullWidth
            {...register('updatedTitle')}
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
            {...register('updatedAvgPrice')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="updatedLocation"
            variant="standard"
            label="Location"
            defaultValue={editData.location}
            fullWidth
            {...register('updatedLocation')}
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
            {...register('updatedDesc')}
          />
        </Grid>

        {/* Upload Image */}
        <Grid item xs={12} display={{ sm: 'flex' }} gap={2}>
          <Button component={'label'} startIcon={<CloudUpload />} color="info" variant="contained">
            Upload Image
            <input id="updatedImage" type="file" hidden {...register('updatedImage')} />
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
          <FormControl required component="fieldset" variant="standard">
            <FormLabel component="legend">Tags</FormLabel>
            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
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
            </FormGroup>
            {/* <FormHelperText>You can display an error</FormHelperText> */}
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
