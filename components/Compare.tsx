"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Compare() {
  const [mouseY, setMouseY] = useState(70);

  return (
    <div className="w-full h-full">
      <motion.div
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const mouseY = event.clientY - rect.top;
          setMouseY(mouseY);
        }}
        onMouseLeave={() => {
          setMouseY(70);
        }}
        className="overflow-hidden group relative flex h-full items-center justify-center border-[1.5px] p-12"
      >
        {/* border top left */}
        <div
          className="opacity-0 transition-opacity duration-100 ease-in 
        group-hover:opacity-100 absolute w-3 h-3 
        after:absolute before:absolute after:w-[2px] 
        after:h-3 before:w-3 before:h-[2px] 
        after:bg-indigo-400 before:bg-indigo-400 
        after:-top-[0px] after:-left-[0px] 
        before:-top-[0px] before:-left-[0px] top-0 left-0"
        ></div>
        {/* border top right */}
        <div
          className="opacity-0 transition-opacity duration-100 ease-in 
        group-hover:opacity-100 absolute w-3 h-3 
        after:absolute before:absolute after:w-[2px] 
        after:h-3 before:w-3 before:h-[2px] 
        after:bg-indigo-400 before:bg-indigo-400 
        after:-top-[0px] after:-right-[0px] 
        before:-top-[0px] before:-right-[0px] top-0 right-0"
        ></div>
        {/* border bottom left */}
        <div
          className="opacity-0 transition-opacity duration-100 ease-in 
        group-hover:opacity-100 absolute w-3 h-3 
        after:absolute before:absolute after:w-[2px] 
        after:h-3 before:w-3 before:h-[2px] 
        after:bg-indigo-400 before:bg-indigo-400 
        after:-bottom-[0px] after:-left-[0px] 
        before:-bottom-[0px] before:-left-[0px] bottom-0 left-0"
        ></div>
        {/* border bottom right */}
        <div
          className="opacity-0 transition-opacity duration-100 ease-in 
        group-hover:opacity-100 absolute w-3 h-3 
        after:absolute before:absolute after:w-[2px] 
        after:h-3 before:w-3 before:h-[2px] 
        after:bg-indigo-400 before:bg-indigo-400 
        after:-bottom-[0px] after:-right-[0px] 
        before:-bottom-[0px] before:-right-[0px] right-0 bottom-0"
        ></div>

        <p className="m-0 font-mono text-foreground leading-relaxed">
          I like to make things interactive.
        </p>

        {/* Animated line */}
        <motion.div
          className="after:-top-[2px] absolute top-0 left-0 h-[2px] 
        w-full bg-muted
        after:absolute after:h-[2px] after:w-full 
        after:bg-background group-hover:bg-indigo-400"
          style={{ y: mouseY }}
          transition={{ duration: 0.5 }}
        ></motion.div>

        {/* Gradient overlay */}
        <motion.div
          className="absolute h-full w-full
        bg-gradient-to-b from-indigo-400/40 to-transparent
        "
        style={{
            clipPath: `inset(${mouseY}px 0 0  )`,
          }}
          transition={{ duration: 0.5 }}
        ></motion.div>

        {/* Text shadow effect */}
        <div
          className="pointer-events-none absolute 
        flex h-full w-full select-none items-center justify-center p-12
        "
          style={{
            clipPath: `inset(${mouseY}px 0 0  )`,
          }}
        >
          <p className="m-0 font-mono text-background leading-relaxed [text-shadow:_-1px_-1px_0_theme(colors.indigo.400),_1px_-1px_0_theme(colors.indigo.400),_-1px_1px_0_theme(colors.indigo.400),_1px_1px_0_theme(colors.indigo.400)]">
            I like to make things interactive.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
