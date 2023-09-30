import { Grid, ImageList, ImageListItem, Paper } from '@mui/material';
import { useState } from 'react';
import { TActyDetail } from '../../services/getActyById';
interface ImagePreviewProps {
  imgListFrmDbs: TActyDetail['image'];
}

const ImagePreview = ({ imgListFrmDbs }: ImagePreviewProps) => {
  const [previewImg, setPreviewImg] = useState(imgListFrmDbs);

  return (
    <>
      {previewImg.length > 0 ? (
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ padding: 2 }}>
            <ImageList sx={{ maxHeight: 180 }}>
              {previewImg.map(i => (
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
    </>
  );
};

export default ImagePreview;
