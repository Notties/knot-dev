import Experience from "@/components/pages/home/Experience.section";
import Posts from "@/components/pages/home/Post.section";
import Projects from "@/components/pages/home/Projects.section";
import Header from "@/components/pages/home/Hero.section";
import UserInterface from "@/components/pages/home/Ui.section";
import { Particle } from "@/components/pages/home/Particle";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center px-6 ">
        <div className="max-w-custom flex flex-col gap-16 z-30 ">
          <Header />
          <UserInterface />
          <Experience />
          <Projects />
          <Posts />
          <Particle />
        </div>
      </div>
    </main>
  );
}
