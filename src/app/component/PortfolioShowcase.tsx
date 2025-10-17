'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TechList from './TechList';

function ProjectCard({ title, description, demo, details }: { title: string; description: string; demo?: string; details?: string }) {
  return (
    <Card className='hover-lift animate-fade-up' sx={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
      <CardContent>
        <Box sx={{ height: 140, borderRadius: 2, mb: 2, position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)' }}>
          <Box className='bg-grid' sx={{ position: 'absolute', inset: 0, opacity: 0.25 }} />
          <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(124,58,237,0.35), transparent 50%), radial-gradient(circle at 70% 50%, rgba(6,182,212,0.25), transparent 50%)' }} />
        </Box>
        <Typography variant='h6' sx={{ color: 'text.primary', fontWeight: 700 }}>{title}</Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary', mt: 0.5 }}>{description}</Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          {demo && (
            <Button href={demo} target='_blank' rel='noopener noreferrer' variant='text'>Live Demo</Button>
          )}
          {details && (
            <Button href={details} target='_blank' rel='noopener noreferrer' variant='text'>Details</Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function PortfolioShowcase() {
  const [tab, setTab] = React.useState(0);
  const handleChange = (_: any, value: number) => setTab(value);

  return (
    <Box id='portfolio' sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 }, textAlign: 'center' }}>
      <Typography variant='h3' sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>Portfolio Showcase</Typography>
      <Typography variant='body1' sx={{ maxWidth: 900, mx: 'auto', color: 'text.secondary' }}>
        Explore my journey through projects, certifications, and technical expertise. Each section highlights milestones in my continuous learning path.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Tabs value={tab} onChange={handleChange} textColor='primary' indicatorColor='primary' sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: 2 }}>
          <Tab label='Projects' />
          <Tab label='Certificates' />
          <Tab label='Tech Stack' />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          <ProjectCard
            title='IntervueAI'
            description='Real-time mock interviews with AI. Natural, personalized conversations without forms.'
            demo='https://intervueai.example.com'
            details='https://github.com/kitariel'
          />
          <ProjectCard
            title='Blendy'
            description='A social app for real-time connection, one-click login, share moments instantly.'
            demo='https://blendy.example.com'
            details='https://github.com/kitariel'
          />
          <ProjectCard
            title='WATCHit'
            description='Streaming app for personal entertainment with a smooth browsing experience.'
            demo='https://watchit.example.com'
            details='https://github.com/kitariel'
          />
        </Box>
      )}

      {tab === 1 && (
        <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {['AWS Certified Cloud Practitioner', 'MUI Advanced', 'TypeScript Intermediate'].map((c) => (
            <Card key={c} className='hover-lift animate-fade-up' sx={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <CardContent>
                <Typography variant='h6' sx={{ color: 'text.primary' }}>{c}</Typography>
                <Typography variant='caption' sx={{ color: 'text.secondary' }}>Credentialed</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {tab === 2 && (
        <Box sx={{ mt: 4 }}>
          <TechList />
        </Box>
      )}
    </Box>
  );
}