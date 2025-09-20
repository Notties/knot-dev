"use client";

import Image, { StaticImageData } from "next/image";

type CardProps = {
  title: string;
  imgSrc: StaticImageData;
};

const Card: React.FC<CardProps> = ({ title, imgSrc }) => {
  return (
    <div
      className="border w-full flex flex-col cursor-pointer
    justify-center items-center rounded-lg hover:shadow-xs transition-all duration-300
    gap-2 grayscale hover:grayscale-0
    h-16 xs:h-18 group bg-white dark:bg-black-full
    "
    >
      <Image
        src={imgSrc}
        alt={title}
        width={24}
        height={24}
        className="w-6 h-6  object-cover 
        group-hover:translate-y-[-2px] transition-all duration-300
        "
      />
      <p className="text-gray text-xs hidden xs:flex">{title}</p>
    </div>
  );
};

export default Card;
