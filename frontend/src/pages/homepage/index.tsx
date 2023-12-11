import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../assets/HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage-container">
      <Box component={'div'} className="homepage-div">
        <Link
          to={'/activities'}
          style={{
            textDecoration: 'none',
            color: '#ffffff',
            position: 'absolute',
          }}
        >
          View Activities
        </Link>
      </Box>
    </div>
  );
}
