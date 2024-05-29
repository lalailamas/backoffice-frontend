const dotenv = require('dotenv')
dotenv.config()

console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('NEXTAUTH_URL_DEV:', process.env.NEXTAUTH_URL_DEV)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['despnsa247-public-files.s3.amazonaws.com']
  },
  env: {
    NEXTAUTH_URL: process.env.NODE_ENV === 'development' ? process.env.NEXTAUTH_URL_DEV : process.env.NEXTAUTH_URL_PROD
  }
}
console.log('NEXTAUTH_URL:', nextConfig.env.NEXTAUTH_URL)
module.exports = nextConfig
