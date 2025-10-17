import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../theme';
import Header from './component/Header';
import CursorGlow from './component/CursorGlow';
import GridBackground from './component/GridBackground';
import './globals.css';
import Footer from './component/Footer';

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const {children} = props;
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-gradient-to-b from-[#0b0e1a] via-[#0f172a] to-[#0b0e1a]' suppressHydrationWarning>
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
          <ThemeProvider theme={theme}>
            <CursorGlow />
            <GridBackground />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
