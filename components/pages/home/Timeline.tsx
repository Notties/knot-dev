import { Career } from "@/types/career.type";
import TimelineItem from "./TimelineItem";

export default function Timeline({
  experience,
}: Readonly<{ experience: Career[] }>) {
  return (
      <div className="p-0">
        <ul className="ml-8 sm:ml-10 border-l border-dashed py-3">
          {experience.map((exp, id) => (
            <TimelineItem key={id} experience={exp} />
          ))}
        </ul>
      </div>
  );
}
