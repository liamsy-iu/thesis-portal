/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' to enable middleware
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
