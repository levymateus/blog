const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')

const isBundleAnalyzeEnabled = process.env.ANALYZE == 'true'

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ["cdn.sanity.io"]
  },
  reactStrictMode: true,
}

module.exports = withBundleAnalyzer({
  enabled: isBundleAnalyzeEnabled,
})(nextConfig)
