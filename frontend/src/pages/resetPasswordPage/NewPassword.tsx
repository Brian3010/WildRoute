import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

interface NewPasswordProps {
  isVerified: boolean;
}
export default function NewPassword({ isVerified }: NewPasswordProps) {
  //TODO: add react hook form, and show password icon
  //TODO: make sure the cookie is available in order to make it through the end reseting passsword route
  //TODO: Cancel button close the diablog
  return (
    <>
      <Dialog open={isVerified}>
        <DialogTitle textAlign={'center'} fontWeight={'bold'}>
          Change your password
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter a new passowrd below to change your password</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reset-password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            sx={{ margin: '16px 0 8px' }}
            id="confirm-reset-password"
            label="Confirm password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button color="error">Cancel</Button>
          <Button>Change password</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
