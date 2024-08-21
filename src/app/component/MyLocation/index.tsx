'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function MyLocation() {
  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'center', md: 'start' }}
      justifyContent='center'
      gap={4}
      p={2}
    >
      {/* Address Section */}
      <Paper elevation={3} sx={{ p: 3, maxWidth: 400, textAlign: 'center' }}>
        <Typography variant='h6' gutterBottom>
          My Location
        </Typography>
        <Typography variant='body1'>
          Urban Deca Homes Banilad Tower 3, 311 Unit
        </Typography>
        <Typography variant='body1'>Cebu City, Philippines</Typography>
      </Paper>

      {/* OpenStreetMap Section */}
      <Box
        component='iframe'
        sx={{
          border: 0,
          width: { xs: '100%', md: '60%' },
          height: 250,
          maxWidth: 500,
        }}
        src='https://www.openstreetmap.org/export/embed.html?bbox=123.88543701171874%2C10.308635%2C123.91152191162111%2C10.330947&layer=mapnik&marker=10.319791%2C123.898480'
        allowFullScreen
      />
    </Box>
  );
}
