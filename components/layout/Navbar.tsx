"use client";

import { Link } from "next-view-transitions";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Navbar() {
  return (
    <section className="relative">
      <div className="px-6 w-full flex justify-center items-center h-24 mb-4">
        <nav className="flex h-full w-full items-center justify-between max-w-custom ">
          <div className="w-full h-full flex flex-row gap-3 justify-start items-center ">
            <Link href={"/"}>
              <p className="text-2xl text-inherit font-bold">Knot</p>
            </Link>
            <Link href="https://webring.wonderful.software#knot-dev.me" target="_blank">
              <WebringIcon className="size-6 text-black dark:text-white" />
            </Link>
          </div>
          <div
            className="text-gray text-base font-medium w-full h-full 
        items-center flex justify-end gap-3 sm:gap-5"
          >
            <Link href={"/blog"}>blog</Link>
            <Link href={"/projects"}>projects</Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </section>
  );
}

const WebringIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="416"
    height="416"
    viewBox="0 0 416 416"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M53 128.8l-16-8.2a192 192 0 1094.7-88.9l7.1 16.6A174 174 0 1153 128.8z"
    />
    <path d="M94.7 92.3L82 126.5 62.6 95.7l-36.4-1.4 23.3-28-9.9-35.1 33.9 13.5 30.3-20.3-2.4 36.4L130 83.3l-35.3 9z" />
  </svg>
);
