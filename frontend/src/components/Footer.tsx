import { Box, Typography } from '@mui/material';
import { CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/Footer.css';
import socialMediaIcons from '../images/socialMediaIcons';

const footerStyle: CSSProperties | undefined = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: 'transparent',
};

function Footer() {
  const location = useLocation();

  return (
    <Box
      component={'footer'}
      sx={{
        marginTop: '80px',
        paddingLeft: '2.5vw',
        paddingRight: '2.5vw',
        // textAlign: 'center',
        backgroundColor: '#121212',
        color: '#fff',
      }}
      style={location.pathname === '/' ? footerStyle : undefined}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'space-between' },
          padding: '10px 30px 0 30px',
          flexWrap: 'wrap',
        }}
      >
        <Box>
          {location.pathname !== '/' && (
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
          )}
          <Box component={'div'} className="social-media-container">
            <a href="https://github.com/Brian3010" target="_blank">
              <img src={socialMediaIcons.GitHubIcon} alt="GitHub icon" />
            </a>
            <a href="https://www.linkedin.com/in/brian-nguyen-411483196" target="_blank">
              <img src={socialMediaIcons.LinkedInIcon} alt="Linkedin icon" />
            </a>
            <a href="mailto:briannguyenwg@gmail.com">
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
