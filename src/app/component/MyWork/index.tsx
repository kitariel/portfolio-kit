'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import WorkIcon from '@mui/icons-material/Work';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Button from '@mui/material/Button';
import { StyledCard } from '../Item';

interface WorkExperience {
  year: string;
  company: string;
  role: string;
  description: string;
}

const workExperiences: WorkExperience[] = [
  {
    year: 'Apr 2022 – Present',
    company: 'DNA Micro Software Inc.',
    role: 'Senior Lead Full Stack Developer',
    description: `
      - Lead a team of 6 developers, collaborating with QA, product managers, and UI/UX to deliver high-quality applications.
      - Designed and implemented scalable microservice architectures enabling independent development and faster deployments.
      - Built internal developer platforms and project templates that reduced setup time by ~70%.
      - Mentored junior engineers, introduced best practices in code quality, testing, and architectural decision-making.
      - Partnered with clients to define requirements, set expectations, and ensure smooth delivery across multiple projects.
    `,
  },
  {
    year: 'Jul 2020 – Apr 2022',
    company: 'DNA Micro Software Inc.',
    role: 'Software Engineer',
    description: `
      - Developed a dynamic, template-based React platform that accelerated product rollout across 5+ projects.
      - Improved API response times by 40% through service optimization and async data handling.
      - Created microservice APIs with Express.js to enable modular, scalable development and independent team workflows.
      - Designed real-time monitoring and debugging tools, reducing issue resolution time by over 50%.
      - Key role integrating the GoRentals luxury car booking platform with reusable architecture patterns.
    `,
  },
  {
    year: 'Sep 2019 – May 2020',
    company: 'Arielus Software Inc. (formerly 3AG Business Solutions Inc.)',
    role: 'Software Engineer',
    description: `
      - Built full-stack web and mobile apps for merchant and booking services, managing both frontend and backend.
      - Implemented the Yaxxi booking platform with OTP verification, fraud detection, and admin monitoring dashboards.
      - Created invoice and payment tracking systems that increased billing accuracy and transaction reliability.
      - Collaborated cross-functionally to align technical solutions with business goals and ensure on-time delivery.
    `,
  },
];

export default function MyWork() {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant='h4' component='h2' gutterBottom>
        My Work Experience
      </Typography>

      <Timeline position='alternate'>
        {workExperiences.map((work, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography variant='h6' color='textSecondary'>
                {work.year}
              </Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot color='primary'>
                <WorkIcon />
              </TimelineDot>
              {index < workExperiences.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <StyledCard elevation={3}>
                <CardContent>
                  <Typography variant='h6' component='h3'>
                    {work.company}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {work.role}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant='h6'>
                    {expandedIndex === index
                      ? work.description
                      : `${work.description.slice(0, 100)}...`}
                  </Typography>
                  <Button
                    size='small'
                    onClick={() => handleToggleExpand(index)}
                    sx={{ mt: 1 }}
                  >
                    {expandedIndex === index ? 'Show Less' : 'Show More'}
                  </Button>
                </CardContent>
              </StyledCard>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
