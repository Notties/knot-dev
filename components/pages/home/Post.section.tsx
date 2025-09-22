import LinkWithIcon from "@/components/LinkWithIcon";
import { getAllPosts } from "@/lib/posts";
import { ArrowRightIcon } from "lucide-react";
import Posts from "@/components/pages/blog/Post";
import Badge from "@/components/Badge";

export default async function Post() {
  const posts = await getAllPosts(2);

  return (
    <section>
      <div className="flex flex-col justify-start items-start gap-3">
        <div className="w-full flex justify-between items-center">
          <Badge text="Blogs" />

          <LinkWithIcon
            href="/blog"
            position="right"
            icon={<ArrowRightIcon className="size-4" />}
            text="view more"
          />
        </div>

        <div
          className="h-auto rounded-md w-full 
        flex justify-center items-start gap-5"
        >
          <Posts posts={posts} />
        </div>
      </div>
    </section>
  );
}
