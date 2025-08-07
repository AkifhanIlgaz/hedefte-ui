"use client";

import { use } from "react";
import { topics } from "../../../_schemas/topics";

export default function AddAnalysisPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: encodedSubject } = use(params);
  const subject = decodeURIComponent(encodedSubject);
  console.log(subject);

  const selectedTopics = topics.tyt[subject as keyof typeof topics.tyt];

  console.log(selectedTopics);

  return <span>{subject}</span>;
}
