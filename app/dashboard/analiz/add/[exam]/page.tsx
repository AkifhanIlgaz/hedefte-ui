"use client";

import { Form } from "@/components/ui/form";

import { createClient } from "@/src/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { useForm } from "react-hook-form";

import { analysisText } from "@/src/features/analysis/analysis.text";
import {
  AddProgressIndicator,
  FirstStep,
  SecondStep,
} from "@/src/features/analysis/components";

import { DashboardHeader } from "@/src/shared/components/dashboardHeader";
import {
  eaLessons,
  getAllLessons,
  mfLessons,
  tytLessons,
} from "@/src/shared/domain/lesson/lesson.data";
import { useAuth } from "@/src/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  AddExamRequest,
  addExamSchema,
} from "@/src/features/analysis/validations/analysis.validation";
import { ExamType } from "@/src/shared/domain/types";

export default function AddAnalysisPage({
  params,
}: {
  params: Promise<{ exam: ExamType }>;
}) {
  const { exam } = use(params);
  const { user } = useAuth();
  const router = useRouter();

  const lessons = getAllLessons(exam, user?.user_metadata?.field);

  const form = useForm<AddExamRequest>({
    resolver: zodResolver(addExamSchema),
    defaultValues: {
      date: new Date(),
      totalNet: 0,
      name: "",
      lessonAnalysis: lessons.map((s) => ({
        lessonId: s.lessonId,
        index: s.index,
        lessonName: s.name,
        correct: 0,
        wrong: 0,
        empty: 0,
        totalNet: 0,
        time: 0,
        topicAnalysis: [],
      })),
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = async (req: AddExamRequest) => {
    console.log("Submitting form with data:", req);

    try {
      // Access token'ı al
      const {
        data: { session },
      } = await createClient().auth.getSession();

      // API'ye POST isteği gönder
      const response = await fetch(
        `http://localhost:8080/api/${exam}/analysis`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(req),
        },
      );
      console.log(response);

      const result = await response.json();

      console.log("Analysis saved:", result);

      router.push(`/dashboard/analiz/${exam}`);
    } finally {
    }
  };

  const handleNextStep = () => {
    form.trigger().then((isValid) => {
      if (isValid) setCurrentStep(2);
    });
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={exam === "tyt" ? analysisText.tyt.title : analysisText.ayt.title}
        subtitle={
          currentStep === 1
            ? analysisText.firstStep.subtitle
            : analysisText.secondStep.subtitle
        }
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col items-center justify-center "
        >
          <AddProgressIndicator currentStep={currentStep} />

          {currentStep === 1 ? (
            <FirstStep
              exam={exam}
              form={form}
              handleNextStep={handleNextStep}
            />
          ) : (
            <SecondStep
              form={form}
              handlePreviousStep={handlePreviousStep}
              exam={exam}
            />
          )}
        </form>
      </Form>
    </div>
  );
}
