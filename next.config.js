/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    path: "",
    loader: "imgix",
    deviceSizes: [480, 768, 992, 1280, 1536],
  },
  i18n: {
    locales: ["en-GB", "en-US"],
    defaultLocale: "en-GB",
  },
};

module.exports = nextConfig;
