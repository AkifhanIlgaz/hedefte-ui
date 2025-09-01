"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import { TopicTable } from "@/src/features/study/components";
import { Resource } from "@/src/features/study/validations/resource.validation";
import { createClient } from "@/src/lib/supabase/client";
import { DashboardHeader } from "@/src/shared/components/dashboardHeader";
import {
  aytSubjectTopics,
  tytSubjectTopics,
} from "@/src/shared/domain/topic/topic.data";
import { FlaskConical } from "lucide-react";
import { use, useEffect, useMemo, useState } from "react";
import AddResourceModal from "../../../../../src/features/study/components/addResourceModal";

export default function AddAnalysisPage({
  params,
}: {
  params: Promise<{ exam: string; subject: string }>;
}) {
  const [resources, setResources] = useState<Resource[]>([]);
  const { exam: encodedExam, subject: encodedSubject } = use(params);
  const exam = encodedExam.toUpperCase() as "TYT" | "AYT";
  const subject = decodeURIComponent(encodedSubject);

  const selectedTopics =
    exam === "TYT"
      ? tytSubjectTopics[subject as keyof typeof tytSubjectTopics] ?? []
      : aytSubjectTopics[subject as keyof typeof aytSubjectTopics] ?? [];

  const getResources = useMemo(() => {
    return async () => {
      try {
        // Access token'ı al
        const {
          data: { session },
        } = await createClient().auth.getSession();

        // API'ye POST isteği gönder
        const response = await fetch(
          "http://localhost:8080/api/resources?exam=TYT",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        console.log(response);

        const result = await response.json();

        setResources(result.payload);
      } finally {
      }
    };
  }, []);

  useEffect(() => {
    getResources();
  }, [getResources]);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={`${exam} ${subject}`}
        subtitle={"Konuları ve kaynakları takip et"}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="text-md flex gap-2">
            <FlaskConical className={`w-6 h-6`} />
            Konular
          </CardHeader>
          <CardContent className="flex flex-col items-center h-full justify-end gap-4">
            <div className="grid w-full gap-1">
              <p className={`text-xl font-semibold `}>15 / 75</p>
              <p className={`text-sm `}>Tekrarlari biten konular </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-md flex gap-2">
            <FlaskConical className={`w-6 h-6 `} />
            İlerleme
          </CardHeader>
          <CardContent className="flex items-center h-full   justify-end gap-4">
            <div className="grid w-full gap-1">
              <p className={`text-xl font-semibold`}>%15</p>
              <Progress value={15} max={100} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="  flex items-center justify-between text-md  gap-2">
            <div className="flex items-center justify-center gap-2">
              <FlaskConical className={`w-6 h-6 `} />
              <p className={`text-md `}>Kaynaklarım</p>
            </div>

            <AddResourceModal
              subject={subject}
              addResource={(resource) =>
                setResources((prev) => [...prev, resource])
              }
            />
          </CardHeader>
          <CardContent className="flex items-center max-h-lg justify-end ">
            {resources.length > 0 ? (
              <ul className="list-disc list-inside w-full grid grid-cols-2 gap-1">
                {resources.map((resource) => (
                  <li className="text-md font-semibold" key={resource.name}>
                    {resource.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm w-full  text-center">
                Henüz kaynak eklenmedi.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <TopicTable resources={resources} topics={selectedTopics} />
      <Toaster />
    </div>
  );
}
