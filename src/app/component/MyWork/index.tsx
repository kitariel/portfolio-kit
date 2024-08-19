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

interface WorkExperience {
  year: string;
  company: string;
  role: string;
  description: string;
}

const workExperiences: WorkExperience[] = [
  {
    year: '2022',
    company: 'DNA Micro Software INC.',
    role: 'Senior Lead Full Stack Developer',
    description: `
      - Led a dynamic team, fostering strong relationships by understanding individual team members' characters, teaching quality coding practices, and conducting thorough code reviews.
      - Resolved major issues to support the team and enhance their productivity and work quality.
      - Created initial services and templates to expedite API development, enabling the team to work efficiently and deliver rapid results.
      - Interacted with clients to ensure optimal user experience, managing expectations and setting clear limits for functionalities not yet implemented.
    `,
  },
  {
    year: '2020',
    company: 'DNA Micro Software INC.',
    role: 'Software Engineer',
    description: `
      - Conducted research and development for a template platform to produce smart React applications, dynamically rendered based on database data.
      - Integrated a major project called GoRentals, a luxury car booking company, into a new template to ensure rapid development based on configuration.
      - Developed a microservice API using Express, enabling developers to work independently on different modules within the project.
      - Created monitoring tools for microservices to track and identify errors, providing specific date-based insights for troubleshooting.
    `,
  },
  {
    year: '2019',
    company: 'Arielus Software Inc. (formerly 3AG Business Solutions Inc)',
    role: 'Software Engineer',
    description: `
      - Developed and maintained a comprehensive merchant application, managing both client and admin sides to ensure security and functionality.
      - Implemented features such as location pinning for merchants, dynamic work hours updates, and robust monitoring to prevent malicious content.
      - Designed and launched the Yaxxi booking service, enabling users to book taxis or private cars with integrated safety measures.
      - Integrated an admin-side monitoring system to combat fraudulent activities and fake accounts, including OTP verification through Google and other email services.
      - Created detailed invoices to facilitate accurate payment tracking for customers, supporting both cash and card transactions.
    `,
  },
];

export default function MyWork() {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box padding={3}>
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
              <Card elevation={3}>
                <CardContent>
                  <Typography variant='h6' component='h3'>
                    {work.company}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {work.role}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant='body2'>
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
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
