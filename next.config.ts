import type { NextConfig } from "next";

// GITHUB_PAGES_REPO is set in the GitHub Actions workflow (repo name, e.g. "my-portfolio").
// When building for Vercel or Amplify, leave this env var unset — basePath will be empty.
const basePath = process.env.GITHUB_PAGES_REPO
  ? `/${process.env.GITHUB_PAGES_REPO}`
  : "";

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath && { basePath }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
