import { Box, Paper, Typography } from '@mui/material';
import MyImage from './Image';

export default function MyName() {
  return (
    <div>
      <div className='space-x-2 justify-center flex flex-row m-1'>
        <MyImage />
        <Box>
          <Typography variant='h4'>Kit Mikhael Bagares</Typography>
          <Typography variant='h6' component='div'>
            Full-stack Developer
          </Typography>
        </Box>
      </div>
      <Typography paddingY={3} variant='h6' component='div'>
        A highly motivated and results-driven individual with a strong hunger
        for knowledge and a commitment to continuous learning. Passionate about
        developing innovative applications and mastering new programming
        languages and architectures to improve services and web applications.
        Dedicated to creating creative and useful solutions that push the
        boundaries of technology and contribute to future advancements. Eager to
        thrive in dynamic environments and make a significant impact through
        continuous professional growth.
      </Typography>
    </div>
  );
}
