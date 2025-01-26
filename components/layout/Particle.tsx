"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Particles } from "@/components/ui/particles";

export function Particle() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <Particles
      className="absolute inset-0 z-[-999]"
      quantity={15}
      ease={80}
      color={color}
      refresh
    />
  );
}
