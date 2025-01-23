import Counter from "@/components/mdx/Counter";
import { ExternalLink } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import FileName from "@/components/mdx/file-name";
import CustomCode from "@/components/mdx/custom-code";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Counter: Counter,
    FileName: FileName,
    pre: (props) => <CustomCode {...props} />,
    a: (props) => (
      <span className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-colors">
        <a target="__blank" className="underline" {...props} />
        <ExternalLink size={12} />
      </span>
    ),
  };
}
