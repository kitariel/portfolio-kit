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
        <MyImage />
        <Box>
          <Typography variant="h1" fontSize={{ xs: 28, sm: 36 }}>
            Kit Mikhael Bagares
          </Typography>
          <Typography variant="h2" fontSize={{ xs: 18, sm: 24 }}>
            Senior Full-Stack Engineer
          </Typography>
          <Typography variant="body1" fontSize={{ xs: 12, sm: 14 }}>
            Innovative and results-driven Senior Full-Stack Engineer with 5+ years of experience in designing scalable architectures, building developer platforms, and leading high-performing teams. Passionate about crafting robust software ecosystems that empower developers and enhance user experience.
          </Typography>
        </Box>
      </Box>

      <Typography align='left' paddingY={3} variant='h5'>
        Innovative and results-driven Senior Full-Stack Engineer with 5+ years of experience in designing scalable architectures,
        building developer platforms, and leading high-performing teams. Passionate about crafting robust software ecosystems that
        empower developers and enhance user experience. Strong background in microservice architecture, frontend frameworks, and
        backend APIs, with a focus on maintainability, performance, and team collaboration. Eager to contribute to globally
        distributed teams and deliver impactful solutions at scale.
      </Typography>
    </Box>
  );
}
