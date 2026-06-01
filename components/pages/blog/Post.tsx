import { PostMetadata } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Props {
  posts: PostMetadata[];
}

export default function Posts({ posts }: Props) {
  return (
    posts.length > 0 && (
      <ul className="flex flex-col gap-3 w-full">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block card-interactive cursor-pointer">
              <div className="relative flex flex-row justify-between p-4 xs:p-5 items-center gap-5">
                <div className="w-full min-w-0">
                  <span className="flex justify-start items-start flex-col gap-1.5">
                    {post.metadata.published && (
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {formatDate(post.metadata.publishDate)}
                      </p>
                    )}
                    <p className="text-md font-bold tracking-tight line-clamp-1 text-ellipsis pr-5">
                      {post.metadata.title}
                    </p>
                  </span>
                  <p className="mt-2 line-clamp-2 text-xs xs:text-sm text-muted-foreground leading-relaxed">
                    {post.metadata.description}
                  </p>
                </div>

                {post.metadata.image && (
                  <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden ring-1 ring-border flex justify-center items-center">
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      width={200}
                      height={200}
                      className="object-cover w-20 h-20"
                    />
                  </div>
                )}

                <ArrowUpRight className="absolute top-4 right-4 size-4 text-foreground opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-50 group-hover:translate-x-0" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  );
}
