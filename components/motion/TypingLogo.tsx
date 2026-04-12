"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function TypingLogo() {
  const [key, setKey] = useState(0);
  const text = "Knot";

  return (
    <div
      onMouseEnter={() => setKey((prev) => prev + 1)}
      className="flex items-center"
    >
      <p className="text-2xl text-inherit font-bold flex items-center">
        {text.split("").map((char, index) => (
          <motion.span
            key={`${key}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.01,
              delay: index * 0.1,
            }}
          >
            {char}
          </motion.span>
        ))}
      </p>
    </div>
  );
}
