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
      color: '#E6E6E6',
      fontSize: '2.75rem',
      '@media (max-width:600px)': { fontSize: '2.25rem' },
    },
    h2: {
      color: '#E6E6E6',
      fontSize: '2.25rem',
      '@media (max-width:600px)': { fontSize: '2rem' },
    },
    h3: {
      color: '#E6E6E6',
      fontSize: '1.85rem',
      '@media (max-width:600px)': { fontSize: '1.6rem' },
    },
    h4: {
      color: '#E6E6E6',
      fontSize: '1.5rem',
      '@media (max-width:600px)': { fontSize: '1.3rem' },
    },
    h5: {
      color: '#E6E6E6',
      fontSize: '1.25rem',
      '@media (max-width:600px)': { fontSize: '1rem' },
    },
    h6: {
      color: '#B3B3B3',
      fontSize: '1rem',
      '@media (max-width:600px)': { fontSize: '0.9rem' },
    },
    body1: {
      color: '#B3B3B3',
      fontSize: '1rem',
      '@media (max-width:600px)': { fontSize: '0.95rem' },
    },
    body2: {
      color: '#A1A1AA',
      fontSize: '0.875rem',
      '@media (max-width:600px)': { fontSize: '0.8rem' },
    },
  },
  palette: {
    mode: 'dark',
    primary: { main: '#7C3AED' }, // violet
    secondary: { main: '#06B6D4' }, // cyan
    background: {
      default: '#0B0E1A',
      paper: 'rgba(255,255,255,0.05)',
    },
    text: {
      primary: '#E6E6E6',
      secondary: '#B3B3B3',
    },
  },
});

export default theme;
