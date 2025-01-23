"use client";

import { Delete } from "lucide-react";
import { useState } from "react";
import Posts from "./Post";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PostMetadata } from "@/lib/posts";

interface Props {
  posts: PostMetadata[];
}

export default function PostsWithSearch({ posts }: Props) {
  const [query, setQuery] = useState("");
  const filtered = posts.filter((post) =>
    post.metadata.title?.toLowerCase().includes(query.toLowerCase())
  );

  const resetFilter = () => setQuery("");

  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="flex items-center gap-[0.5rem] mb-[1rem]">
        <Input
          type="text"
          placeholder="Search something..."
          className="!text-xs xs:!text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          size="sm"
          variant="secondary"
          onClick={resetFilter}
          disabled={query.length === 0}
        >
          Clear
          <Delete className="ml-2 size-4" />
        </Button>
      </div>

      <Posts posts={filtered} />
    </div>
  );
}
