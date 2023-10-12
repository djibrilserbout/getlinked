/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'media.licdn.com', 'fastly.picsum.photos']
  }
}

module.exports = nextConfig
