import './globals.css';
import type {Metadata, Viewport} from 'next';
import {Inter, JetBrains_Mono, Space_Grotesk} from 'next/font/google';
import {Toaster} from '@/components/ui/toaster';
import {Analytics} from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kit Mikhael Bagares — Senior Full-Stack Engineer / Lead Developer',
  description:
    'I build production-ready digital products by connecting business goals, thoughtful user experience, scalable engineering, and practical AI workflows. Based in Cebu, Philippines.',
};

export const viewport: Viewport = {
  themeColor: '#06111f',
  colorScheme: 'dark',
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
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className='bg-background font-inter text-foreground antialiased' suppressHydrationWarning>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
