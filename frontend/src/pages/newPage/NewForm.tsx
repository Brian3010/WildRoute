import { CloudUpload, ContentPasteGo, Margin } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TypeMapper } from '../../@types/TypeMapper';
import useAxiosInterceptor from '../../hooks/useAxiosInterceptor';
import { TActyDetail } from '../../services/getActyById';
import ImagePreview from '../editPage/ImagePreview';

type NewFormInputs = {
  updatedTitle: string;
  updatedAvgPrice: number;
  updatedLocation: string;
  updatedDesc: string;
  updatedImage?: FileList;
  updatedTags: [];
};

type TRegisterNewInputs = TypeMapper<NewFormInputs, RegisterOptions>;

type dataToSubmit = {
  activity: Pick<TActyDetail, 'activity_title' | 'location' | 'description' | 'avg_price' | 'tags'>;
};

const validateInput: TRegisterNewInputs = {
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
  // updatedImage: { required: { value: true, message: 'ehhhh' },
};

function NewForm() {
  const navigate = useNavigate();
  const axiosInterceptor = useAxiosInterceptor();
  const imageFileRef = useRef(new DataTransfer());
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    // watch,
    setError,
  } = useForm<NewFormInputs>();
  const [previewImg, setPreviewImg] = useState<TActyDetail['image']>([]);

  // register file input for validating
  const fileInputRegister = register('updatedImage', validateInput.updatedImage);
  const tagsToDisplay: TActyDetail['tags'] = ['Adventure', 'Camping', 'Climbing', 'Nature', 'Water Sport'];

  const handleFileAdded = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    // console.log({ fileList });

    if (!fileList) return console.error('fileList not found');

    const urls: TActyDetail['image'] = [];
    for (let i = 0; i < fileList.length; i++) {
      /** create object {url:...,_id:...} to display image in preview section */
      urls.push({ url: URL.createObjectURL(fileList.item(i) as File), _id: fileList.item(i)?.name as string });

      /** add files to ref */
      imageFileRef.current.items.add(fileList[i]);
    }

    // update adding image in preview image section
    if (urls.length !== 0) {
      setPreviewImg(prev => [...prev, ...urls]);
    }
  };

  const handleFileRemoved = (imgToRemove: TActyDetail['image'][number] & { fileName?: string }) => {
    /** remove img in previewImg*/
    setPreviewImg(prev => prev.filter(img => img !== imgToRemove));

    /** remove files in ref*/
    for (let i = 0; i < imageFileRef.current.files.length; i++) {
      if (imgToRemove._id === imageFileRef.current.files.item(i)?.name) {
        imageFileRef.current.items.remove(i);
      }
    }
  };

  const submit: SubmitHandler<NewFormInputs> = async data => {
    console.log({ previewImg });

    /** display error if 0 file added */
    if (previewImg.length === 0) {
      setError('updatedImage', { message: 'At least one image file needed' });
      return;
    }

    const dataToSubmit: dataToSubmit = {
      activity: {
        activity_title: data.updatedTitle,
        avg_price: data.updatedAvgPrice,
        description: data.updatedDesc,
        location: data.updatedLocation,
        tags: data.updatedTags,
      },
    };

    console.log({ dataToSubmit });

    /** add dataToSubmit to formData */
    const formData = new FormData();
    formData.append('jsonData', JSON.stringify(dataToSubmit));
    console.log(formData.get('jsonData'));

    /** add image in imageFileRef to formData */
    if (imageFileRef.current.files.length > 0) {
      for (const imgFile of imageFileRef.current.files) {
        formData.append('imageFiles', imgFile, imgFile.name);
      }

      console.log(formData.getAll('imageFiles'));
    }

    // only add image files if exist
    // if (data.updatedImage && data.updatedImage.length > 0) {
    //   for (const imgFile of data.updatedImage) {
    //     /** do this to keep track of removing/adding files */
    //     previewImg.some(img => {
    //       if (img._id === imgFile.name) {
    //         formData.append('imageFiles', imgFile, imgFile.name);
    //       }
    //     });
    //   }
    //   console.log(formData.getAll('imageFiles'));
    // }

    //TODO: submit formdata using axiosInterceptor
  };

  return (
    <Grid component={'form'} container spacing={3} onSubmit={handleSubmit(submit)}>
      <Grid item xs={12} sm={8}>
        <TextField
          error={Boolean(errors.updatedTitle)}
          label="Title"
          id="updatedTitle"
          variant="standard"
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
            name={fileInputRegister.name}
            onChange={event => {
              handleFileAdded(event);
              fileInputRegister.onChange(event);
            }}
            ref={fileInputRegister.ref}
            multiple
          />
        </Button>
        <Typography marginTop={{ xs: 2, sm: 'inherit' }} alignSelf={'center'}>
          Choose files
        </Typography>
        {/* <TextField label="Image" type="file" InputProps={{ style: {}, startAdornment: <CloudUpload /> }} /> */}
        <FormHelperText style={{ alignSelf: 'center' }} error={Boolean(errors.updatedImage?.message)}>
          {errors.updatedImage?.message}
        </FormHelperText>
      </Grid>

      {/* Preview Image*/}
      <ImagePreview imgList={previewImg} removeImg={handleFileRemoved} />

      <Grid item xs={12}>
        <FormControl error={Boolean(errors.updatedTags)} component="fieldset" variant="standard">
          <FormLabel component="legend">Tags</FormLabel>
          <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
            {tagsToDisplay.map((t, index) => {
              return (
                <FormControlLabel
                  key={index}
                  label={t}
                  control={<Checkbox value={t} {...register('updatedTags', validateInput.updatedTags)} />}
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
            return navigate(`/activities/}`);
          }}
        >
          Cancel
        </Button>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default NewForm;
