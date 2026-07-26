/** @type {import('next').NextConfig} */

const isGhPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGhPages ? '/portfolio-kit' : '';

const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGhPages
    ? {
        output: 'export', // Enables static export for GitHub Pages
        basePath, // Repository name
        assetPrefix: '/portfolio-kit/', // Serve assets from the base path
        images: {unoptimized: true}, // Disable image optimization for static export
        trailingSlash: true, // Add trailing slash to all routes
      }
    : {}),
};

export default nextConfig;
