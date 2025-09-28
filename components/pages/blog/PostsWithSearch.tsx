"use client";

import { Delete, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { PostMetadata } from "@/lib/posts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Posts from "./Post";

interface Props {
  posts: PostMetadata[];
}

export default function PostsWithSearch({ posts }: Readonly<Props>) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);

  // Extract unique categories from posts, exclude empty
  const categories = Array.from(
    new Set(
      posts.map((post) => post.metadata.category).filter((cat) => cat !== "")
    )
  );

  const tags = Array.from(
    new Set(posts.flatMap((post) => post.metadata.tags || []))
  ).toSorted((a, b) => a.localeCompare(b));

  const resetFilter = () => {
    setQuery("");
    setSelectedCategory(null);
    setSelectedTag(null);
    setShowAllTags(false);
  };

  const toggleCategory = (cat: string | null) => {
    setSelectedCategory((prev) => (prev === cat ? null : cat));
  };

  const toggleTag = (tag: string | null) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  // Filter by search query, category, and tag
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

    const matchesTag = selectedTag
      ? post.metadata.tags.includes(selectedTag)
      : true;

    return matchesQuery && matchesCategory && matchesTag;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
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
          className="h-[2.6rem] cursor-pointer"
          onClick={resetFilter}
          disabled={query.length === 0 && !selectedCategory && !selectedTag}
        >
          Clear
          <Delete className="ml-2 size-4" />
        </Button>
      </div>

      {/* Category */}
      {/* <div className="flex flex-wrap gap-2 pb-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => toggleCategory(null)}
          className="text-sm px-3 py-1 rounded-full shadow-none cursor-pointer"
        >
          All Categories
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
      </div> */}

      {/* Tags */}
      <h2 className="text-sm font-bold">Tags</h2>
      <div className="flex flex-wrap gap-2 pb-2">
        {(showAllTags ? tags : tags.slice(0, 8)).map((tag) => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? "default" : "secondary"}
            onClick={() => toggleTag(tag)}
            className={`text-xs px-2 py-1 cursor-pointer transition-colors 
              hover:bg-foreground/10 ${
                selectedTag === tag ? "text-white hover:bg-foreground" : ""
              }`}
          >
            {tag}
          </Badge>
        ))}

        {tags.length > 8 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllTags(!showAllTags)}
            className="text-xs px-2 py-1 h-auto text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {showAllTags ? (
              <div className="flex items-center gap-1">
                <ChevronUp className="w-3 h-3 mr-1" />
                hide
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <ChevronDown className="w-3 h-3 mr-1" />
                more ({tags.length - 8})
              </div>
            )}
          </Button>
        )}
      </div>

      <Posts posts={filtered} />
    </div>
  );
}
