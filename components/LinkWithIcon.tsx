import Link from "next/link";
import React from "react";

type LinkWithIconProps = {
  href: string;
  icon?: React.ReactNode;
  position: "left" | "right";
  text?: string;
};

export default function LinkWithIcon({
  href,
  icon,
  position,
  text,
}: LinkWithIconProps) {
  return (
    <Link
      href={href}
      className="link flex items-center gap-2 text-gray hover:text-black transition-all duration-300"
    >
      {position === "left" && icon}
      <span className="text-sm">{text}</span>
      {position === "right" && icon}
    </Link>
  );
}
