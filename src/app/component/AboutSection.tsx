'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function AboutSection() {
  const stats = [
    { value: 12, label: 'Total Projects', note: 'Innovative solutions crafted' },
    { value: 6, label: 'Certificates', note: 'Professional skills validated' },
    { value: 5, label: 'Years of Experience', note: 'Continuous learning journey' },
  ];

  return (
    <Box id='about' sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 }, textAlign: 'center' }}>
      <Typography variant='h3' sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>About Me</Typography>
      <Typography variant='body1' sx={{ maxWidth: 880, mx: 'auto', color: 'text.secondary' }}>
        Hello, I&apos;m Kit Mikhael Bagares—passionate about building smart and scalable web &amp; mobile applications. I architect developer platforms, design robust microservices, and ship beautiful frontends. I constantly explore new technologies to refine my craft and deliver impactful solutions.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button href='/static/resume/KitMikhaelBagaresNewResume.pdf' variant='contained'>Download CV</Button>
        <Button href='#portfolio' variant='outlined'>View Projects</Button>
      </Box>

      <Box sx={{ mt: 5, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
        {stats.map((s, i) => (
          <Card key={i} className='hover-lift animate-fade-up' sx={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <CardContent>
              <Typography variant='h3' sx={{ fontWeight: 800, background: 'linear-gradient(90deg, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</Typography>
              <Typography variant='subtitle1' sx={{ color: 'text.primary' }}>{s.label}</Typography>
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>{s.note}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}