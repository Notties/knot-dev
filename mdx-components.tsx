import Counter from "@/components/mdx/Counter";
import { ExternalLink } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import FileName from "@/components/mdx/file-name";
import CustomCode from "@/components/mdx/custom-code";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Counter: Counter,
    FileName: FileName,
    code: ({ className, children, ...props }) => {
      const isCodeBlock = props.style;

      if (isCodeBlock) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      return (
        <span
          className="bg-muted rounded-sm px-[5px] font-mono text-inherit text-xs sm:text-sm"
          {...props}
        >
          {children}
        </span>
      );
    },
    pre: (props) => <CustomCode {...props} />,
    a: (props) => (
      <span className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors">
        <Link target="__blank" className="underline" {...props} />
        <ExternalLink size={12} />
      </span>
    ),
    table: (props) => (
      <div className="rounded-lg border border-border overflow-x-auto">
        <table className="w-full border-collapse !py-0 !my-0 min-w-[567px]" {...props} />
      </div>
    ),
    thead: (props) => (
      <thead
        className="bg-muted w-full text-start"
        {...props}
      />
    ),
    tbody: (props) => <tbody {...props} />,
    tr: (props) => (
      <tr
        className="border-b border-border hover:bg-accent/50 last:border-b-0"
        {...props}
      />
    ),
    th: (props) => (
      <th
        className="border-r border-border last:border-r-0 !px-4 py-2 text-left font-semibold bg-muted align-middle"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="border-r border-border last:border-r-0 !px-4 py-2 align-top"
        {...props}
      />
    ),
  };
}
