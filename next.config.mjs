/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/project",
  assetPrefix: "/project",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
