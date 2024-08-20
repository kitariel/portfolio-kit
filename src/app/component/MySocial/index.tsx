'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function SocialMediaLinks() {
  return (
    <Box display='flex' flexDirection='column' alignItems='start' gap={2} p={2}>
      <Box display='flex' justifyContent='start' gap={2}>
        <a
          href='https://www.linkedin.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <LinkedInIcon fontSize='large' />
        </a>
        <a href='https://github.com' target='_blank' rel='noopener noreferrer'>
          <GitHubIcon className='text-black' fontSize='large' />
        </a>
        <a
          href={`https://wa.me/09925975698`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <WhatsAppIcon className='text-green-500' fontSize='large' />
        </a>
        <a
          href='https://www.facebook.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FacebookIcon className='text-blue-600' fontSize='large' />
        </a>
      </Box>

      <Box display='flex' flexDirection='column' alignItems='start' gap={1}>
        <Box display='flex' alignItems='center' gap={1}>
          <EmailIcon className='text-red-400' fontSize='large' />
          <Typography
            variant='body1'
            component='a'
            href='mailto:kityoubagares94@gmail.com'
          >
            kityoubagares94@gmail.com
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' gap={1}>
          <WhatsAppIcon className='text-green-500' fontSize='large' />
          <Typography variant='body1'>+63 992 597 5698</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap={1}>
          <PhoneIcon className='text-blue-500' fontSize='large' />
          <Typography variant='body1'>+63 945 427 8134</Typography>
        </Box>
      </Box>
    </Box>
  );
}
