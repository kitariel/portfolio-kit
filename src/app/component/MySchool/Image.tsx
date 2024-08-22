import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
export default function MyImage() {
  return (
    <div>
      <Avatar
        alt='USC'
        src='static/images/usclogo.png'
        sx={{ width: 120, height: 120 }}
      />
    </div>
  );
}
