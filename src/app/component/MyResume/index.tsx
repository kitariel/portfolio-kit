'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function MyResume() {
  const handleDownload = () => {
    // Logic to handle the resume download
    const link = document.createElement('a');
    link.href = 'static/resume/KitMikhaelBagaresNewResume.pdf'; // Replace with the path to your resume file
    link.download = 'My_Resume.pdf';
    link.click();
  };

  const handleView = () => {
    // Logic to handle viewing the resume in a new tab
    window.open('static/resume/KitMikhaelBagaresNewResume.pdf', '_blank'); // Replace with the path to your resume file
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant='h5' component='div'>
        RESUME
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Button
          variant='contained'
          color='primary'
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Download
        </Button>
        <Button
          variant='outlined'
          color='primary'
          startIcon={<VisibilityIcon />}
          onClick={handleView}
        >
          View
        </Button>
      </Box>
    </Box>
  );
}
