import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: HTMLDivElement["className"];
}

export default function Badge({ text, className }: Props) {
  return (
    <div
      className={cn(
        `flex border rounded-md justify-center items-center px-[0.4rem] py-[0.3rem] bg-gray-50 
        dark:bg-gray-dark`, 
        className
      )}
    >
      <p className="text-xs text-gray dark:text-white/60">{text}</p>
    </div>
  );
}
