'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MyName from './MyName';
import TechList from './TechList';
import MyResume from './MyResume';
import MyWork from './MyWork';
import SocialMediaLinks from './MySocial';
import MySchool from './MySchool';
import MyLocation from './MyLocation';
import { Item } from './Item';

export default function Main() {
  return (
    <Box padding={1}>
      <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        <Grid xs={8} sm={6} md={4} lg={2}>
          <Item>
            <MyName />
            <SocialMediaLinks />
          </Item>
        </Grid>
        <Grid xs={8} sm={6} md={4} lg={2}>
          <MyLocation />
        </Grid>
        <Grid xs={10} sm={8} md={6} lg={4}>
          <Item>
            <MyResume />
          </Item>
        </Grid>
        <Grid xs={10} sm={8} md={6} lg={4}>
          <Item>
            <MySchool />
          </Item>
        </Grid>
        <Grid xs={12} sm={8} md={6} lg={4}>
          <MyWork />
        </Grid>
        <Grid xs={9} sm={6} md={4} lg={4}>
          <TechList />
        </Grid>
      </Grid>
    </Box>
  );
}
