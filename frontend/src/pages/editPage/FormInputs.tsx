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
import { TActyEdit } from '.';
import { TActyDetail } from '../../services/getActyById';

interface FormInputsProps {
  onTagsChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  editData: TActyEdit;
  tagStateVal: Record<TActyDetail['tags'][number], boolean>;
}

const FormInputs = ({ onTagsChange, editData, tagStateVal }: FormInputsProps) => {
  const handleTags = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onTagsChange(event, checked);
  };

  return (
    <>
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
        <FormControl required component="fieldset" variant="standard">
          <FormLabel component="legend">Tags</FormLabel>
          <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
            {Object.entries(tagStateVal).map(([tag, checked], index) => {
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
    </>
  );
};

export default FormInputs;
