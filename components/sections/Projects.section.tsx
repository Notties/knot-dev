"use client";

import Badge from "@/components/Badge";
import LinkWithIcon from "../LinkWithIcon";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/project";
import Image from "next/image";

export default function Projects() {
  return (
    <section>
      <div className="flex flex-col justify-start items-start gap-3">
        <div className="w-full flex justify-between items-center">
          <Badge text="Projects" />

          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-4" />}
            text="view more"
          />
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects
            .map((item) => (
              <Link
                href={"/projects"}
                key={item.title}
                className="flex flex-col gap-2 w-full border p-4 rounded-xl  
                bg-white dark:bg-gray-dark/30
              hover:bg-gray-200/10 transition-all duration-300"
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="min-h-[7.5rem] border rounded-lg object-contain"
                />
                <span className="flex flex-col gap-2 pt-1">
                  {/* Title */}
                  <p className="text-base font-semibold">{item.title}</p>
                  {/* Description */}
                  <p className="text-xs sm:text-sm font-normal text-gray line-clamp-2">
                    {item.description}
                  </p>
                </span>

                <div className="flex flex-row flex-wrap justify-start items-center gap-1 pt-1">
                  {item.stacks.map((stack) => (
                    <Badge
                      key={stack}
                      text={stack}
                      className="text-[11px] text-center pb-[2.4px]"
                    />
                  ))}
                </div>
              </Link>
            ))
            .slice(0, 2)}
        </div>
      </div>
    </section>
  );
}
