import { Separator } from "@/components/ui/separator";

import SubjectCard from "./subjectCard";
import { mfLessons, tytLessons } from "@/src/shared/domain/lesson/lesson.data";

interface SubjectGroupsProps {
  exam: "TYT" | "AYT";
}

export default function SubjectGroups({ exam }: SubjectGroupsProps) {
  const subjects = exam === "TYT" ? tytLessons : mfLessons;

  return (
    <div className="flex gap-6 justify-center">
      {subjects.map((s, i) => (
        <div key={s.name} className="flex flex-col  space-y-4 w-full">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">{s.name}</h3>
            <Separator className="bg-primary/20" />
          </div>

          {s.subFields.map((sf, i) => (
            <SubjectCard
              key={i}
              icon={sf.icon}
              exam={exam}
              label={sf.name}
              bgClass={sf.bgClass}
              iconColor={sf.iconColor}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
