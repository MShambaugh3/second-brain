/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Fix images for deployment
  },
  trailingSlash: true, // Ensures correct routing on GitHub Pages
};

module.exports = nextConfig;
