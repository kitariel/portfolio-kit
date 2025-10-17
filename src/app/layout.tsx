import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { AnimatedCursor } from '@/components/animated-cursor';

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
      <body className='bg-gradient-to-b from-[#0b0e1a] via-[#0f172a] to-[#0b0e1a] font-inter antialiased cursor-none' suppressHydrationWarning>
        <AnimatedCursor />
        {children}
      </body>
    </html>
  );
}
