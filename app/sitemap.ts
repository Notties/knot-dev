import { getAllPosts } from "@/lib/posts";
import type { MetadataRoute } from "next";

const routes = [
  { path: "", priority: 1 },
  { path: "blog", priority: 0.9 },
  { path: "projects", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

  const posts = await getAllPosts();
  const publishedPosts = posts.filter((post) => post.metadata.published);

  const pages = routes.map((route) => {
    const pathParts = [baseUrl, route.path].filter(Boolean);
    const url = pathParts.join("/");

    return {
      url,
      lastModified: new Date(),
      priority: route.priority,
    };
  });

  const postUrls = publishedPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    ...pages,
    ...postUrls,
  ];
}
