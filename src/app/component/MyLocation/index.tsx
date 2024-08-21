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
      flexDirection='column' // Stack vertically by default
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
        <Typography variant='body1'>Urban Deca Homes Banilad</Typography>
        <Typography variant='body1'>Cebu City, Philippines</Typography>
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
          width: '100%', // Full width
          maxWidth: 600,
          height: { xs: 250, sm: 300, md: 350 }, // Adjust height for different screen sizes
        }}
        src='https://www.openstreetmap.org/export/embed.html?bbox=123.88543701171874%2C10.308635%2C123.91152191162111%2C10.330947&layer=mapnik&marker=10.319791%2C123.898480'
        allowFullScreen
      />
    </Box>
  );
}
