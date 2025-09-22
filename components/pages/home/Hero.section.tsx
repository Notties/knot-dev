"use client";

import { useState, useEffect } from "react";
import MapComponent from "@/components/pages/home/MapComponent";
import Image from "next/image";
import Card from "@/components/Cards";
import { skills } from "@/data/skills";
import TextFlip from "@/components/motion/TextFlip";

export default function Hero() {
  const [time, setTime] = useState("");
  const [showClouds, setShowClouds] = useState(false);

  useEffect(() => {
    function getTimeInBangkok() {
      const date = new Date();
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Bangkok",
      });
    }

    // Update the time every second
    const interval = setInterval(() => {
      setTime(getTimeInBangkok());
    }, 1000);

    // Show clouds after 4 seconds
    const timeout = setTimeout(() => {
      setShowClouds(true);
    }, 4000);

    // Cleanup interval and timeout on component unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="w-full intersect-once">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-t-[0.7rem] group ">
        <div className="w-full  rounded-t-[0.7rem]"></div>

        <MapComponent mapKey="map" />

        {/* Time zone */}
        <div
          className="absolute top-[0.7rem] right-[0.7rem] py-1 px-3 rounded-sm
        bg-slate-100/30 backdrop-blur-md shadow-xs flex justify-center items-center
        pointer-events-none "
        >
          <p className="text-xs text-gray dark:text-black-full">{time} GMT+7</p>
        </div>

        {/* Clouds */}
        <Image
          width={390}
          height={347}
          alt="cloud"
          draggable="false"
          className={`absolute top-0 right-0 size-80 animate-cloud group-hover:opacity-0 transition-all
          blur-xs z-20 pointer-events-none ${
            showClouds ? "opacity-75" : "opacity-0"
          } 
          dark:opacity-20`}
          src="/cloud.png"
        />
        {/* Plane */}
        <Image
          width={24}
          height={24}
          alt="plane"
          draggable="false"
          className={`-right-0 -bottom-0 absolute pointer-events-none group-hover:opacity-0 transition-all
          animate-plane ${showClouds ? "opacity-100" : "opacity-0"}`}
          src="/plane.png"
        />
        {/* Plane shadow */}
        <Image
          width={24}
          height={24}
          alt="plane-shadow"
          draggable="false"
          className={`-right-0 -bottom-0 absolute pointer-events-none group-hover:opacity-0 transition-all
          animate-plane-shadow ${showClouds ? "opacity-100" : "opacity-0"}`}
          src="/plane-shadow.png"
        />

        {/* Divider */}
        <div
          className="absolute bottom-0 h-16 w-full 
        bg-linear-to-t from-white dark:from-black-full pointer-events-none z-30"
        ></div>
      </div>

      {/* My profile */}
      <div
        className="w-full flex justify-start gap-5 
      intersect:motion-preset-slide-up
      motion-duration-[1s] motion-opacity-in-0 "
      >
        <div className="flex w-full gap-5">
          {/* My picture */}
          <Image
            className="border w-20 h-20 rounded-full "
            src={"/icons/me.png"}
            width={100}
            height={100}
            alt="Knot"
          />

          <div className="flex flex-col justify-center items-start">
            {/* My name */}
            <div className="flex h-full justify-center items-end">
              <span className="font-semibold text-inherit text-xl flex gap-1">
                Hi, I&apos;m Knot{" "}
                <p className=" hover:scale-125 hover:rotate-12 transition-all duration-300">
                  👋
                </p>
              </span>
            </div>
            {/* My status */}
            <div className="h-full">
              <TextFlip
                defaultText="Available for work"
                hoverText="Reach out"
              />
            </div>
          </div>
        </div>
      </div>

      {/* My introduction */}
      <div
        className="mt-6 w-full
      intersect:motion-preset-slide-up
      motion-duration-[1s] motion-opacity-in-0 "
      >
        <p className="text-inherit text-[0.9rem]">
          Full Stack Developer with 2 years of experience in Web and Mobile
          application development. with a focus on building scalable and
          user-friendly solutions.
        </p>
      </div>

      {/* My skills */}
      <div
        className="mt-6 grid grid-cols-4 justify-center items-center w-full gap-2
        intersect:motion-preset-slide-up motion-opacity-in-0
      motion-duration-[1s]"
      >
        {skills.map((skill) => (
          <Card key={skill.name} title={skill.name} imgSrc={skill.icon} />
        ))}
      </div>
    </section>
  );
}
