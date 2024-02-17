/** @type {import('next').NextConfig} */

// Only required within the scope of this monorepo
const nextConfig = {
  transpilePackages: ['@walletconnect/modal-ui', '@walletconnect/modal-core'],
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    esmExternals: false,
    externalDir: true,
  },
  output: 'standalone'
  // output: 'export'
}

module.exports = nextConfig
