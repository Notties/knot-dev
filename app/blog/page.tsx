import PostsWithSearch from "@/components/PostsWithSearch";
import { getAllPosts } from "@/lib/posts";
import { Metadata } from "next/types";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
    description:
      "Software developer in Thailand specializing in creating web applications, mobile applications",
    alternates: {
      canonical: `https://knot-dev.tech/blog`,
    },
    openGraph: {
      type: "article",
      locale: "th_TH",
      siteName: "Knot",
      title: "Blog",
      description:
        "Software developer in Thailand specializing in creating web applications, mobile applications",
      images: [
        {
          url: "https://knot-dev.tech/og-image.png",
          alt: "Software developer in Thailand specializing in creating web applications, mobile applications",
          secureUrl: "https://knot-dev.tech/og-image.png",
          width: 800,
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
    <article className="flex flex-col items-center justify-center px-[1.5rem] ">
      <div className="max-w-custom flex flex-col gap-[1rem]  w-full">
        <h1 className="text-inherit text-xl font-extrabold">My blog</h1>
        <PostsWithSearch posts={publishedPosts} />
      </div>
    </article>
  );
}
