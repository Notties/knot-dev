import { PostMetadata } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { Link } from 'next-view-transitions'
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
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
            <Card className="rounded-lg">
              <div className="flex flex-row justify-between p-[1rem] xs:p-[1.2rem] items-center gap-5">
                <div className="w-full ">
                  <span
                    className="flex justify-start items-start flex-col 
                  xs:flex-row xs:justify-start xs:items-center gap-0 xs:gap-2"
                  >
                    <p className="truncate text-md font-semibold w-auto">
                      {post.metadata.title}
                    </p>
                    <Separator
                      orientation="vertical"
                      className="py-[0.3rem] hidden xs:block"
                    />
                    {post.metadata.published && (
                      <p className="flex w-auto justify-end text-xs font-normal text-gray">
                        {formatDate(post.metadata.publishDate)}
                      </p>
                    )}
                  </span>
                  <p className="mt-3 xs:mt-1 line-clamp-2 text-xs xs:text-sm text-gray font-normal">
                    {post.metadata.description}
                  </p>
                </div>

                <div
                  className="w-[6rem]  border rounded-md 
                  flex justify-center items-center"
                >
                  <Image
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    width={200}
                    height={200}
                    className="rounded-md object-cover"
                  />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </ul>
    )
  );
}
