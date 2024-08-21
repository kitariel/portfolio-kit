/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/portfolio-kit', // Set this to your repository name
  assetPrefix: '/portfolio-kit/', // Ensures assets are served from the correct path
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  trailingSlash: true, // Ensures trailing slashes in URLs, which can help with routing
};

export default nextConfig;
