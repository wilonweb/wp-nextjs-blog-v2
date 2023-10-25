/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "nextjstest1.local/",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
