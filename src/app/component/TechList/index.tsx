'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import JavascriptIcon from '@mui/icons-material/Javascript';
import NodeIcon from '@mui/icons-material/DevicesFoldSharp';
import TypescriptIcon from '@mui/icons-material/Code';
import NextIcon from '@mui/icons-material/NextPlan';
import NestIcon from '@mui/icons-material/FilterHdr';

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
    { name: 'NextJS', icon: <NextIcon fontSize='large' /> },
    { name: 'NestJS', icon: <NestIcon fontSize='large' /> },
    { name: 'JavaScript', icon: <JavascriptIcon fontSize='large' /> },
    { name: 'TypeScript', icon: <TypescriptIcon fontSize='large' /> },
    { name: 'NodeJS', icon: <NodeIcon fontSize='large' /> },
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
