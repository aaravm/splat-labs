import type { NextConfig } from "next";

// GitHub Pages serves project sites from a subpath like "/<repo-name>".
// Set the BASE_PATH env var during the GitHub Pages build to prefix
// all asset URLs. Netlify (and custom domains) leave it unset.
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;