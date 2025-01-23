"use client";

import { Check, Clipboard } from "lucide-react";
import React, { useRef, useState } from "react";

const CustomCode = (props: any) => {
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
    <div >
      <div className="relative rounded-md border h-fit text-white">
        <div className="flex absolute right-2 top-[5px] justify-between items-center">
          <button
            type="button"
            className="text-gray-300 bg-transparent border rounded-md backdrop-blur-md p-2 hover:text-input"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="text-green-500 w-5 h-5" />
            ) : (
              <Clipboard className="w-5 h-5" />
            )}
          </button>
        </div>
        {/* Styled pre block for code snippets */}
        <pre
          ref={codeRef}
          className={`${
            props.className || ""
          } border-none h-full p-4  overflow-auto
          m-0 bg-slate-50/50 not-prose text-sm`}
        >
          {/* Render the code without applying inline code styles */}
          <code className="whitespace-pre text-black">{props.children}</code>
        </pre>
      </div>
    </div>
  );
};

export default CustomCode;
