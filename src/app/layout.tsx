import './globals.css';
import type {Metadata} from 'next';
import {Inter, JetBrains_Mono, Sora} from 'next/font/google';
import {Toaster} from '@/components/ui/toaster';
import {Analytics} from '@vercel/analytics/next';
import {SmoothScroll} from '@/components/motion/smooth-scroll';
import {CustomCursor} from '@/components/motion/custom-cursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/** Display face -- geometric and confident, holds up at the oversized steps. */
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-kit-zeta.vercel.app'),
  title: 'Kit Mikhael Bagares — Full-Stack Engineer, AI-Augmented',
  description:
    '5+ years building production software — now shipping in hours what used to take weeks, by orchestrating models, agents, skills and workflows.',
  openGraph: {
    title: 'Kit Mikhael Bagares — Full-Stack Engineer, AI-Augmented',
    description:
      'Shipping in hours what used to take weeks, by orchestrating models, agents, skills and workflows.',
    url: 'https://portfolio-kit-zeta.vercel.app',
    siteName: 'kit.dev',
    images: ['/static/video/hero-crema.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kit Mikhael Bagares — Full-Stack Engineer, AI-Augmented',
    description:
      'Shipping in hours what used to take weeks, by orchestrating models, agents, skills and workflows.',
    images: ['/static/video/hero-crema.jpg'],
  },
};

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const {children} = props;
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body className='bg-roast font-inter antialiased text-cream' suppressHydrationWarning>
        <a href='#main' className='skip-link'>
          Skip to content
        </a>
        <SmoothScroll />
        <CustomCursor />
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
