"use client";

import { FirstStep } from "@/components/app/analiz/firstStep";
import { Header } from "@/components/app/analiz/header";
import { ProgressIndicator } from "@/components/app/analiz/progress";
import { SecondStep } from "@/components/app/analiz/secondStep";
import { Form } from "@/components/ui/form";
import { text } from "@/lib/constants/text";
import {
  AnalysisFormRequest,
  analysisFormSchema,
  aytSubjects,
  tytSubjects,
} from "@/lib/validations/analysis.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddTYTResultPage() {
  const form = useForm<AnalysisFormRequest>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: {
      date: new Date(),
      name: "",
      notes: "",
      subjects: aytSubjects
        .map((s) =>
          s.subFields.map((sf) => ({
            name: sf.name,
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
    console.log(req);
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
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
      <div className="container mx-auto p-6 max-w-full">
        <Header title={text.analysis.ayt.title} currentStep={currentStep} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col items-center justify-center "
          >
            <ProgressIndicator currentStep={currentStep} />

            {currentStep === 1 ? (
              <FirstStep
                examType="AYT"
                form={form}
                handleNextStep={handleNextStep}
              />
            ) : (
              <SecondStep
                examType="AYT"
                form={form}
                handlePreviousStep={handlePreviousStep}
              />
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
