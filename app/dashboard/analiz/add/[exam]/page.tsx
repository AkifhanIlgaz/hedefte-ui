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
import {
  AnalysisFormRequest,
  analysisFormSchema,
} from "@/src/features/analysis/validations/analysis.validation";
import { DashboardHeader } from "@/src/shared/components/dashboardHeader";
import {
  eaLessons,
  mfLessons,
  tytLessons,
} from "@/src/shared/domain/subject/subject.data";
import { useAuth } from "@/src/shared/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AddAnalysisPage({
  params,
}: {
  params: Promise<{ exam: string }>;
}) {
  const { exam } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const examType = exam.toUpperCase() as "TYT" | "AYT";

  const lessons =
    examType === "TYT"
      ? tytLessons
      : user?.user_metadata?.field === `Eşit Ağırlık`
        ? eaLessons
        : mfLessons;

  const form = useForm<AnalysisFormRequest>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: {
      date: new Date(),
      totalNet: 0,
      name: "",
      lessonAnalysis: lessons
        .map((s) =>
          s.subFields.map((sf) => ({
            lessonId: sf.lessonId,
            index: sf.index,
            name: sf.name,
            correct: 0,
            wrong: 0,
            empty: 0,
            totalNet: sf.totalQuestions,
            time: 0,
            topicAnalysis: [],
          })),
        )
        .flat(),
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = async (req: AnalysisFormRequest) => {
    console.log("Submitting form with data:", req);

    try {
      // Access token'ı al
      const {
        data: { session },
      } = await createClient().auth.getSession();

      // API'ye POST isteği gönder
      const response = await fetch(
        `http://localhost:8080/api/${exam.toLowerCase()}/analysis`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            ...req,
            examType: examType,
          }),
        },
      );
      console.log(response);

      const result = await response.json();

      console.log("Analysis saved:", result);

      router.push(`/dashboard/analiz/${examType.toLowerCase()}`);
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
        title={
          examType === "TYT" ? analysisText.tyt.title : analysisText.ayt.title
        }
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
              examType={examType}
              form={form}
              handleNextStep={handleNextStep}
            />
          ) : (
            <SecondStep
              form={form}
              handlePreviousStep={handlePreviousStep}
              examType={examType}
            />
          )}
        </form>
      </Form>
    </div>
  );
}
