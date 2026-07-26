import './globals.css';
import type {Metadata, Viewport} from 'next';
import {Instrument_Sans, IBM_Plex_Mono} from 'next/font/google';
import {Analytics} from '@vercel/analytics/next';

const display = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kit Mikhael Bagares — Senior Full-Stack Engineer',
  description:
    'Senior full-stack engineer in Cebu, Philippines. I design and ship production systems — web, mobile, and the infrastructure behind them.',
  openGraph: {
    title: 'Kit Mikhael Bagares — Senior Full-Stack Engineer',
    description:
      'I design and ship production systems — web, mobile, and the infrastructure behind them.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#EEE9DF',
};

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const {children} = props;

  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
