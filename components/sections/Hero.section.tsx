"use client";
import { useState, useEffect } from "react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Card from "@/components/Cards";
import { skills } from "@/data/skills";

export default function Hero() {
  const [time, setTime] = useState("");

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

    setTime(getTimeInBangkok());

    // Update the time every second
    const interval = setInterval(() => {
      setTime(getTimeInBangkok());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-t-[0.7rem]">
        <div className="w-full h-[12rem] border-x border-t  rounded-t-[0.7rem]"></div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />

        {/* Time zone */}
        <div
          className="absolute top-[0.7rem] right-[0.7rem] py-1 px-3 rounded-sm
        bg-slate-100/30 backdrop-blur-md shadow-sm flex justify-center items-center"
        >
          <p className="text-xs text-gray">{time} GMT+7</p>
        </div>

        {/* Divider */}
        <div
          className="absolute bottom-0 h-[4rem] w-full 
        bg-gradient-to-t from-white "
        ></div>
      </div>

      <div className="w-full flex justify-start gap-5">
        <div className="flex w-full gap-5">
          {/* My picture */}
          <Image
            className="border w-[5rem] h-[5rem] rounded-full "
            src={"/icons/me.png"}
            width={100}
            height={100}
            alt="Knot"
          />

          <div className="flex flex-col justify-center items-start">
            {/* My name */}
            <div className="flex h-full justify-center items-end">
              <p className="font-semibold text-black text-xl">
                Hi, I&apos;m Knot 👋
              </p>
            </div>
            {/* My status */}
            <div className="flex flex-col gap-[0.1rem] justify-start items-start text-center h-full">
              <div className="flex gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full mt-[0.3rem]"></div>
                <p className="text-gray text-sm">Available for work</p>
              </div>
              <div className="flex w-full">
                <div className="w-[1.1rem]"></div>
                <div className="w-full border-t border-dashed"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My introduction */}
      <div className="mt-[1.5rem] w-full">
        <p className="text-black text-[0.9rem]">
          I&apos;m a software developer with 1 year of experience. I work across
          both front-end and back-end development, focusing on creating
          functional and user-friendly applications.
        </p>
      </div>

      {/* My skills */}
      <div className="mt-[1.5rem] grid grid-cols-4 justify-center items-center w-full 
      gap-2">
        {skills.map((skill) => (
          <Card key={skill.name} title={skill.name} imgSrc={skill.icon} />
        ))}
      </div>
    </section>
  );
}
