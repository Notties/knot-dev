"use client";

import { motion } from "motion/react";
import { useState, useCallback } from "react";
import type { MouseEvent } from "react";

// Types
type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export default function Compare() {
  const [mouseY, setMouseY] = useState(70);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const y: number = event.clientY - rect.top;
    setMouseY(y);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseY(70);
  }, []);

  const animationProps: {
    animate: { clipPath: string };
    transition: { duration: number };
  } = {
    animate: { clipPath: `inset(${mouseY}px 0 0)` },
    transition: { duration: 0.3 },
  };

  return (
    <div className="w-full h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="overflow-hidden group relative flex h-full items-center justify-center border-[1.5px] p-12"
      >
        {/* Corner borders */}
        <CornerBorder position="top-left" />
        <CornerBorder position="top-right" />
        <CornerBorder position="bottom-left" />
        <CornerBorder position="bottom-right" />

        {/* Main text */}
        <span className="m-0 flex flex-col font-mono text-foreground leading-relaxed">
          <TextContent />
        </span>

        {/* Animated line */}
        <motion.div
          className="
            after:-top-0.5 absolute top-0 left-0 h-0.5 w-full bg-muted
            after:absolute after:h-0.5 after:w-full after:bg-background 
            group-hover:bg-indigo-400
          "
          animate={{ y: mouseY }}
          transition={{ duration: 0.3 }}
        />

        {/* Gradient overlay */}
        <motion.div
          className="absolute h-full w-full bg-gradient-to-b from-indigo-400/40 to-transparent"
          {...animationProps}
        />

        {/* Text shadow effect */}
        <motion.div
          className="
            pointer-events-none absolute flex h-full w-full select-none 
            items-center justify-center p-12
          "
          {...animationProps}
        >
          <div
            className="
            flex flex-col m-0 font-mono text-background leading-relaxed
            [text-shadow:-1px_-1px_0_var(--color-indigo-400),1px_-1px_0_var(--color-indigo-400),-1px_1px_0_var(--color-indigo-400),1px_1px_0_var(--color-indigo-400)]
          "
          >
            <TextContent />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function TextContent() {
  return (
    <span>
      <p>I like to make things</p>
      <p>interactive. :)</p>
    </span>
  );
}

interface CornerBorderProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
function CornerBorder({ position }: Readonly<CornerBorderProps>) {
  const positionClasses: Record<CornerPosition, string> = {
    "top-left":
      "top-0 left-0 after:top-0 after:left-0 before:top-0 before:left-0",
    "top-right":
      "top-0 right-0 after:top-0 after:right-0 before:top-0 before:right-0",
    "bottom-left":
      "bottom-0 left-0 after:bottom-0 after:left-0 before:bottom-0 before:left-0",
    "bottom-right":
      "right-0 bottom-0 after:bottom-0 after:right-0 before:bottom-0 before:right-0",
  };

  return (
    <div
      className={`
        opacity-0 transition-opacity duration-100 ease-in group-hover:opacity-100 
        absolute w-3 h-3 after:absolute before:absolute 
        after:w-0.5 after:h-3 before:w-3 before:h-0.5 
        after:bg-indigo-400 before:bg-indigo-400 
        ${positionClasses[position]}
      `}
    />
  );
}
