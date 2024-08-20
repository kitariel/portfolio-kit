import * as React from 'react';
import Typography from '@mui/material/Typography';
import MyImage from './Image';
import Box from '@mui/material/Box';
const bull = (
  <Box
    component='span'
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function MySchool() {
  return (
    <div className='p-3 flex  justify-center items-center '>
      <MyImage />
      <div className='px-2'>
        <Typography fontFamily={'serif'} variant='h5' component={'div'}>
          UNIVERSITY OF SAN CARLOS
        </Typography>
        <Typography variant='h6' fontFamily={'serif'} component='div'>
          SCIENTIA{bull}VIRTUS{bull}DEVOTIO
        </Typography>
        <Typography variant='h6' fontFamily={'serif'} component='div'>
          Bachelor of Science in Computer Engineering
        </Typography>
        <Typography variant='h6' fontFamily={'serif'} component='div'>
          ( Software Engineer ) 2011 - 2019
        </Typography>
      </div>
    </div>
  );
}
