"use client";

import { Delete, ChevronDown, ChevronUp, Tags } from "lucide-react";
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

  const tags = Array.from(
    new Set(posts.flatMap((post) => post.metadata.tags || []))
  ).toSorted((a, b) => a.localeCompare(b));

  const resetFilter = () => {
    setQuery("");
    setSelectedCategory(null);
    setSelectedTag(null);
    setShowAllTags(false);
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

      {/* Tags */}
      <div className="flex gap-2">
        <Tags className="size-5" />
        <h2 className="text-sm font-bold">Tags</h2>
      </div>
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
