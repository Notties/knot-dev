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
    justify-center items-center rounded-lg hover:shadow-md transition-all duration-300
    gap-2 grayscale hover:grayscale-0
    h-[4rem] xs:h-[5rem] 
    "
    >
      <Image
        src={imgSrc}
        alt={title}
        width={24}
        height={24}
        className="w-[1.5rem] h-[1.5rem]  object-cover"
      />
      <p className="text-black text-xs hidden xs:flex">{title}</p>
    </div>
  );
};

export default Card;
