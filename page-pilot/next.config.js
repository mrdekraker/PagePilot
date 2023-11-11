/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY,
  },
};

module.exports = nextConfig;
