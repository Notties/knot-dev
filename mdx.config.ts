const mdxConfig = {
  options: {
    remarkPlugins: [require.resolve("remark-gfm")],
    rehypePlugins: [[require.resolve("rehype-pretty-code")]],
  },
};

export default mdxConfig;
