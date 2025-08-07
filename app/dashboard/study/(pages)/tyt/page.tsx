"use client";

import { Header } from "@/app/dashboard/analiz/_components/header";
import { text } from "@/lib/constants/text";
import { Globe } from "lucide-react";
import SubjectCard from "../../_components/subjectCard";
import { tytSubjects } from "../../_schemas/subjects";

export default function Page() {
  return (
    <div className="space-y-8">
      <Header title={text.study.tyt.title} subtitle={text.study.tyt.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tytSubjects.map((s, i) => (
          <SubjectCard key={i} icon={Globe} label={s} />
        ))}
      </div>
    </div>
  );
}
