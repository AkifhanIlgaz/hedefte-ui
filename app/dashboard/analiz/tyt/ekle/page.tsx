"use client";

import { Form } from "@/components/ui/form";
import {
  TYTFormRequest,
  tytFormSchema,
  tytSubjects,
} from "@/lib/validations/analysis.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FirstStep } from "./components/firstStep";
import { Header } from "./components/header";
import { ProgressIndicator } from "./components/progress";
import { SecondStep } from "./components/secondStep";

export default function AddTYTResultPage() {
  const form = useForm<TYTFormRequest>({
    resolver: zodResolver(tytFormSchema),
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

  const {
    formState: { errors },
  } = form;

  const [currentStep, setCurrentStep] = useState(1);
  const [topics, setTopics] = useState<string[]>([]);
  const [val, setVal] = useState(0);

  const onSubmit = async (req: TYTFormRequest) => {
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



  console.log(errors);
  console.log(form.getValues());
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
      <div className="container mx-auto p-6 max-w-full">
        <Header currentStep={currentStep} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8  flex flex-col items-center justify-center "
          >
            <ProgressIndicator currentStep={currentStep} />

            {currentStep === 1 ? (
              <FirstStep form={form} handleNextStep={handleNextStep} />
            ) : (
              <SecondStep form={form} handlePreviousStep={handlePreviousStep} />
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
