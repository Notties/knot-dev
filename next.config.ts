import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import mdxConfig from "./mdx.config";

const withMDX = createMDX(mdxConfig);

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withMDX(nextConfig);
