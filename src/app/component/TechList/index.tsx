'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Item } from '../Item';

export default function TechList() {
  const techs = [
    { name: 'JavaScript', src: '/static/images/javascript.png' },
    { name: 'TypeScript', src: '/static/images/typescript.png' },
    { name: 'Node JS', src: '/static/images/nodejs.png' },
    { name: 'Express JS', src: '/static/images/expressjs.png' },
    { name: 'React', src: '/static/images/reactjs.png' },
    { name: 'Next.js', src: '/static/images/nextjs.jpg' },
    { name: 'Nest.js', src: '/static/images/nestjs.webp' },
    { name: 'GraphQL', src: '/static/images/gql.png' },
    { name: 'Docker', src: '/static/images/docker.png' },
    { name: 'Git', src: '/static/images/git.png' },
    { name: 'Socket.IO', src: '/static/images/socketio.png' },
    { name: 'Kafka', src: '/static/images/kafka.png' },
    { name: 'gRPC', src: '/static/images/grpc.png' },
    { name: 'XState', src: '/static/images/xstate.svg' },
    { name: 'Linux', src: '/static/images/linux.png' },
    { name: 'RethinkDB', src: '/static/images/rethinkdb.png' },
    { name: 'C#', src: '/static/images/csharp.png' },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(6, 1fr)',
        },
        gap: 2,
        width: '100%',
        py: 2,
      }}
    >
      {techs.map((t, idx) => (
        <Item
          key={t.name + idx}
          className='hover-lift animate-fade-up'
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* grid overlay */}
          <Box className='bg-grid' sx={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
          {/* soft glow */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(120px circle at 50% 30%, rgba(124,58,237,0.25), transparent 60%), radial-gradient(120px circle at 50% 70%, rgba(6,182,212,0.15), transparent 60%)',
              filter: 'blur(6px)',
            }}
          />

          {/* content */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              py: 1.5,
            }}
          >
            <Avatar alt={t.name} src={t.src} sx={{ width: 56, height: 56 }} />
            <Typography
              variant='subtitle2'
              sx={{ color: 'text.primary', fontWeight: 600, textAlign: 'center' }}
            >
              {t.name}
            </Typography>
          </Box>
        </Item>
      ))}
    </Box>
  );
}
