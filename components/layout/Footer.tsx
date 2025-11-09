"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "next-view-transitions";

export default function Footer() {
  return (
    <div className="px-6 w-full flex justify-center items-start mt-12 mb-10">
      <div className="flex h-full w-full items-center justify-between max-w-custom ">
        <div className="w-full h-10 flex flex-col justify-start items-start ">
          <Link href={"/"}>
            <span className="text-xs flex gap-1 text-gray">
              <p className=" transition-all duration-300 hover:text-black">
                knot-dev.tech
              </p>
            </span>
          </Link>
          <span className="text-xs text-gray flex gap-2 justify-start items-center">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping duration-[2000ms] rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
            </span>
            <p>November 9, 2025</p>
          </span>
        </div>
        <div
          className="text-gray text-sm font-medium h-10 
        items-center flex justify-end gap-5"
        >
          <Link
            href={"https://github.com/notties"}
            target="_blank"
            className="hover:text-black transition-all duration-300"
          >
            <Github name="github" className="h-[17px] w-[17px]" />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/akthakorn/"}
            target="_blank"
            className="hover:text-black transition-all duration-300"
          >
            <Linkedin name="linkedin" className="h-[17px] w-[17px]" />
          </Link>
          <Link
            href={"mailto:akthakorn@gmail.com"}
            target="_blank"
            className="hover:text-black transition-all duration-300"
          >
            <Mail name="mail" className="h-[17px] w-[17px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
