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
import { useNavigate, useParams } from 'react-router-dom';
import { TActyEdit } from '.';
import { TypeMapper } from '../../@types/TypeMapper';
import useAxiosInterceptor from '../../hooks/useAxiosInterceptor';
import useFlashMessage from '../../hooks/useFlashMessage';
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

  const { id: actyId } = useParams();
  const axiosInterceptor = useAxiosInterceptor();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<EditFormInputs>();

  const tagsToDisplay: TActyDetail['tags'] = ['Adventure', 'Camping', 'Climbing', 'Nature', 'Water Sport'];
  const actyTags: TActyDetail['tags'] = editData.tags;
  // console.log({tagsToDisplay,actyTags});

  const update: SubmitHandler<EditFormInputs> = async data => {
    // console.log({ data });
    const updatedData: TUpdatedData = {
      activity: {
        activity_title: data.updatedTitle,
        location: data.updatedLocation,
        description: data.updatedDesc,
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

    console.log(formData.getAll('imageFiles'));
    // const files = formData.getA

    try {
      const res = await axiosInterceptor.put(`activities/${actyId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // handle success

      // handle error
      if (!res) throw new Error('Something went wrong');
      setFlashMessage({ message: `Successfully updated ${updatedData.activity.activity_title}`, type: 'success' });
      return navigate(`/activities/${actyId}`, { state: { openFlashMsg: true } });
    } catch (error) {
      console.error(error);
      return navigate(`/activities/${actyId}`);
    }

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
              accept=".png,.jpg,.jpeg"
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
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              return navigate(`/activities/${actyId}`);
            }}
          >
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
