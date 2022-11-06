/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => [
    {
      source: "/assets/:username/:uuid*",
      destination: "/api/assets/:username/:uuid*",
    },
  ],
};

module.exports = nextConfig;
