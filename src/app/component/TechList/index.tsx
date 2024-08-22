'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
import { Item } from '../Item';
import { ArrowBack, ArrowForward, ArrowLeft } from '@mui/icons-material';

export default function TechList() {
  const techs = [
    {
      name: 'NextJS',
      icon: (
        <Avatar
          alt='NextJS'
          src='static/images/nextjs.jpg'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'NestJS',
      icon: (
        <Avatar
          alt='NestJS'
          src='static/images/nestjs.webp'
          sx={{ width: 130, height: 45 }}
        />
      ),
    },
    {
      name: 'JavaScript',
      icon: (
        <Avatar
          alt='JavaScript'
          src='static/images/Javascript.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'TypeScript',
      icon: (
        <Avatar
          alt='TypeScript'
          src='static/images/typescript.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'NodeJS',
      icon: (
        <Avatar
          alt='NodeJS'
          src='static/images/nodejs.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'Grpc',
      icon: (
        <Avatar
          alt='Grpc'
          src='static/images/grpc.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'Linux',
      icon: (
        <Avatar
          alt='Linux'
          src='static/images/linux.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'ReactJS',
      icon: (
        <Avatar
          alt='ReactJS'
          src='static/images/reactjs.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'RethinkDB',
      icon: (
        <Avatar
          alt='RethinkDB'
          src='static/images/rethinkdb.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'C#',
      icon: (
        <Avatar
          alt='C#'
          src='static/images/csharp.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'Docker',
      icon: (
        <Avatar
          alt='Docker'
          src='static/images/docker.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'Git',
      icon: (
        <Avatar
          alt='Git'
          src='static/images/git.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'GraphQL',
      icon: (
        <Avatar
          alt='GraphQL'
          src='static/images/gql.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'Socket.io',
      icon: (
        <Avatar
          alt='Socket.io'
          src='static/images/socketio.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'Kafka',
      icon: (
        <Avatar
          alt='Kafka'
          src='static/images/kafka.png'
          sx={{ width: 45, height: 45 }}
        />
      ),
    },
    {
      name: 'XState',
      icon: (
        <Avatar
          alt='XState'
          src='static/images/xstate.svg'
          sx={{ width: 130, height: 45 }}
        />
      ),
    },
    {
      name: 'ExpressJS',
      icon: (
        <Avatar
          alt='ExpressJS'
          src='static/images/expressjs.png'
          sx={{ width: 100, height: 45 }}
        />
      ),
    },
  ];
  const rows = [
    techs.slice(0, Math.ceil(techs.length / 2)),
    techs.slice(Math.ceil(techs.length / 2)),
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingY: 2,
      }}
    >
      {rows.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: 'flex',
            overflowX: 'scroll', // Enable horizontal scroll
            whiteSpace: 'nowrap',
            marginBottom: 2, // Space between rows
            '&::-webkit-scrollbar': {
              display: 'none', // Hide scrollbar for WebKit browsers
            },
            msOverflowStyle: 'none', // Hide scrollbar for Internet Explorer and Edge
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
          }}
        >
          {row.map((tech, index) => (
            <Box key={index} sx={{ minWidth: '200px', marginRight: 2 }}>
              <Item
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                {tech.icon}
                <Typography variant='subtitle1'>{tech.name}</Typography>
              </Item>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
