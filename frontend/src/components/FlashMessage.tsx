import CloseIcon from '@mui/icons-material/Close';
import { Alert, Collapse, IconButton } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function FlashMessage(props: { flashMsg: { type: 'error' | 'success'; message: string } }) {
  const { flashMsg } = props;
  const location = useLocation();
  console.log('file: FlashMessage.tsx:10 ~ FlashMessage ~ location:', location);
  const [open, setOpen] = useState(true);

  setTimeout(() => {
    setOpen(false);
  }, 3000);

  return (
    <Collapse in={open}>
      <Alert
        severity={flashMsg.type}
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
        {flashMsg.message}
      </Alert>
    </Collapse>
  );
}
