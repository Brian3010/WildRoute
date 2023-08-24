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
import { TypeMapper } from '../../@types/TypeMapper';
import '../../assets/LoginPage.css';

import { useErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router-dom';
import { IAuthContext } from '../../context/AuthProvider';
import useAuth from '../../hooks/useAuth';
import loginUserIn from '../../services/logUserIn';

interface LoginData {
  username: string;
  password: string;
}

type RegisterLogin = TypeMapper<LoginData, RegisterOptions>;

export default function LoginPage() {
  console.log('LoginPage render');
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from.pathname || '/';
  // console.log('file: index.tsx:39 ~ LoginPage ~ from:', from);

  const { showBoundary } = useErrorBoundary();
  const { setAuth } = useAuth() as IAuthContext;

  // console.log('file: index.tsx:33 ~ LoginPage ~ setAuth:', setAuth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    reset,
  } = useForm<LoginData>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // watch('username');

  // console.log('ERRORS', errors);
  // validate options
  const registerOpts: RegisterLogin = {
    username: {
      required: 'Username must not empty',
    },
    password: {
      required: 'Password must not empty',
      minLength: {
        value: 5,
        message: 'The password should have at minimum length of 5',
      },
    },
  };

  const submit: SubmitHandler<LoginData> = async data => {
    console.log('Form Submited');

    try {
      const res = await loginUserIn(data.username, data.password);
      console.log(res);
      if (res) setAuth(res);
      navigate(from, { replace: true });
    } catch (error) {
      showBoundary(error);
    }

    reset();
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container maxWidth="sm">
      <Paper elevation={1} sx={{ padding: 4 }}>
        <Box textAlign={'center'}>
          <Typography variant="h2" fontSize={'24px'} fontWeight={700} margin={'0 0 9px'}>
            Sign in
          </Typography>
          <Typography variant="h4" className="h4-custom" fontSize={'16px'} margin={'0 0 27px'}>
            Fill in the fields below to sign into your account.
          </Typography>

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
                type={showPassword ? 'text' : 'password'}
                {...register('password', registerOpts.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && errors.password.message && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
            </FormControl>
            <Box textAlign={'left'} sx={{ margin: '16px 0 8px' }} paddingX={2}>
              <Typography variant="h4" fontSize={'16px'}>
                Don't have an account yet? Sign up here.
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
              Sign in
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
