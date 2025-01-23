import Experience from "@/components/sections/Experience.section";
import Header from "@/components/sections/Hero.section";
import Posts from "@/components/sections/Post.section";
import Projects from "@/components/sections/Projects.section";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-[1.5rem] ">
      <div className="max-w-custom flex flex-col gap-[4rem]">
        <Header />
        <Experience />
        <Projects />
        <Posts />
      </div>
    </div>
  );
}
