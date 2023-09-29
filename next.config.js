/** @type {import('next').NextConfig} */
require('dotenv').config({ path: `.env.dev` });

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
