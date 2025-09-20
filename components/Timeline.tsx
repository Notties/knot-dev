import { Career } from "@/types/career.type";
import TimelineItem from "./TimelineItem";

export default function Timeline({
  experience,
}: Readonly<{ experience: Career[] }>) {
  return (
    <div>
      <div className="p-0">
        <ul className="ml-10 border-l border-dashed">
          {experience.map((exp, id) => (
            <TimelineItem key={id} experience={exp} />
          ))}
        </ul>
      </div>
    </div>
  );
}
