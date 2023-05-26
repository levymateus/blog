const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
})

const imagesDomains = []

if (process.env.NEXT_PUBLIC_ENV === 'development') {
  imagesDomains.push('localhost')
}

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: { domains: ["cdn.sanity.io", ...imagesDomains ] },
  reactStrictMode: true,
}

module.exports = withBundleAnalyzer(nextConfig)
