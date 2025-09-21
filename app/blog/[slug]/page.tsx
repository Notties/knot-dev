import LinkWithIcon from "@/components/LinkWithIcon";
import { Badge } from "@/components/ui/badge";
import { PostMetadata } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next/types";
import fs from "node:fs";
import path from "node:path";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(await params);
  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: {
      canonical: `https://knot-dev.tech/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "th_TH",
      siteName: "Knot",
      title: "Blog",
      description: post.metadata.description,
      images: [
        {
          url: `https://knot-dev.tech/${post.metadata.image}`,
          alt: post.metadata.title,
          secureUrl: `https://knot-dev.tech/${post.metadata.image}`,
          width: 800,
          height: 630,
        },
      ],
    },
  };
}

async function getPost({ slug }: { slug: string }) {
  try {
    const mdxPath = path.join("content", "blogs", `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      throw new Error(`MDX file for slug ${slug} does not exist`);
    }

    const { metadata } = await import(`@/content/blogs/${slug}.mdx`);

    const result: PostMetadata = {
      slug,
      metadata,
    };

    return result;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error(`Unable to fetch the post for slug: ${slug}`);
  }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("content", "blogs"));
  const params = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return params;
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const slug = (await params).slug;
  const post = await getPost(await params);
  const { default: MDXContent } = await import(`@/content/blogs/${slug}.mdx`);

  return (
    <article className="flex flex-col items-center justify-center px-6 ">
      <div className="max-w-custom flex flex-col gap-4 w-full">
        <div className="w-28">
          <LinkWithIcon
            href="/blog"
            position="left"
            icon={<ArrowLeftIcon className="size-4" />}
            text="back to blog"
          />
        </div>

        {post.metadata.image && (
          <div className="relative mb-6 h-60 w-full overflow-hidden rounded-lg border flex justify-center items-center">
            <Image
              src={post.metadata.image}
              alt={post.metadata.title || ""}
              className="object-cover"
              fill
            />
          </div>
        )}

        <header className="w-full">
          <h1 className="text-inherit text-xl font-extrabold">
            {post.metadata.title}
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">
            {formatDate(post.metadata.publishDate ?? "")}
          </p>
        </header>

        <main className="prose dark:prose-invert prose-sm xs:prose-base">
          <MDXContent />
        </main>

        {/* Tags */}
        {post.metadata.tags && (
          <div className="flex flex-wrap justify-start items-center gap-2 py-[2rem]">
            <span className="text-sm text-muted-foreground">Tags</span>
            {post.metadata.tags.map((tag) => (
              <Badge variant={"secondary"} key={tag} className="text-xs shadow-none cursor-pointer font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
