import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
export default function MyImage() {
  return (
    <Avatar
      alt='Kit'
      src='/assets/images/me2.png'
      sx={{ width: 200, height: 200 }}
    />
  );
}
