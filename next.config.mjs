/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production' ? '/portfolio-kit' : '';
const isProdAsset =
  process.env.NODE_ENV === 'production' ? '/portfolio-kit/' : '';
const nextConfig = {
  output: 'export', // Enables static export
  basePath: isProd, // Your GitHub repository name
  assetPrefix: isProdAsset, // Ensures assets are served from the correct path
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  trailingSlash: true, // Adds a trailing slash to all routes
};

export default nextConfig;
