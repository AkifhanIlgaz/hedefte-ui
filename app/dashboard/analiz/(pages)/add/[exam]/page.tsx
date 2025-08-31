"use client";

import { FirstStep } from "@/app/dashboard/analiz/_components/firstStep";
import { Header } from "@/app/dashboard/analiz/_components/header";
import { ProgressIndicator } from "@/app/dashboard/analiz/_components/progress";
import { Form } from "@/components/ui/form";
import { text } from "@/lib/constants/text";

import { createClient } from "@/src/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import {
  EaSubjects,
  MfSubjects,
  tytSubjects,
} from "../../../../../../lib/constants/subjects";
import { SecondStep } from "../../../_components/secondStep";
import {
  AnalysisFormRequest,
  analysisFormSchema,
} from "../../../_schemas/schema";

export default function AddAnalysisPage({
  params,
}: {
  params: Promise<{ exam: string }>;
}) {
  const { exam } = use(params);
  const examType = exam.toUpperCase() as "TYT" | "AYT";
  const division = localStorage.getItem(`bolum`);
  const subjects =
    examType === "TYT"
      ? tytSubjects
      : division === `EA`
      ? EaSubjects
      : MfSubjects;

  const form = useForm<AnalysisFormRequest>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: {
      date: new Date(),
      totalNet: 0,
      name: "",
      subjects: subjects
        .map((s) =>
          s.subFields.map((sf) => ({
            name: sf.name,
            index: sf.index,
            id: sf.id,
            correct: 0,
            wrong: 0,
            empty: 0,
            total: sf.total,
            topicMistakes: [],
          }))
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
      const response = await fetch("http://localhost:8080/api/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          ...req,
          examType: examType,
        }),
      });
      console.log(response);

      const result = await response.json();

      console.log("Analysis saved:", result);

      // Form'u sıfırla veya yönlendirme yap
      // router.push(`/dashboard/analiz/${examType.toLowerCase()}`);
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
      <Header
        title={
          examType === "TYT" ? text.analysis.tyt.title : text.analysis.ayt.title
        }
        subtitle={
          currentStep === 1
            ? text.analysis.firstStep.subtitle
            : text.analysis.secondStep.subtitle
        }
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col items-center justify-center "
        >
          <ProgressIndicator currentStep={currentStep} />

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
