/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  poweredByHeader: false, // disable x-powered-by
  // distDir: 'build', // custom build directory
  trailingSlash: true, // enable Trailing Slash  for example: For example /about/ will redirect to /about.
};

module.exports = nextConfig;
