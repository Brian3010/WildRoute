import { Alert, Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { TypeMapper } from '../../@types/TypeMapper';
import verifyUsernameEmail from '../../services/verifyUsernameEmail';
import NewPassword from './NewPassword';

interface ResetPwdData {
  username: string;
  email: string;
}

type FieldsOpts = TypeMapper<ResetPwdData, RegisterOptions>;

const resetPwdOpts: FieldsOpts = {
  username: {
    required: 'Username should not be empty',
    minLength: {
      value: 5,
      message: 'Username too short',
    },
  },
  email: {
    required: 'Email should not be empty',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
};

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<ResetPwdData>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const submit: SubmitHandler<ResetPwdData> = async data => {
    console.log({ data });
    //make a request to forgot-password api
    try {
      const res = await verifyUsernameEmail(data.username, data.email);
      // redirect to reset-password page when succefful.

      if (res) setIsVerified(true);
    } catch (error) {
      // show message when not verified
      if (isAxiosError(error) && error.response && error.response.data.error.includes('the user not exist')) {
        setErrorMsg('Verification failed. Please check your username and email');
      }
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={1} sx={{ padding: 4, position: 'relative' }}>
        <Box textAlign={'center'}>
          <Typography variant="h2" fontSize={'24px'} fontWeight={700} margin={'0 0 9px'}>
            Reset Password
          </Typography>
          <Typography variant="h4" className="h4-custom" fontSize={'16px'} margin={'0 0 27px'}>
            Enter your username and associated email.
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ borderRadius: '0.5rem', margin: '0px auto 1rem' }}>
              {errorMsg}
            </Alert>
          )}

          <form action="" onSubmit={handleSubmit(submit)}>
            <TextField
              error={errors.username && errors.username.message ? true : false}
              type="text"
              id="username"
              label="Username"
              {...register('username', resetPwdOpts.username)}
              helperText={errors.username && errors.username.message}
              fullWidth
              sx={{ margin: '16px 0 8px' }}
            />

            <TextField
              error={errors.email && errors.email.message ? true : false}
              type="text"
              id="email"
              label="Email"
              {...register('email', resetPwdOpts.email)}
              helperText={errors.email && errors.email.message}
              fullWidth
              sx={{ margin: '16px 0 8px' }}
            />

            <Button
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              style={{
                margin: '27px 0px 0px',
                fontWeight: 'bold',
                textTransform: 'none',
                backgroundColor: 'rgb(85, 105, 255)',
                borderRadius: '10px',
              }}
            >
              Verify
            </Button>
          </form>
        </Box>
      </Paper>
      <Button disableRipple size="small" className="back-to-list-btn">
        <Link to="../user/login" style={{ color: 'inherit' }}>
          Go back
        </Link>
      </Button>

      {isVerified && <NewPassword isVerified={isVerified} onCancel={setIsVerified}/>}
    </Container>
  );
}
