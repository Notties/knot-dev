import { PostMetadata } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { Card } from "./ui/card";
import Image from "next/image";

interface Props {
  posts: PostMetadata[];
}

export default function Posts({ posts }: Props) {
  return (
    posts.length > 0 && (
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="rounded-lg shadow-none">
              <div className="flex flex-row justify-between p-4 xs:p-[1.2rem] items-center gap-5">
                <div className="w-full">
                  <span
                    className="flex justify-start items-start flex-col 
                   gap-1 "
                  >
                    {post.metadata.published && (
                      <p className="flex w-auto justify-end text-xs font-normal text-gray">
                        {formatDate(post.metadata.publishDate)}
                      </p>
                    )}
                    <p className="text-md font-semibold line-clamp-1 text-ellipsis">
                      {post.metadata.title}
                    </p>
                  </span>
                  <p className="mt-3 xs:mt-1 line-clamp-2 text-xs xs:text-sm text-gray font-normal">
                    {post.metadata.description}
                  </p>
                </div>

                <div
                  className="w-24  border rounded-md 
                  flex justify-center items-center"
                >
                  {post.metadata.image && (
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      width={200}
                      height={200}
                      className="rounded-md object-cover min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px]"
                    />
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </ul>
    )
  );
}
