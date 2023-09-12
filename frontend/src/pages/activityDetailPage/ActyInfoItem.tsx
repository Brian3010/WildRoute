import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import '../../assets/ActivityInfoItem.css';
import useAuth from '../../hooks/useAuth';
import iconSrcs from '../../images';
import { TActyDetail } from '../../services/getActyById';
import DipslayTagIcons from './DisplayTagIcons';

interface ActyInfoItemProps {
  actyDetail: Omit<TActyDetail, 'image' | 'reviews'>;
  reviewTotal: number;
}

export default function ActyInfoItem({ actyDetail, reviewTotal }: ActyInfoItemProps) {
  // console.log('ActyInfoItem rendered');
  const { id: actyId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  // const isLoggedIn = auth.accessToken.length > 0;
  const isOwnner = auth.user._id === actyDetail.author._id;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  // convert the tags to icons
  const convertToIcon = (tags: typeof actyDetail.tags) => {
    const iconTags = tags.map(t => {
      // create a dictionary to map the tags to the icons
      const iconDict: { name: typeof t; icon: string }[] = [
        { name: 'Adventure', icon: iconSrcs.adventureIcon },
        { name: 'Camping', icon: iconSrcs.campingIcon },
        { name: 'Climbing', icon: iconSrcs.climbingIcon },
        { name: 'Nature', icon: iconSrcs.natureIcon },
        { name: 'Water Sport', icon: iconSrcs.waterSportIcon },
      ];
      // find out the name
      const icons = iconDict.find(el => el.name === t);
      if (icons) return { name: icons.name, icon: icons.icon };
      // return only the icon

      return null;
    });
    //return a new array with icons
    return iconTags;
  };

  const actyTags = convertToIcon(actyDetail.tags);
  // console.log(actyTags);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log('dropdown menu clicked');
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    setAnchorEl(null);

    console.log('directing to edit page');

    // return <Navigate to={`/activities/${actyId}/edit`} />
    return navigate(`/activities/${actyId}/edit`, { replace: true });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSnackBarOpen(false);
  };

  const handleCopyLink = async () => {
    setAnchorEl(null);

    try {
      await navigator.clipboard.writeText(window.location.href);
      setSnackBarOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px', height: '100%' }}>
      <CardContent sx={{ padding: 2, height: '100%', position: 'relative' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignContent: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ textAlign: 'start', letterSpacing: '.05rem', fontWeight: 700 }}
            >
              {actyDetail.activity_title}
            </Typography>

            {/* dropdown menu */}

            <IconButton
              aria-label="modify activity"
              id="modify-button"
              aria-controls={open ? 'modify-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ paddingX: '2px', paddingY: '2px', maxHeight: '32px' }}
            >
              <MoreHorizIcon sx={{ fontSize: '1.8rem' }} />
            </IconButton>
            <Menu
              id="modify-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'modify-button',
              }}
            >
              <Tooltip title={isOwnner ? '' : 'Only the owner can do this'} placement="top-start">
                <span>
                  <MenuItem sx={{ gap: 1.5 }} onClick={handleEdit} disabled={isOwnner ? false : true}>
                    <EditIcon fontSize="small" />
                    {/* <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/activities/${actyId}/edit`}>
                  Edit
                </Link> */}
                    <Typography sx={{ textDecoration: 'none', color: 'inherit' }}>Edit</Typography>
                  </MenuItem>

                  <MenuItem
                    sx={{ gap: 1.5, color: '#d32f2f' }}
                    onClick={handleClose}
                    disabled={isOwnner ? false : true}
                  >
                    <DeleteIcon fontSize="small" />
                    Delete
                  </MenuItem>
                </span>
              </Tooltip>
              <MenuItem sx={{ gap: 1.5 }} onClick={handleCopyLink}>
                <ContentCopyIcon fontSize='small'/>
                Copy link
              </MenuItem>
            </Menu>
            <Snackbar
              open={snackBarOpen}
              onClose={handleClose}
              message="Link copied"
              // key={}
            />

            {/* ------------------ */}
          </Box>

          <Typography variant="caption" color="text.secondary">
            {actyDetail.location}
          </Typography>

          <Typography>
            <span style={{ fontWeight: 700 }}>${actyDetail.avg_price} AUD</span> total
          </Typography>
          <hr className="line-break" />

          <Typography sx={{ display: 'flex', marginBottom: 1 }}>
            <Rating size="small" name="read-only" value={actyDetail.rating || 0} readOnly />
            <span style={{ fontSize: 'smaller', alignSelf: 'end', paddingLeft: 5, color: 'rgba(0, 0, 0, 0.6)' }}>
              {reviewTotal > 1 ? `${reviewTotal} reviews` : `${reviewTotal} review`}
            </span>
          </Typography>

          <Typography maxHeight={'500px'} variant="body2" margin="10px 0 10px 0">
            {actyDetail.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: '5%' }} paddingTop={{ lg: '10px' }}>
            {actyTags.map((tag, i) => tag && <DipslayTagIcons key={i} tags={tag} />)}
          </Box>

          <Typography variant="subtitle2" color="text.secondary" paddingTop={{ md: '10px', lg: '40px' }}>
            Submitted by {actyDetail.author.username}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
