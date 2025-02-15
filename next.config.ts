import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: { mode: ["react-component"] },
    });
    return cfg;
  },
};

export default nextConfig;
