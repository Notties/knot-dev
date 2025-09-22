"use client";

import { Link } from "next-view-transitions";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Navbar() {
  return (
      <section className="relative">
        <div className="px-6 w-full flex justify-center items-center h-24 mb-4">
          <nav className="flex h-full w-full items-center justify-between max-w-custom ">
            <div className="w-full h-full flex justify-start items-center ">
              <Link href={"/"}>
                <p className="text-2xl text-inherit font-bold">Knot</p>
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
