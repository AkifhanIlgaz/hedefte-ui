import { CircularProgress } from "@/components/app/CircularProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { text } from "@/lib/constants/text";
import { subjectTopics } from "@/lib/constants/topic";

import { ArrowLeft, Check, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AnalysisFormRequest, TopicMistake } from "../_schemas/schema";
import AddTopicMistakeModal from "./modals/addTopicMistakeModal";
import DetailsModal from "./modals/detailsModal";

interface SecondStepProps {
  form: UseFormReturn<AnalysisFormRequest>;
  handlePreviousStep: () => void;
}

export function SecondStep({ form, handlePreviousStep }: SecondStepProps) {
  const addTopicMistake = (
    subjectIndex: number,
    topic: string,
    val: number
  ) => {
    const currentSubjects = form.getValues("subjects");
    const updatedSubjects = [...currentSubjects];
    const topicMistakes = updatedSubjects[subjectIndex].topicMistakes || [];
    updatedSubjects[subjectIndex].topicMistakes = [
      ...topicMistakes,
      { topic, mistakes: val },
    ];
    form.setValue("subjects", updatedSubjects);
  };

  const updateTopicMistakes = (
    subjectIndex: number,
    topicMistakes: TopicMistake[]
  ) => {
    const currentSubjects = form.getValues("subjects");
    const updatedSubjects = [...currentSubjects];

    updatedSubjects[subjectIndex].topicMistakes = topicMistakes;
    form.setValue("subjects", updatedSubjects);
  };

  return (
    <>
      <Card>
        <CardContent className="p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {text.analysis.secondStep.title}
            </h2>
            <p className="text-muted-foreground">
              {text.analysis.common.messages.onlyMistakesShown}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 content-center">
            {form
              .watch("subjects")
              .filter((s) => s.empty + s.wrong > 0)
              .map((sub, index) => {
                const totalMistakes = sub.empty + sub.wrong;
                const completedMistakes =
                  sub.topicMistakes?.reduce(
                    (prev, curr) => prev + curr.mistakes,
                    0
                  ) || 0;

                return (
                  <Card
                    key={index}
                    className=" hover:shadow-lg transition-all duration-300 border-2  hover:border-primary/30"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="text-center">
                          <h3 className="font-semibold text-lg text-foreground mb-1">
                            {sub.name}
                          </h3>
                          <div className="w-12 h-0.5 bg-primary/60 mx-auto rounded-full"></div>
                        </div>

                        <div className="relative">
                          <CircularProgress
                            value={completedMistakes}
                            total={totalMistakes}
                          />
                        </div>

                        <div className="w-full space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              {text.analysis.common.stats.wrong}:
                            </span>
                            <span className="font-medium text-red-600">
                              {sub.wrong}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              {text.analysis.common.stats.empty}:
                            </span>
                            <span className="font-medium text-gray-600">
                              {sub.empty}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              {text.analysis.common.stats.total}:
                            </span>
                            <span className="font-medium text-foreground">
                              {totalMistakes}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col w-full gap-2">
                          <AddTopicMistakeModal
                            subjectIndex={sub.id}
                            addTopicMistake={addTopicMistake}
                            topics={
                              subjectTopics[
                                sub.name as keyof typeof subjectTopics
                              ]
                            }
                          />
                          <DetailsModal
                            topicMistakes={
                              form.watch().subjects[sub.id].topicMistakes || []
                            }
                            subjectIndex={sub.id}
                            updateTopicMistakes={updateTopicMistakes}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>

          {form.getValues().subjects.filter((s) => s.empty + s.wrong > 0)
            .length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {text.analysis.common.messages.noMistakes.title}
              </h3>
              <p className="text-muted-foreground">
                {text.analysis.common.messages.noMistakes.subtitle}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end items-center gap-4 w-full">
        <Button
          type="button"
          variant="outline"
          onClick={handlePreviousStep}
          className="gap-2 border-sidebar-border hover:bg-sidebar-accent dark:hover:bg-sidebar-accent bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          {text.analysis.common.buttons.back}
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={() => window.history.back()}
        >
          {text.analysis.common.buttons.cancel}
        </Button>
        <Button
          type="submit"
          className="gap-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-8"
        >
          <Plus className="w-4 h-4" />
          {text.analysis.common.buttons.save}
        </Button>
      </div>
    </>
  );
}
