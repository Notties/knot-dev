const mdxConfig = {
  options: {
    remarkPlugins: [require.resolve("remark-gfm")],
    rehypePlugins: [require.resolve("rehype-prism-plus")],
  },
};

export default mdxConfig;
