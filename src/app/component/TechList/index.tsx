'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

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
          src='../../assets/images/graphql.png'
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
          src='../../assets/images/xstate.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
    {
      name: 'ExpressJS',
      icon: (
        <Avatar
          alt='ExpressJS'
          src='../../assets/images/expressjs.png'
          sx={{ width: 85, height: 85 }}
        />
      ),
    },
  ];

  return (
    <Box>
      <Grid container spacing={1}>
        {techs.map((tech, index) => (
          <Grid key={index} xs={12} sm={6} md={4} lg={3}>
            <Item>
              {tech.icon}
              <Typography variant='subtitle1'>{tech.name}</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
