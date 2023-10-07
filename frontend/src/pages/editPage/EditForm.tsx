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
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TActyEdit } from '.';
import { TypeMapper } from '../../@types/TypeMapper';
import useAxiosInterceptor from '../../hooks/useAxiosInterceptor';
import useFlashMessage from '../../hooks/useFlashMessage';
import { TActyDetail } from '../../services/getActyById';
import ImagePreview from './ImagePreview';

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
  const { id: actyId } = useParams();
  const axiosInterceptor = useAxiosInterceptor();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  // const [previewImg, setPreviewImg] = useState(editData.image);
  const [previewImg, setPreviewImg] = useState<TActyDetail['image']>(editData.image);
  const [isUpdating, setIsUpdating] = useState(false);

  // DataTransfer will allow to edit the file list
  const imageRef = useRef(new DataTransfer());
  const imgFrmDbsRef = useRef<TUpdatedData['activity']['deletedImages']>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    // watch,
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

    // check if database images has removed

    if (Array.isArray(imgFrmDbsRef.current) && imgFrmDbsRef.current.length > 0) {
      updatedData.activity.deletedImages = imgFrmDbsRef.current;
    }

    // if (!data.updatedImage) return console.error('image file not defined');
    if (data.updatedImage && data.updatedImage.length < 0) return console.error('file not uploaded');

    const formData = new FormData();
    // append updated data
    formData.append('jsonData', JSON.stringify(updatedData));
    console.log({ jsonData: formData.get('jsonData') });

    // check if files attached
    if (data.updatedImage && data.updatedImage.length > 0) {
      // use imageRef as it has the final file list
      for (const imgFile of imageRef.current.files) {
        // console.log(imgFile);
        formData.append('imageFiles', imgFile, imgFile.name);
      }
    }

    console.log(formData.getAll('imageFiles'));

    // return;
    try {
      //set updating state
      setIsUpdating(true);
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

  // handle new file added
  const fileInputRegister = register('updatedImage', validateInput.updatedImage);
  const handleFileAdded = (event: ChangeEvent<HTMLInputElement>) => {
    // reset previewImg if there is new file uploaded
    // setPreviewImg(editData.image);

    const fileList = event.target.files;
    // console.log({ fileList });

    if (!fileList) return console.error('fileList not found');

    const urls: TActyDetail['image'] = [];
    for (let i = 0; i < fileList.length; i++) {
      // URL.createObjectURL(fileList.item(i) as File)
      urls.push({ url: URL.createObjectURL(fileList.item(i) as File), _id: fileList.item(i)?.name as string });

      // add to the file list
      imageRef.current.items.add(fileList[i]);
      // console.log({ addImage: imageRef.current.files });
    }

    // update adding image in preview image section
    if (urls.length !== 0) {
      setPreviewImg(prev => [...prev, ...urls]);
    }
  };

  const handleFileRemoved = (imgToRemove: TActyDetail['image'][number] & { fileName?: string }) => {
    for (let i = 0; i < imageRef.current.files.length; i++) {
      // if file removed, then remove from the imageRef
      if (imageRef.current.files.item(i)?.name === imgToRemove._id) {
        imageRef.current.items.remove(i);
      }
    }
    // console.log({ removeImage: imageRef.current.files });

    // check if the image from database
    if (!imgToRemove.url.includes('blob:')) {
      // console.log({ imgToRemove });
      imgFrmDbsRef.current?.push({ dbsId: imgToRemove._id, cldId: imgToRemove.fileName || '' });
      // console.log(imgFrmDbsRef.current);
    }

    // update removing image in preview image section
    setPreviewImg(prev => {
      const filterPrev = prev.filter(img => img !== imgToRemove);
      return filterPrev;
    });

    // setPreviewImg(prev => ({ preview: prev.preview.filter(img => img !== imgToRemove) }));
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

          <Button type="submit" disabled={isUpdating} variant="contained">
            {!isUpdating ? 'Update' : 'updating...'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default EditForm;
