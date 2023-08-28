import CloseIcon from '@mui/icons-material/Close';
import { Alert, Collapse, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

export default function FlashMessage(props: { flashMsg: string }) {
  const { flashMsg } = props;
  const [open, setOpen] = useState(true);
  // console.log('flashMessage render ', open);

  // useEffect(() => {
  //   // when the component is mounted, the alert is displayed for 3 seconds

  //   setTimeout(() => {
  //     setOpen(false);
  //   }, 5000);
  // }, []);

  return (
    <Collapse in={open}>
      <Alert
        severity="error"
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
        {flashMsg}
      </Alert>
    </Collapse>
  );
}
