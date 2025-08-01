/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com' // Optional: since you're using this too
      }
    ]
  }
};

module.exports = nextConfig;
  