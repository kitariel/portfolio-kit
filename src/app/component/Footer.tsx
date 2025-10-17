'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        mt: 6,
        px: { xs: 2, md: 4 },
        py: 3,
        borderTop: '1px solid rgba(255,255,255,0.12)',
        background: 'linear-gradient(to right, rgba(12,10,20,0.6), rgba(12,10,20,0.3))',
      }}
      className='animate-fade-up'
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          © {new Date().getFullYear()} Kit Mikhael Bagares — Senior Full-Stack Engineer
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            component='a'
            href='https://www.linkedin.com/in/kit-mikhael-bagares-1143541a7/'
            color='inherit'
            className='hover-lift'
            aria-label='LinkedIn'
          >
            <LinkedInIcon fontSize='small' />
          </IconButton>
          <IconButton
            component='a'
            href='mailto:kityoubagares94@gmail.com'
            color='inherit'
            className='hover-lift'
            aria-label='Email'
          >
            <EmailIcon fontSize='small' />
          </IconButton>
          <IconButton
            component='a'
            href='tel:+639454278134'
            color='inherit'
            className='hover-lift'
            aria-label='Phone'
          >
            <PhoneIcon fontSize='small' />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}