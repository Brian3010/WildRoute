import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { useState } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { TypeMapper } from '../../@types/TypeMapper';
import axios from '../../services/axios';
import { LoginData } from '../loginPage';

interface RegisterInputs extends LoginData {
  confirmPwd: string;
  email: string;
}

type RegisterFormType = TypeMapper<RegisterInputs, RegisterOptions>;

const registerOpts: RegisterFormType = {
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
  password: {
    required: 'Password should not be empty',
    minLength: {
      value: 5,
      message: 'The password should have at minimum length of 5',
    },
  },
  confirmPwd: {
    required: 'This should not be empty',
  },
};

/** Componnent */
function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterInputs>();

  const [showPwd, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPwd);

  const submit: SubmitHandler<RegisterInputs> = async data => {
    /** check matching password */
    if (data.password !== data.confirmPwd) {
      setError('confirmPwd', { message: 'Password does not match' });
      return;
    }

    // console.log({ data });

    const dataToSubmit: { user: Omit<RegisterInputs, 'confirmPwd'> } = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    console.log({ dataToSubmit });
    // return;
    try {
      const res = await axios.post('/user/register', dataToSubmit);
      console.log(res);
      //TODO: add message when username duplicated
      //TODO: consider potential errors may occur
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={1} sx={{ padding: 4 }}>
          <Box textAlign={'center'}>
            <Typography variant="h2" fontSize={'24px'} fontWeight={700} margin={'0 0 9px'}>
              Sign up your account
            </Typography>
            <Typography variant="h4" className="h4-custom" fontSize={'16px'} margin={'0 0 27px'}>
              Fill in the fields below to sign up your account.
            </Typography>

            {/* {errorMsg && (
              <Alert severity="error" sx={{ borderRadius: '0.5rem', margin: '0px auto 1rem' }}>
                {errorMsg}
              </Alert>
            )} */}

            <form action="" onSubmit={handleSubmit(submit)}>
              <TextField
                error={errors.username && errors.username.message ? true : false}
                type="text"
                id="outlined-controlled"
                label="Username"
                {...register('username', registerOpts.username)}
                helperText={errors.username && errors.username.message}
                fullWidth
              />

              <TextField
                error={errors.email && errors.email.message ? true : false}
                type="text"
                id="outlined-controlled"
                label="Email"
                {...register('email', registerOpts.email)}
                helperText={errors.email && errors.email.message}
                fullWidth
                sx={{ margin: '16px 0 8px' }}
              />

              <FormControl fullWidth sx={{ margin: '16px 0 8px' }}>
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  error={errors.password && errors.password.message ? true : false}
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  error={errors.password && errors.password.message ? true : false}
                  id="outlined-adornment-password"
                  type={showPwd ? 'text' : 'password'}
                  {...register('password', registerOpts.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleShowPassword}>
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {errors.password && errors.password.message && (
                  <FormHelperText error>{errors.password.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ margin: '16px 0 8px' }}>
                <InputLabel
                  htmlFor="confirm-password"
                  error={errors.confirmPwd && errors.confirmPwd.message ? true : false}
                >
                  Confirm password
                </InputLabel>
                <OutlinedInput
                  error={errors.confirmPwd && errors.confirmPwd.message ? true : false}
                  id="confirm-password"
                  type={showPwd ? 'text' : 'password'}
                  {...register('confirmPwd', registerOpts.confirmPwd)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleShowPassword}>
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm password"
                />
                {errors.confirmPwd && errors.confirmPwd.message && (
                  <FormHelperText error>{errors.confirmPwd.message}</FormHelperText>
                )}
              </FormControl>

              <Box textAlign={'left'} sx={{ margin: '16px 0 8px' }} paddingX={2}>
                <Typography variant="h4" fontSize={'16px'}>
                  Already have one?{' '}
                  <Link style={{ textDecoration: 'none' }} to={'../user/login'}>
                    Sign in
                  </Link>
                  .
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ margin: '27px 0px 0px' }}
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  backgroundColor: 'rgb(85, 105, 255)',
                  borderRadius: '10px',
                }}
              >
                Sign up
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default RegisterPage;
