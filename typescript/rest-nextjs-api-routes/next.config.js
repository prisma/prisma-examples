const { withSuperjson } = require('next-superjson')

/** @type {import('next').NextConfig} */
const nextConfig = withSuperjson()({
  reactStrictMode: true,
})

module.exports = nextConfig
