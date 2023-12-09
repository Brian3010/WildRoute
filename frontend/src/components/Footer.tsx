import { Box, Typography } from '@mui/material';
import React from 'react';
import '../assets/Footer.css';
import socialMediaIcons from '../images/socialMediaIcons';

function Footer() {
  return (
    <Box
      component={'footer'}
      sx={{
        marginTop: 'auto',
        padding: '10px',
        // textAlign: 'center',
        backgroundColor: '#121212',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'space-between' },
          padding: '0 50px 0 50px',
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
            }}
          >
            WildRoute
          </Typography>
          <Box component={'div'} className="social-media-container">
            <a href="https://github.com/Brian3010" target="_blank">
              <img src={socialMediaIcons.GitHubIcon} alt="GitHub icon" />
            </a>
            <a href="https://www.linkedin.com/in/brian-nguyen-411483196" target="_blank">
              <img src={socialMediaIcons.LinkedInIcon} alt="Linkedin icon" />
            </a>
            <a href="mailto:briannguyenwg@gmail.com" >
              <img src={socialMediaIcons.GmailIcon} alt="Gmail icon" />
            </a>
          </Box>
        </Box>
        <Typography alignSelf="flex-end" variant="overline">
          &copy; 2023 Brian Nguyen. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
//TODO: add social medias
//TODO: add background and stuff for the homepage
