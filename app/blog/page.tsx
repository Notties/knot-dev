import PostsWithSearch from "@/components/pages/blog/PostsWithSearch";
import { getAllPosts } from "@/lib/posts";
import { Metadata } from "next/types";

export async function generateMetadata(): Promise<Metadata> {
  const description =
    "Blog posts about software development, web development, mobile development, and other related topics by a software developer in Thailand.";
  return {
    title: "Blog",
    description: description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    },
    openGraph: {
      type: "article",
      locale: "th_TH",
      siteName: "Knot",
      title: "Blog",
      description: description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
          alt: description,
          secureUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function page() {
  const posts = await getAllPosts();
  const publishedPosts = posts.filter((post) => post.metadata.published);

  return (
    <article className="flex flex-col items-center justify-start px-6 min-h-[75dvh]">
      <div className="max-w-custom flex flex-col gap-4  w-full">
        <h1 className="text-inherit text-xl font-extrabold">Blog</h1>
        <PostsWithSearch posts={publishedPosts} />
      </div>
    </article>
  );
}
