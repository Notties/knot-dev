import BongoCatTyping from "@/components/pages/home/BongoCatTyping";
import Compare from "@/components/pages/home/Compare";
import Badge from "@/components/Badge";

export default function UserInterface() {
  return (
    <section>
      <div
        className="relative flex flex-col justify-start items-start gap-3 w-full 
      intersect:motion-preset-slide-up 
      motion-duration-[1s] motion-opacity-in-0"
      >
        <Badge text="UI" />

        <div className="h-48 border rounded-md w-full col-span-5 sm:col-span-3 p-6">
          <Compare />
        </div>

        {/* Typing test */}
        <BongoCatTyping />
      </div>
    </section>
  );
}
