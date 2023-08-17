import { Box } from '@mui/material';

export default function MapDisplay() {
  return (
    <Box sx={{ width: '100%', maxHeight: '400px', padding: '10px' }}>
      <img
        src="https://i.imgur.com/klfTJoL.png"
        alt="activity location"
        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '1%' }}
      />
    </Box>
  );
}
