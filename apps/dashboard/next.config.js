/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@ttbs/lib", "@ttbs/ui", "@ttbs/i18n"],

  /* We already do type check on GH actions */
  typescript: {
    ignoreBuildErrors: !!process.env.CI,
  },
  /* We already do linting on GH actions */
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
};

module.exports = nextConfig;
