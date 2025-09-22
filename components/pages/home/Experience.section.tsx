import Badge from "@/components/Badge";
import Timeline from "@/components/pages/home/Timeline";
import { careers } from "@/data/career";


export default function Experience() {
  return (
    <section>
      <div className="flex flex-col justify-start items-start gap-3">
        <Badge text="Experience" />
        <div
          className="border rounded-md w-full
        flex justify-center"
        >
          <Timeline experience={careers}/>
        </div>
      </div>
    </section>
  );
}
