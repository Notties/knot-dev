import PostsWithSearch from "@/components/PostsWithSearch";
import { getAllPosts } from "@/lib/posts";

export default async function page() {
  const posts = await getAllPosts();
  const publishedPosts = posts.filter((post) => post.metadata.published);

  return (
    <article className="flex flex-col items-center justify-center px-[1.5rem] ">
      <div className="max-w-custom flex flex-col gap-[1rem]  w-full">
        <h1 className="text-black text-xl font-extrabold">My blog</h1>
        <PostsWithSearch posts={publishedPosts} />
      </div>
    </article>
  );
}
