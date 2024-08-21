'use client';

import { Quicksand } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const typeFont = Quicksand({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: typeFont.style.fontFamily,
    // Responsive font sizes for headings
    h1: {
      color: '#969590', // Color for h1
      fontSize: '2.5rem', // Default font size for h1
      '@media (max-width:600px)': {
        fontSize: '2rem', // Smaller font size for small screens
      },
    },
    h2: {
      color: '#f0f0f0', // Color for h2
      fontSize: '2rem', // Default font size for h2
      '@media (max-width:600px)': {
        fontSize: '1.75rem', // Smaller font size for small screens
      },
    },
    h3: {
      color: '#f0f0f0', // Color for h3
      fontSize: '1.75rem', // Default font size for h3
      '@media (max-width:600px)': {
        fontSize: '1.5rem', // Smaller font size for small screens
      },
    },
    h4: {
      color: '#f0f0f0', // Color for h4
      fontSize: '1.5rem', // Default font size for h4
      '@media (max-width:600px)': {
        fontSize: '1.25rem', // Smaller font size for small screens
      },
    },
    h5: {
      color: '#f0f0f0', // Color for h5
      fontSize: '1.25rem', // Default font size for h5
      '@media (max-width:600px)': {
        fontSize: '1rem', // Smaller font size for small screens
      },
    },
    h6: {
      color: '#f0f0f0', // Color for h6
      fontSize: '1rem', // Default font size for h6
      '@media (max-width:600px)': {
        fontSize: '0.875rem', // Smaller font size for small screens
      },
    },
    body1: {
      color: '#f0f0f0', // Color for body1
      fontSize: '1rem', // Default font size for body1
      '@media (max-width:600px)': {
        fontSize: '0.875rem', // Smaller font size for small screens
      },
    },
    body2: {
      color: '#f0f0f0', // Color for body2
      fontSize: '0.875rem', // Default font size for body2
      '@media (max-width:600px)': {
        fontSize: '0.75rem', // Smaller font size for small screens
      },
    },
  },
  palette: {
    text: {
      primary: '#f0f0f0', // Light grey for primary text
      secondary: '#ffffff', // White for secondary text or headings
    },
  },
});

export default theme;
