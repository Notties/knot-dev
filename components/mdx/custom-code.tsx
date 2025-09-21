"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { Check, Clipboard } from "lucide-react";

export default function CustomCode({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  const language = className?.replace("language-", "") || "text";
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  return (
    <div className="relative group custom-code">
      <div className="flex absolute right-2 top-[-1.6rem] justify-between items-center cursor-pointer">
        <button
          type="button"
          className="text-gray-300 bg-transparent border border-gray-600 rounded-md backdrop-blur-md p-1 
            cursor-pointer
            hover:text-input dark:hover:text-inherit"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="text-green-500 size-4" />
          ) : (
            <Clipboard className="size-4 text-gray-300" />
          )}
        </button>
      </div>

      <pre
        ref={codeRef}
        className={clsx(
          "rounded-lg p-4 !m-0 !text-base sm:!text-lg  leading-relaxed",
          "!bg-gray-dark text-gray-100 ",
          `language-${language}`
        )}
      >
        <code className="">{children}</code>
      </pre>
    </div>
  );
}
