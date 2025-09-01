"use client";

import { SubjectGroups } from "@/src/features/study/components";
import { studyText } from "@/src/features/study/study.text";
import { DashboardHeader } from "@/src/shared/components/dashboardHeader";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ exam: string }>;
}) {
  const { exam } = use(params);
  const text = exam.toUpperCase() === "TYT" ? studyText.tyt : studyText.ayt;

  return (
    <div className="space-y-8">
      <DashboardHeader title={text.title} subtitle={text.subtitle} />
      <SubjectGroups exam={exam.toUpperCase() as "TYT" | "AYT"} />
    </div>
  );
}
