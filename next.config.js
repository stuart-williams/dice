/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["dice-media.imgix.net"],
  },
  i18n: {
    locales: ["en-GB", "en-US"],
    defaultLocale: "en-GB",
  },
};

module.exports = nextConfig;
