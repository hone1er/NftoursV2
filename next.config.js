/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    alchemyKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  },
};

module.exports = nextConfig;
