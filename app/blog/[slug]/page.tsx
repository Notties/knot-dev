import LinkWithIcon from "@/components/LinkWithIcon";
import { formatDate } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next/types";
import fs from "node:fs";
import path from "node:path";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(await params);
  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

async function getPost({ slug }: { slug: string }) {
  try {
    const mdxPath = path.join("content", "blogs", `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      throw new Error(`MDX file for slug ${slug} does not exist`);
    }

    const { metadata } = await import(`@/content/blogs/${slug}.mdx`);

    return {
      slug,
      metadata,
    };
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
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = await getPost(await params);
  const { default: MDXContent } = await import(`@/content/blogs/${slug}.mdx`);

  return (
    <article className="flex flex-col items-center justify-center px-[1.5rem] ">
      <div className="max-w-custom flex flex-col gap-[1rem] w-full">
        <LinkWithIcon
          href="/blog"
          position="left"
          icon={<ArrowLeftIcon className="size-4" />}
          text="back to blog"
        />

        {post.metadata.image && (
          <div className="relative mb-6 h-[15rem] w-full overflow-hidden rounded-lg border flex justify-center items-center">
            <Image
              src={post.metadata.image}
              alt={post.metadata.title || ""}
              className="object-cover"
              fill
            />
          </div>
        )}

        <header className="w-full">
          <h1 className="text-black text-xl font-extrabold">
            {post.metadata.title}
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">
            {formatDate(post.metadata.publishDate ?? "")}
          </p>
        </header>

        <main className="prose prose-sm xs:prose-base">
          <MDXContent />
        </main>
      </div>
    </article>
  );
}
