"use client";

import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import ThemeToggle from "@/components/layout/ThemeToggle";
import TypingLogo from "@/components/motion/TypingLogo";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`container sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Seamless Fading Blur Effect */}
      <div
        className="absolute inset-0 pointer-events-none h-24"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 20%, rgba(0, 0, 0, 0.9) 40%, rgba(0, 0, 0, 0.5) 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 20%, rgba(0, 0, 0, 0.9) 40%, rgba(0, 0, 0, 0.5) 70%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-transparent" />
      </div>

      <div className="relative w-full flex justify-center items-center h-20">
        <nav className="flex h-full w-full items-center justify-between max-w-custom ">
          <div className="w-full h-full flex flex-row gap-3 justify-start items-center ">
            <Link href={"/"}>
              <TypingLogo />
            </Link>
            <Link
              href="https://webring.wonderful.software#knot-dev.me"
              target="_blank"
              className="hover:rotate-20 transition-transform duration-300 ease-in-out"
            >
              <WebringIcon className="size-6 text-black dark:text-foreground" />
            </Link>
          </div>
          <div
            className="text-gray text-base font-medium w-full h-full 
        items-center flex justify-end gap-3 sm:gap-5"
          >
            <Link href={"/blog"}>
              <p className="hover:underline">blog</p>
            </Link>
            <Link href={"/projects"}>
              <p className="hover:underline">projects</p>
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
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
