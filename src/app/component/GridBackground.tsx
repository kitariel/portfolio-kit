'use client';

import * as React from 'react';

export default function GridBackground() {
  return (
    <div
      className='bg-grid'
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.25 }}
    />
  );
}