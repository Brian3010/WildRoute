import { Container, Paper, Typography } from '@mui/material';
import NewForm from './NewForm';

/** Component */
function NewActivity() {
  return (
    <Container maxWidth="sm">
      <Paper variant="outlined" sx={{ padding: 3 }}>
        <Typography component="h1" variant="h4" align="center" marginBottom={5}>
          Create New Activity
        </Typography>

        {/* new activity form */}

        <NewForm />
      </Paper>
    </Container>
  );
}

export default NewActivity;
