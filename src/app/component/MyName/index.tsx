import { Box, Typography } from '@mui/material';
import MyImage from './Image';

export default function MyName() {
  return (
    <Box padding={2}>
      {/* Container for image and name */}
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        gap={2}
        margin={1}
      >
        <MyImage /> {/* Replace with your image component */}
        <Box>
          <Typography variant='h4'>Kit Mikhael Bagares</Typography>
          <Typography variant='h6' color='textSecondary'>
            Full-stack Developer
          </Typography>
        </Box>
      </Box>

      <Typography align='left' paddingY={3} variant='h5'>
        A highly motivated and results-driven individual with a strong hunger
        for knowledge and a commitment to continuous learning. Passionate about
        developing innovative applications and mastering new programming
        languages and architectures to improve services and web applications.
        Dedicated to creating creative and useful solutions that push the
        boundaries of technology and contribute to future advancements. Eager to
        thrive in dynamic environments and make a significant impact through
        continuous professional growth.
      </Typography>
    </Box>
  );
}
