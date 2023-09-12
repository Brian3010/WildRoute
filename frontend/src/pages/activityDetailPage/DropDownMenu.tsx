import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {

  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/ActivityInfoItem.css';
import useAuth from '../../hooks/useAuth';
import useAxiosInterceptor from '../../hooks/useAxiosInterceptor';
import useFlashMessage from '../../hooks/useFlashMessage';



const DropDownMenu = ({authorId} : {authorId:string}) => {
    const { id: actyId } = useParams();
    const navigate = useNavigate();
    const { auth } = useAuth();
    // const isLoggedIn = auth.accessToken.length > 0;
    const axiosInterceptor = useAxiosInterceptor();
    const { setFlashMessage } = useFlashMessage();
  
    const isOwnner = auth.user._id === authorId;
  
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
  


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // console.log('dropdown menu clicked');
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
        setSnackBarOpen(false);
      };
    
      const handleEdit = () => {
        // setAnchorEl(null);
    
        console.log('directing to edit page');
    
        // return <Navigate to={`/activities/${actyId}/edit`} />
        return navigate(`/activities/${actyId}/edit`, { replace: true });
      };
    
      const handleCopyLink = async () => {
        // setAnchorEl(null);
    
        try {
          await navigator.clipboard.writeText(window.location.href);
          setSnackBarOpen(true);
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleDelete = async () => {
        console.log('handle Delete Clicked');
    
        try {
          const res = await axiosInterceptor.delete(`/activities/${actyId}`, {
            withCredentials: true,
            headers: { Authorization: `bearer ${auth.accessToken}` },
          });
          // console.log(res);
          setFlashMessage({ message: `Successfully deleted ${res.data.activity_title} `, type: 'success' });
          return navigate('/activities', { state: { openFlashMsg: true } });
        } catch (error) {
          console.error(error);
        }
    };
    

    return (
      <>
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
                    onClick={handleDelete}
                    disabled={isOwnner ? false : true}
                  >
                    <DeleteIcon fontSize="small" />
                    Delete
                  </MenuItem>
                </span>
              </Tooltip>
              <MenuItem sx={{ gap: 1.5 }} onClick={handleCopyLink}>
                <ContentCopyIcon fontSize="small" />
                Copy link
              </MenuItem>
            </Menu>
            <Snackbar
              open={snackBarOpen}
              onClose={handleClose}
              message="Link copied"
              // key={}
            />

      </>
  )
}

export default DropDownMenu