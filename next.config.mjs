/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export', // Enables static export
  basePath: '', // Your GitHub repository name
  assetPrefix: '', // Ensures assets are served from the correct path
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  trailingSlash: true, // Adds a trailing slash to all routes
};

export default nextConfig;
