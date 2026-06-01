import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: HTMLDivElement["className"];
}

export default function Badge({ text, className }: Props) {
  return (
    <div
      className={cn(
        `flex border border-border rounded-lg justify-center items-center px-2 py-1 bg-muted/60 text-xs`,
        className
      )}
    >
      <p className="font-medium uppercase tracking-wide text-muted-foreground">
        {text}
      </p>
    </div>
  );
}
