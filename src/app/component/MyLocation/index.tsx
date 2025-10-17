'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import { Item } from '../Item';

export default function MyLocation() {
  return (
    <Box
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      gap={2}
      p={1}
    >
      {/* Address Section */}
      <Item>
        <Typography variant='h6' gutterBottom>
          My Location
        </Typography>
        <Typography variant='body1'>Consolacion City, Cebu, Philippines</Typography>
      </Item>

      {/* OpenStreetMap Section */}
      <Box
        alignSelf={'center'}
        alignItems='center'
        justifyContent='center'
        display='flex'
        component='iframe'
        sx={{
          padding: 2,
          border: 0,
          width: '100%',
          maxWidth: 600,
          height: { xs: 250, sm: 300, md: 350 },
        }}
        src='https://www.openstreetmap.org/export/embed.html?bbox=123.992%2C10.347%2C124.017%2C10.387&layer=mapnik&marker=10.373%2C123.999' 
        allowFullScreen
      />
    </Box>
  );
}
