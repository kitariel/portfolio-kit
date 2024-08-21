'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export default function TechList() {
  const techs = [
    {
      name: 'NextJS',
      icon: (
        <Avatar
          alt='NextJS'
          src='../../assets/images/nextjs.jpg'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'NestJS',
      icon: (
        <Avatar
          alt='NestJS'
          src='../../assets/images/nestjs.webp'
          sx={{ width: 150, height: 85 }}
        />
      ),
    },
    {
      name: 'JavaScript',
      icon: (
        <Avatar
          alt='JavaScript'
          src='../../assets/images/Javascript.png'
          sx={{ width: 86, height: 85 }}
        />
      ),
    },
    {
      name: 'TypeScript',
      icon: (
        <Avatar
          alt='TypeScript'
          src='../../assets/images/typescript.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'NodeJS',
      icon: (
        <Avatar
          alt='NodeJS'
          src='../../assets/images/nodejs.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'Grpc',
      icon: (
        <Avatar
          alt='Grpc'
          src='../../assets/images/grpc.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'Linux',
      icon: (
        <Avatar
          alt='Linux'
          src='../../assets/images/linux.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'ReactJS',
      icon: (
        <Avatar
          alt='ReactJS'
          src='../../assets/images/reactjs.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'RethinkDB',
      icon: (
        <Avatar
          alt='RethinkDB'
          src='../../assets/images/rethinkdb.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'C#',
      icon: (
        <Avatar
          alt='C#'
          src='../../assets/images/csharp.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'Docker',
      icon: (
        <Avatar
          alt='Docker'
          src='../../assets/images/docker.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'Git',
      icon: (
        <Avatar
          alt='Git'
          src='../../assets/images/git.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'GraphQL',
      icon: (
        <Avatar
          alt='GraphQL'
          src='../../assets/images/gql.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'Socket.io',
      icon: (
        <Avatar
          alt='Socket.io'
          src='../../assets/images/socketio.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'Kafka',
      icon: (
        <Avatar
          alt='Kafka'
          src='../../assets/images/kafka.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'XState',
      icon: (
        <Avatar
          alt='XState'
          src='../../assets/images/xstate.svg'
          sx={{ width: 150, height: 85 }}
        />
      ),
    },
    {
      name: 'ExpressJS',
      icon: (
        <Avatar
          alt='ExpressJS'
          src='../../assets/images/expressjs.png'
          sx={{ width: 150, height: 85 }}
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
      }}
      paddingY={2}
    >
      <Box
        sx={{
          display: 'flex',
          animation: 'scroll 50s linear infinite',
          '@keyframes scroll': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-100%)' },
          },
          whiteSpace: 'nowrap', // Keeps content on one line
        }}
      >
        {techs.map((tech, index) => (
          <Box key={index} sx={{ minWidth: '200px', marginRight: 2 }}>
            <Item>
              {tech.icon}
              <Typography variant='subtitle1'>{tech.name}</Typography>
            </Item>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
