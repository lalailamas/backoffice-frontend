const dotenv = require('dotenv')
dotenv.config()

console.log('NODE_ENV:', process.env.NODE_ENV)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['despnsa247-public-files.s3.amazonaws.com']
  }
}

module.exports = nextConfig
