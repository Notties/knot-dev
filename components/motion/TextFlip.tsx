import { Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  defaultText: string;
  hoverText: string;
}

export default function TextFlip({ defaultText, hoverText }: Props) {
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  return (
    <div
      className="flex flex-col gap-[0.1rem] justify-start items-start 
      text-center"
    >
      {/* First Row */}
      <div
        className="flex gap-2 items-center justify-start cursor-pointer"
        onMouseEnter={() => setIsMouseEntered(true)}
        onMouseLeave={() => setIsMouseEntered(false)}
      >
        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
        <Link
          href={"/"}
          className="relative h-5 overflow-hidden text-sm text-gray w-[7.7rem]
          flex justify-start"
        >
          <span
            className={`absolute transition-transform duration-700 ${
              isMouseEntered ? "-translate-y-full" : "translate-y-0"
            }`}
          >
            {defaultText}

            {/* Dashed Line */}
            <div
              className={`flex w-full absolute bottom-0 left-0  
                transition-all duration-700
                `}
            >
              <div
                className="w-[7.4rem] border-t border-dashed border-gray-300
                dark:border-gray/40"
              ></div>
            </div>
          </span>

          <span
            className={`absolute transition-transform duration-700 ${
              isMouseEntered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {hoverText}
            <div className="flex w-full absolute bottom-[2.6px] right-[-4.4rem] ">
              <Mail className="text-gray size-4" />
            </div>
          </span>
        </Link>
      </div>
    </div>
  );
}
