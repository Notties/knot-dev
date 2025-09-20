"use client";

import Badge from "@/components/Badge";

export default function Experience() {
  return (
    <section>
      <div className="flex flex-col justify-start items-start gap-3">
        <Badge text="Experience" />
        <div className="border h-[20rem] rounded-md w-full 
        flex justify-center items-center text-center">
            <p className="text-sm text-gray">Coming soon..</p>
        </div>
      </div>
    </section>
  );
}
