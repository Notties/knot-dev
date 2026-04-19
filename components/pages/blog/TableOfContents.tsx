"use client";

import { Heading } from "@/lib/posts";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ChevronDown, List } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="flex flex-col border rounded-lg bg-card overflow-hidden w-full mb-8">
      {/* Toggle Button - Always Visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <List className="size-4 text-primary" />
          <span className="font-bold text-sm uppercase tracking-wider">
            Table of Contents
          </span>
        </div>
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* List Content - Collapsible on all screen sizes */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ul className="flex flex-col gap-1 p-4 pt-0 max-h-[60vh] overflow-y-auto border-t">
              <div className="pt-4" />
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                >
                  <a
                    href={`#${heading.id}`}
                    className={cn(
                      "text-sm transition-all hover:text-primary block py-1.5 border-l-2 pl-3 -ml-px",
                      activeId === heading.id
                        ? "text-primary font-medium border-primary bg-primary/5"
                        : "text-muted-foreground border-transparent hover:border-muted"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: "smooth",
                      });
                      // Optional: close on mobile after selection if needed
                      // setIsOpen(false);
                      history.pushState(null, "", `#${heading.id}`);
                    }}
                  >
                    {heading.text.split(/(`[^`]+`)/).map((part, i) =>
                      part.startsWith("`") && part.endsWith("`") ? (
                        <code
                          key={i}
                          className="bg-muted px-1 py-0.5 rounded text-xs font-mono"
                        >
                          {part.slice(1, -1)}
                        </code>
                      ) : (
                        part
                      )
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
