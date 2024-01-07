import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TypeMapper } from '../../@types/TypeMapper';
import useFlashMessage from '../../hooks/useFlashMessage';
import resetPassword from '../../services/resetPassword';

interface NewPasswordProps {
  isVerified: boolean;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NewPasswordInputs {
  newPassword: string;
  confirmPwd: string;
}

type FieldsOpts = TypeMapper<NewPasswordInputs, RegisterOptions>;

const newPwdOpts: FieldsOpts = {
  newPassword: {
    required: 'Password must not empty',
    minLength: {
      value: 5,
      message: 'The password should have at minimum length of 5',
    },
  },
  confirmPwd: {
    required: 'Password must not empty',
    minLength: {
      value: 5,
      message: 'The password should have at minimum length of 5',
    },
  },
};

export default function NewPassword({ isVerified, onCancel }: NewPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordInputs>({ mode: 'onSubmit', defaultValues: { newPassword: '', confirmPwd: '' } });

  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  const submit: SubmitHandler<NewPasswordInputs> = async data => {
    const { newPassword, confirmPwd } = data;
    if (newPassword !== confirmPwd) return setErrorMsg('Passwords are unmatched');

    console.log({ data });

    // make request to change password to backend
    try {
      const res = await resetPassword(newPassword, confirmPwd);
      if (res.status === 200) {
        setFlashMessage({
          type: 'success',
          message: 'Password Reset Successful! You can now log in using your new password.',
        });
        return navigate('/activities/user/login', { state: { openFlashMsg: true } });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg('Oops! Something went wrong on our end. Please try again later.');
      }
    }
  };

  return (
    <>
      <Dialog open={isVerified}>
        <form action="" onSubmit={handleSubmit(submit)}>
          <DialogTitle textAlign={'center'} fontWeight={'bold'}>
            Change your password
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <DialogContentText>Enter a new passowrd below to change your password</DialogContentText>

            {/* display error message */}
            {errorMsg && (
              <Alert severity="error" sx={{ borderRadius: '0.5rem', margin: '16px' }}>
                {errorMsg}
              </Alert>
            )}

            {/* new password input */}
            <FormControl sx={{ margin: '16px 0 8px' }}>
              <InputLabel htmlFor="newPassword" error={errors.newPassword && errors.newPassword.message ? true : false}>
                New Password
              </InputLabel>
              <OutlinedInput
                autoFocus
                error={errors.newPassword && errors.newPassword.message ? true : false}
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                {...register('newPassword', newPwdOpts.newPassword)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New password"
              />
              {errors.newPassword && errors.newPassword.message && (
                <FormHelperText error>{errors.newPassword.message}</FormHelperText>
              )}
            </FormControl>

            {/* confirm password input */}
            <FormControl sx={{ margin: '16px 0 8px' }}>
              <InputLabel htmlFor="confirmPwd" error={errors.confirmPwd && errors.confirmPwd.message ? true : false}>
                Confirm password
              </InputLabel>
              <OutlinedInput
                autoFocus
                error={errors.confirmPwd && errors.confirmPwd.message ? true : false}
                id="confirmPwd"
                type={showPassword ? 'text' : 'password'}
                {...register('confirmPwd', newPwdOpts.confirmPwd)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm password"
              />
              {errors.confirmPwd && errors.confirmPwd.message && (
                <FormHelperText error>{errors.confirmPwd.message}</FormHelperText>
              )}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                onCancel(false);
              }}
              color="error"
            >
              Cancel
            </Button>
            <Button type="submit">Change password</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
