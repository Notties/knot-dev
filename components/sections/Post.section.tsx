import LinkWithIcon from "@/components/LinkWithIcon";
import { getAllPosts } from "@/lib/posts";
import { ArrowRightIcon } from "lucide-react";
import Posts from "@/components/Post";

export default async function Post() {
  const posts = await getAllPosts(2);

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-3">
        <div className="w-full flex justify-between items-center">
          <div
            className="flex border rounded-md justify-center items-center 
        px-[0.5rem] py-[0.3rem] bg-gray-50"
          >
            <p className="text-xs text-gray">Recent Posts</p>
          </div>

          <LinkWithIcon
            href="/blog"
            position="right"
            icon={<ArrowRightIcon className="size-4" />}
            text="view more"
          />
        </div>

        <div
          className="h-auto rounded-xl w-full 
        flex justify-center items-start gap-5"
        >
          <Posts posts={posts} />
        </div>
      </div>
    </>
  );
}
