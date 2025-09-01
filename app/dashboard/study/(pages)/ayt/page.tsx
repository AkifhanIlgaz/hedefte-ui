"use client";

import { MfSubjects } from "@/lib/constants/subjects";
import { text } from "@/lib/constants/text";
import { Header } from "@/src/shared/components/dashboardHeader";
import { Globe } from "lucide-react";
import SubjectCard from "../../_components/subjectCard";

export default function Page() {
  return (
    <div className="space-y-8">
      <Header title={text.study.tyt.title} subtitle={text.study.tyt.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MfSubjects.map((s, i) => (
          <SubjectCard key={i} icon={Globe} label={s.name} />
        ))}
      </div>
    </div>
  );
}
