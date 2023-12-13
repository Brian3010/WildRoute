import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../assets/HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage-container">
      <Box component={'div'} className="homepage-div">
        <Typography variant="h4">Welcome to WildRoute</Typography>
        <Typography variant="body1" fontSize={18} marginTop={1}>
          Your compass to outdoor wonders! Find, rate, and share your favorite activities, from mountain treks to
          seaside strolls. Craft your adventure profile, connect with fellow explorers, and dive into a world of
          thrilling possibilities.
        </Typography>

        <Typography variant="caption" fontSize={16} display={'block'}>
          WildRoute - where every step is a story, and every trail is a tale waiting to be told
        </Typography>

        <Button
          href="/activities"
          className="homepage-btn"
          sx={{
            color: '#ffff',
            fontSize: '1rem',
            fontWeight: 800,
            fontFamily: 'inherit',
            textTransform: 'initial',
            marginTop: 2,
          }}
        >
          Explore now
        </Button>
      </Box>
    </div>
  );
}
