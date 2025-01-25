import BongoCatTyping from "@/components/BongoCatTyping";
import Compare from "@/components/Compare";

export default function UI() {
  return (
    <>
      <div className="relative flex flex-col justify-start items-start gap-3 w-full 
      intersect:motion-preset-slide-up
      motion-duration-[1s] motion-opacity-in-0">
        <div
          className="flex border rounded-md justify-center items-center 
        px-[0.4rem] py-[0.3rem] bg-gray-50"
        >
          <p className="text-xs text-gray">UI</p>
        </div>

        <div className="w-full grid grid-cols-5 gap-3">
          <div className="h-[12rem] border rounded-md w-full col-span-5 sm:col-span-3 p-6">
            <Compare />
          </div>
          <div className="h-[12rem] border rounded-md w-full col-span-5 sm:col-span-2
          flex justify-center items-center">
            <p className="text-sm text-gray">Coming soon..</p>
          </div>
        </div>

        {/* Typing test */}
        <BongoCatTyping />
      </div>
    </>
  );
}
