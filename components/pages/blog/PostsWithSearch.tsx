"use client";

import { Delete } from "lucide-react";
import { useState } from "react";
import { PostMetadata } from "@/lib/posts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Posts from "./Post";

interface Props {
  posts: PostMetadata[];
}

export default function PostsWithSearch({ posts }: Readonly<Props>) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories from posts, exclude empty
  const categories = Array.from(
    new Set(
      posts.map((post) => post.metadata.category).filter((cat) => cat !== "")
    )
  );

  const resetFilter = () => {
    setQuery("");
    setSelectedCategory(null);
  };

  const toggleCategory = (cat: string | null) => {
    setSelectedCategory((prev) => (prev === cat ? null : cat));
  };

  // Filter by search query and category
  const filtered = posts.filter((post) => {
    const matchesQuery =
      post.metadata.title.toLowerCase().includes(query.toLowerCase()) ||
      post.metadata.description.toLowerCase().includes(query.toLowerCase()) ||
      post.metadata.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      );

    const matchesCategory = selectedCategory
      ? post.metadata.category === selectedCategory
      : true;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search something..."
          className="text-xs! xs:text-sm! h-[2.6rem] rounded-lg shadow-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          size="sm"
          variant="secondary"
          className="h-[2.6rem]"
          onClick={resetFilter}
          disabled={query.length === 0 && !selectedCategory}
        >
          Clear
          <Delete className="ml-2 size-4" />
        </Button>
      </div>

      {/* Category */}
      <div className="flex flex-wrap gap-2 pb-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => toggleCategory(null)}
          className="text-sm px-3 py-1 rounded-full shadow-none cursor-pointer"
        >
          All
        </Button>

        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => toggleCategory(cat)}
            className="text-sm px-3 py-1 rounded-full shadow-none cursor-pointer"
          >
            {cat}
          </Button>
        ))}
      </div>

      <Posts posts={filtered} />
    </div>
  );
}
