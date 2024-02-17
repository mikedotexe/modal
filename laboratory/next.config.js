const withTM = require('next-transpile-modules')([
  '@walletconnect/modal-ui',
  '@walletconnect/modal-core',
  '@walletconnect/universal-provider',
  '@walletconnect/sign-client'
]);

const nextConfig = withTM({
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
  // output: 'standalone',
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
});

module.exports = nextConfig;
