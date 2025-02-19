"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from 'next-view-transitions'

export default function Footer() {
  return (
    <div className="px-[1.5rem] w-full flex justify-center items-start mt-[3rem] mb-[2.5rem]">
      <div className="flex h-full w-full items-center justify-between max-w-custom ">
        <div className="w-full h-[2.5rem] flex flex-col justify-start items-start ">
          <Link href={"/"}>
            <span className="text-xs flex gap-1 text-gray">
              <p className=" transition-all duration-300 hover:text-black">
                knot-dev.tech
              </p>
            </span>
          </Link>
          <p className="text-xs text-gray ">Last updated: January 25, 2025</p>
        </div>
        <div
          className="text-gray text-sm font-medium h-[2.5rem] 
        items-center flex justify-end gap-5"
        >
          <Link
            href={"/"}
            className="hover:text-black transition-all duration-300"
          >
            <Github name="github" className="h-[17px] w-[17px]"/>
          </Link>
          <Link
            href={"/"}
            className="hover:text-black transition-all duration-300"
          >
            <Linkedin name="linkedin" className="h-[17px] w-[17px]"/>
          </Link>
          <Link
            href={"/"}
            className="hover:text-black transition-all duration-300"
          >
            <Mail name="mail" className="h-[17px] w-[17px]"/>
          </Link>
        </div>
      </div>
    </div>
  );
}
