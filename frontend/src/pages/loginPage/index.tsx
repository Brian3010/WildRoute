import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { FormEvent } from 'react';
import '../../assets/LoginPage.css';

export default function LoginPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form Submited');
  };

  return (
    <Container maxWidth="sm" sx={{ border: '1px solid yellow' }}>
      <Paper elevation={1} sx={{ padding: 4 }}>
        <Box textAlign={'center'}>
          <Typography variant="h2" fontSize={'30px'} fontWeight={700} margin={'0 0 9px'}>
            Sign in
          </Typography>
          <Typography variant="h4" className="h4-custom" fontSize={'16px'} margin={'0 0 27px'}>
            Fill in the fields below to sign into your account.
          </Typography>

          <form action="" onSubmit={handleSubmit}>
            <TextField id="outlined-controlled" label="Username" fullWidth />

            <TextField id="outlined-controlled" label="Password" fullWidth sx={{ margin: '16px 0 8px' }} />

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
