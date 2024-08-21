import { Card, Paper, styled } from '@mui/material';

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // White background with 80% opacity
  ...theme.typography.body2,
  padding: theme.spacing(3),
  margin: theme.spacing(1),
  textAlign: 'center',
  boxShadow: theme.shadows[3], // Adjust shadow to match elevation
  color: theme.palette.text.secondary,
  transition: 'transform 0.3s ease', // Add a transition for hover effect
  '&:hover': {
    transform: 'scale(1.05)', // Slightly enlarge on hover
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // White background with 10% opacity
  color: theme.palette.text.secondary,
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3], // Adjust shadow to match elevation
  transition: 'transform 0.3s ease', // Add a transition for hover effect
  '&:hover': {
    transform: 'scale(1.05)', // Slightly enlarge on hover
  },
}));
