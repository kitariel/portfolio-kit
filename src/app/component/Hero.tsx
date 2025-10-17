'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import BoltIcon from '@mui/icons-material/Bolt';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Hero() {
  return (
    <Box id='home' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, padding: { xs: 2, md: 4 } }}>
      {/* Left: Title and actions */}
      <Box className='animate-fade-up' sx={{ flex: 1, minWidth: 280 }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.5, borderRadius: 9999, backgroundColor: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.35)' }}>
          <BoltIcon fontSize='small' sx={{ color: 'primary.light' }} />
          <Typography variant='caption' sx={{ color: 'primary.light' }}>Ready to Innovate</Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant='h2' sx={{ fontWeight: 800, color: 'text.primary' }}>Full Stack</Typography>
          <Typography variant='h2' sx={{ fontWeight: 800, background: 'linear-gradient(90deg, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Developer</Typography>
        </Box>

        <Typography variant='body1' sx={{ mt: 2, color: 'text.secondary' }}>
          Enhancing digital experiences that are smooth, scalable, and made to impress.
        </Typography>

        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {['React', 'Javascript', 'Node.js', 'PostgreSQL'].map((skill) => (
            <Chip key={skill} label={skill} className='hover-lift' sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: 'text.primary', border: '1px solid rgba(255,255,255,0.12)' }} />
          ))}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button href='#portfolio' variant='contained' color='primary' className='hover-lift'>Projects</Button>
          <Button href='mailto:kityoubagares94@gmail.com' variant='outlined' color='primary' className='hover-lift'>Contact</Button>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', gap: 1.5 }}>
          <a href='https://www.linkedin.com/in/kit-mikhael-bagares-1143541a7/' target='_blank' rel='noopener noreferrer' className='hover-lift'>
            <LinkedInIcon fontSize='medium' />
          </a>
          <a href='https://github.com/kitariel' target='_blank' rel='noopener noreferrer' className='hover-lift'>
            <GitHubIcon fontSize='medium' />
          </a>
          <a href='https://wa.me/639454278134' target='_blank' rel='noopener noreferrer' className='hover-lift'>
            <WhatsAppIcon fontSize='medium' />
          </a>
        </Box>
      </Box>

      {/* Right: Illustration / decorative panel */}
      <Box className='float-slow' sx={{ flex: 1, minHeight: 280, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', width: { xs: '100%', md: '80%' }, height: { xs: 220, md: 320 }, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)' }}>
          <Box className='bg-grid' sx={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
          <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(124,58,237,0.35), transparent 50%), radial-gradient(circle at 70% 50%, rgba(6,182,212,0.25), transparent 50%)' }} />
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ px: 2, py: 1, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              Visual placeholder
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}