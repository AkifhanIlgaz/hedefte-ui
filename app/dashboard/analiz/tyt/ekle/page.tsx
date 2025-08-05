"use client";

import { FirstStep } from "@/app/dashboard/analiz/_components/firstStep";
import { Header } from "@/app/dashboard/analiz/_components/header";
import { ProgressIndicator } from "@/app/dashboard/analiz/_components/progress";
import { Form } from "@/components/ui/form";
import { text } from "@/lib/constants/text";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SecondStep } from "../../_components/secondStep";
import { AnalysisFormRequest, analysisFormSchema, tytSubjects } from "../../_schemas/schema";

export default function AddTYTResultPage() {
  const form = useForm<AnalysisFormRequest>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: {
      date: new Date(),
      name: "",
      notes: "",
      subjects: tytSubjects
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
    <>
      <Header
        title={text.analysis.tyt.title}
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
              examType="TYT"
              form={form}
              handleNextStep={handleNextStep}
            />
          ) : (
            <SecondStep
              examType="TYT"
              form={form}
              handlePreviousStep={handlePreviousStep}
            />
          )}
        </form>
      </Form>
    </>
  );
}
