import RemoveIcon from '@mui/icons-material/RemoveCircle';
import { Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper } from '@mui/material';
import { MouseEvent } from 'react';
import { TActyDetail } from '../../services/getActyById';

interface ImagePreviewProps {
  imgList: TActyDetail['image'];
  removeImg: (image: TActyDetail['image'][number]) => void;
}

/**Component**/
const ImagePreview = ({ imgList, removeImg }: ImagePreviewProps) => {
  // const [imgListFrmDbs, setPreviewImg] = useState(imgListFrmDbs);
  console.log({ imgList });

  const remove = (img: TActyDetail['image'][number]) => {
    removeImg(img);
  };

  return (
    <>
      {imgList.length > 0 ? (
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ padding: 2 }}>
            <ImageList
              sx={{
                maxHeight: 250,
                gridTemplateColumns: { xs: 'repeat(1,1fr)!important', sm: 'repeat(2,1fr)!important' },
              }}
              gap={10}
            >
              {imgList.map((img, idx) => (
                <ImageListItem key={idx}>
                  <ImageListItemBar
                    sx={{
                      background: 'none',
                    }}
                    position="top"
                    actionIcon={
                      <IconButton onClick={() => remove(img)}>
                        <RemoveIcon fontSize="small" htmlColor="#FF6634" />
                      </IconButton>
                    }
                    actionPosition="right"
                  />

                  <img
                    src={`${img.url}`}
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
