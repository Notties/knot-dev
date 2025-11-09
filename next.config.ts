import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const options = {
  theme: "one-dark-pro",
};

const mdxConfig: any = {
  options: {
    remarkPlugins: [require.resolve("remark-gfm")],
    rehypePlugins: [[require.resolve("rehype-pretty-code"), options]],
  },
};

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
