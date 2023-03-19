/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  // Minimize docker image
  swcMinify: true,
  output: "standalone",

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      // https://i.imgur.com/zldZhzF.png
      // IMGURU logo
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        // port: '',
        pathname: "/**",
      },
      {
        // https://api.dicebear.com/5.x/big-smile/svg?seed=Alcaen
        protocol: "https",
        hostname: "api.dicebear.com",
        // port: '',
        pathname: "/**",
      },
    ],
  },
};
export default config;
