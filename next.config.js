const dotenv = require('dotenv')
dotenv.config()

console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['despnsa247-public-files.s3.amazonaws.com']
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
}
module.exports = nextConfig
