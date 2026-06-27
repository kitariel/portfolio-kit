import './globals.css';
import {Inter, JetBrains_Mono} from 'next/font/google';
import {Toaster} from '@/components/ui/toaster';
import {Analytics} from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const {children} = props;
  return (
    <html lang='en' suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className='bg-gradient-to-b from-[#0b0e1a] via-[#0f172a] to-[#0b0e1a] font-inter antialiased text-slate-200 selection:bg-violet-500/30 selection:text-white' suppressHydrationWarning>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
