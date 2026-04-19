import fs from "fs";
import path from "path";
import { slugify } from "./utils";

export type PostMetadata = {
  slug: string;
  metadata: {
    title: string;
    publishDate: string;
    category: string;
    published: boolean;
    description: string;
    image: string;
    tags: string[];
  };
};

export type Heading = {
  text: string;
  level: number;
  id: string;
};

// Helper function to get all posts
export async function getAllPosts(limit?: number): Promise<PostMetadata[]> {
  const dir = path.join(process.cwd(), "content", "blogs");
  const files = fs.readdirSync(dir);

  const posts = files
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      // Import the metadata from the MDX files
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { metadata } = require(`@/content/blogs/${filename}`);
      return {
        slug: filename.replace(".mdx", ""),
        metadata: metadata || { title: "Untitled", publishDate: "1970-01-01" },
      };
    });

  const sortPosts = posts.sort(
    (a, b) =>
      new Date(b.metadata.publishDate).getTime() -
      new Date(a.metadata.publishDate).getTime()
  );

  if (limit) {
    return sortPosts.slice(0, limit);
  }

  // Sort posts by publish date in descending order
  return sortPosts;
}

export async function getHeadings(slug: string): Promise<Heading[]> {
  const mdxPath = path.join(process.cwd(), "content", "blogs", `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    return [];
  }

  const content = fs.readFileSync(mdxPath, "utf8");
  const headingLines = content.split("\n").filter((line) => line.startsWith("##"));

  return headingLines.map((line) => {
    const match = line.match(/^(#{2,3})\s+(.*)$/);
    if (!match) return { text: "", level: 0, id: "" };

    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);

    return { text, level, id };
  }).filter(h => h.text !== "");
}
