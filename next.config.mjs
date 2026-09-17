/** @type {import('next').NextConfig} */
const isExport = process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  reactStrictMode: true,
  ...(isExport ? {
    output: 'export',
    basePath: '/competencyAI',
  } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;