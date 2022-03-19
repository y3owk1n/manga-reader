/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["oss.mkzcdn.com", "p3.byteimg.com"],
  },
};

module.exports = nextConfig;
