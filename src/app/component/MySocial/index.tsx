'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function SocialMediaLinks() {
  return (
    <div>
      <Typography variant='h6' component='h3' gutterBottom>
        Connect with me
      </Typography>
      <Box display='flex' justifyContent='center' gap={2}>
        <a
          href='https://www.linkedin.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <LinkedInIcon fontSize='large' />
        </a>
        <a href='https://github.com' target='_blank' rel='noopener noreferrer'>
          <GitHubIcon fontSize='large' />
        </a>
        <a
          href='https://wa.me/1234567890'
          target='_blank'
          rel='noopener noreferrer'
        >
          <WhatsAppIcon fontSize='large' />
        </a>
        <a
          href='https://www.facebook.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FacebookIcon fontSize='large' />
        </a>
      </Box>
    </div>
  );
}
