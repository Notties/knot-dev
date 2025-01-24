"use client";

import { Link } from 'next-view-transitions'

export default function Navbar() {
  return (
    <nav className="px-[1.5rem] w-full flex justify-center items-center h-[6rem] mb-[1rem]">
      <div className="flex h-full w-full items-center justify-between max-w-custom ">
        <div className="w-full h-full flex justify-start items-center ">
          <Link href={"/"}>
            <p className="text-2xl text-black font-bold">Knot</p>
          </Link>
        </div>
        <div
          className="text-gray text-base font-medium w-full h-full 
        items-center flex justify-end gap-5"
        >
          <Link href={"/blog"}>blog</Link>
          <Link href={"/"}>projects</Link>
          <Link href={"/"}>contact</Link>
        </div>
      </div>
    </nav>
  );
}
