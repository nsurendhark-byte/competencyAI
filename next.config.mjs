/** @type {import('next').NextConfig} */
const isExport = process.env.GITHUB_ACTIONS === 'true' || process.env.NEXT_PUBLIC_IS_EXPORT === 'true';

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