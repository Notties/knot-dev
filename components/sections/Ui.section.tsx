import BongoCatTyping from "@/components/BongoCatTyping";

export default function UI() {
  return (
    <>
      <div className="relative flex flex-col justify-start items-start gap-3 w-full">
        <div
          className="flex border rounded-md justify-center items-center 
        px-[0.5rem] py-[0.3rem] bg-gray-50"
        >
          <p className="text-xs text-gray">UI</p>
        </div>

        {/* Typing test */}
        <BongoCatTyping />
      </div>
    </>
  );
}
