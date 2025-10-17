'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const pages = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: 'mailto:kityoubagares94@gmail.com' },
];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const navMenuButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position='sticky'
      sx={{
        background: 'linear-gradient(to right, rgba(12,10,20,0.85), rgba(12,10,20,0.6))',
        backdropFilter: 'blur(6px)',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Avatar
            className='px-1'
            alt='Kit'
            src='/static/images/Me1.png'
            sx={{ width: 60, height: 60 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white', // Ensure the text is visible
              textDecoration: 'none',
            }}
          >
            KMB
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
              ref={navMenuButtonRef}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={navMenuButtonRef.current ?? anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                background:
                  'linear-gradient(to right, #0a192f, #112240, #233554)', // Match the gradient
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} component='a' href={page.href} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center' color='textPrimary'>
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 5,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white', // Ensure the text is visible
              textDecoration: 'none',
            }}
          >
            KMB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component='a'
                href={page.href}
                onClick={handleCloseNavMenu}
                className='hover-lift'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5, ml: 2 }}>
            <IconButton
              component='a'
              href='https://www.linkedin.com/in/kit-mikhael-bagares-1143541a7/'
              color='inherit'
              className='hover-lift animate-fade-up'
              aria-label='LinkedIn'
            >
              <LinkedInIcon fontSize='medium' />
            </IconButton>
            <IconButton
              component='a'
              href='mailto:kityoubagares94@gmail.com'
              color='inherit'
              className='hover-lift animate-fade-up'
              aria-label='Email'
            >
              <EmailIcon fontSize='medium' />
            </IconButton>
            <IconButton
              component='a'
              href='tel:+639454278134'
              color='inherit'
              className='hover-lift animate-fade-up'
              aria-label='Phone'
            >
              <PhoneIcon fontSize='medium' />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
