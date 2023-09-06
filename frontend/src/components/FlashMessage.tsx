import CloseIcon from '@mui/icons-material/Close';
import { Alert, Collapse, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FlashMessage() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log('file: FlashMessage.tsx:8 ~ FlashMessage ~ location:', location);
  const flashMessage: { type: 'success' | 'error'; message: string } = location.state?.flashMessage;
  console.log('file: FlashMessage.tsx:11 ~ FlashMessage ~ flashMessage:', flashMessage);
  const [open, setOpen] = useState(true);

  // const flashMessage = useRef<{ type: 'success' | 'error'; message: string } | undefined>(undefined);

  // setTimeout(() => {
  //   setOpen(false);
  // }, 4000);

  // if(!open) location.state.flashMessage = undefined;
  // useEffect(() => {
  //   navigate( location.state?.from,{ replace: true });
  // }, [location.pathname, location.state?.from, navigate]);

  return (
    flashMessage && (
      <Collapse in={open}>
        <Alert
          severity={flashMessage.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {flashMessage.message}
        </Alert>
      </Collapse>
    )
  );
}
