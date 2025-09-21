"use client";

import { useState } from "react";
import { projects } from "@/data/project";
import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/Badge";
import { Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next/types";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects",
    description:
      "Software developer in Thailand specializing in creating web applications, mobile applications",
    alternates: {
      canonical: `https://knot-dev.tech/projects`,
    },
    openGraph: {
      type: "website",
      locale: "th_TH",
      siteName: "Knot",
      title: "Projects",
      description:
        "Software developer in Thailand specializing in creating web applications, mobile applications",
      images: [
        {
          url: "https://knot-dev.tech/og-image.png",
          alt: "Software developer in Thailand specializing in creating web applications, mobile applications",
          secureUrl: "https://knot-dev.tech/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function Page() {
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category || "Others"))),
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <article className="flex flex-col items-center justify-start px-6 min-h-[75dvh]">
      <div className="max-w-custom flex flex-col gap-6 w-full">
        <h1 className="text-inherit text-xl font-extrabold">My projects</h1>

        {/* Tag Toggle Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="text-sm px-3 py-1 rounded-full shadow-none cursor-pointer"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-3">
          {filteredProjects.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-2 w-full border p-4 rounded-xl  
              bg-white dark:bg-gray-dark/30
              transition-all duration-300 shadow-sm"
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

              <div className="flex flex-col sm:flex-row justify-start items-center sm:gap-2 w-full">
                {/* Source code Button */}
                <Link
                  href={item.linkGithub}
                  target="_blank"
                  className="flex flex-row flex-wrap justify-start items-center gap-1 pt-3 w-full cursor-pointer"
                >
                  <Button
                    variant={"outline"}
                    className="shadow-none w-full cursor-pointer"
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <Github className="h-[17px] w-[17px]" />
                      <p className="text-sm font-semibold text-center">
                        Source
                      </p>
                    </div>
                  </Button>
                </Link>
                {/* Website Button */}
                {item.linkWebsite && (
                  <Link
                    href={item.linkWebsite}
                    target="_blank"
                    className="flex flex-row flex-wrap justify-start items-center gap-1 pt-3 w-full cursor-pointer"
                  >
                    <Button className="shadow-none w-full cursor-pointer">
                      <div className="flex gap-2 justify-center items-center">
                        <Globe className="h-[17px] w-[17px]" />
                        <p className="text-sm font-semibold text-center">
                          Visit
                        </p>
                      </div>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
