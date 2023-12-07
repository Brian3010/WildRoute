import { Box, Typography } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <Box
      component={'footer'}
      sx={{
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        textAlign: 'center',
        background: 'black',
        color: 'white',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.1rem',
        }}
      >
        WildRoute
      </Typography>
      <Box>Social Medias here</Box>
      <Typography variant="overline">&copy; 2023 Brian Nguyen. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;
//TODO: Fix footer to be at the bottom where it belongs
//TODO: add social medias
//TODO: add background and stuff for the homepage
