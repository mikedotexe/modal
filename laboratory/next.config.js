/** @type {import('next').NextConfig} */

// Only required within the scope of this monorepo
const nextConfig = {
  transpilePackages: ['@walletconnect/modal-ui', '@walletconnect/modal-core', '@walletconnect/universal-provider', '@walletconnect/sign-client'],
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
  output: 'standalone',
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // output: 'export'
}

module.exports = nextConfig
