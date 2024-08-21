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
    // Customize letter spacing for different text elements
    h1: {
      color: '#969590', // White for headings
    },
    h2: {
      color: '#969590', // White for subheadings
    },
    body1: {
      color: '#f0f0f0', // Light grey for body text
    },
    body2: {
      color: '#f0f0f0', // Light grey for secondary body text
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
