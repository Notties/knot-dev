import Experience from "@/components/sections/Experience.section";
import Posts from "@/components/sections/Post.section";
import Projects from "@/components/sections/Projects.section";
import Header from "@/components/sections/Hero.section";
import UI from "@/components/sections/Ui.section";
import { Particle } from "@/components/layout/Particle";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-[1.5rem] ">
        <div className="max-w-custom flex flex-col gap-[4rem] z-30 ">
          <Header />
          <UI />
          <Experience />
          <Projects />
          <Posts />
          <Particle />
        </div>
      </div>
    </>
  );
}
