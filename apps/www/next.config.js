const { withHydrationOverlay } = require("@builder.io/react-hydration-overlay/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@ttbs/lib", "@ttbs/ui", "@ttbs/i18n"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.vietqr.io",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
};

// module.exports = nextConfig;
module.exports = withHydrationOverlay({
  /**
   * Optional: `appRootSelector` is the selector for the root element of your app. By default, it is `#__next` which works
   * for Next.js apps with pages directory. If you are using the app directory, you should change this to `main`.
   */
  appRootSelector: "main",
})(nextConfig);
