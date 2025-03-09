/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true, // Fix images for GitHub Pages
  },
  assetPrefix: "./", // Ensures correct asset loading for GitHub Pages
  trailingSlash: true, // Ensures correct routing on GitHub Pages
};

module.exports = nextConfig;
