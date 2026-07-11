import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Inline the (small) Tailwind stylesheet into <head> so it arrives with the
    // HTML instead of as a render-blocking request. Eliminates the
    // HTML → CSS → font critical chain that gated mobile FCP/LCP. Prerendered
    // pages still use <link> on client navigation, so no per-nav re-download.
    inlineCss: true,
  },
};

export default withNextIntl(nextConfig);
