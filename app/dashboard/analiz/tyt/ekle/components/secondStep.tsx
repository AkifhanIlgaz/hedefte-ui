import { CircularProgress } from "@/components/app/CircularProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { subjectTopics } from "@/lib/constants/topic";
import {
  TopicMistake,
  TYTFormRequest,
} from "@/lib/validations/analysis.validation";
import { ArrowLeft, Check, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import AddTopicMistakeModal from "./addTopicMistakeModal";
import DetailsModal from "./detailsModal";

interface FirstStepProps {
  form: UseFormReturn<TYTFormRequest>;
  handlePreviousStep: () => void;
}

export function SecondStep({ form, handlePreviousStep }: FirstStepProps) {
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
      {/* Step 2 Content - Title kaldırıldı */}
      <Card className="w-full max-w-7xl shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Konu Bazında Yanlışlar
            </h2>
            <p className="text-muted-foreground">
              Sadece yanlış veya boş bıraktığınız dersler gösteriliyor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                const progressPercentage =
                  totalMistakes > 0
                    ? ((completedMistakes / totalMistakes) * 100) % 100.01
                    : 0;

                return (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center space-y-4">
                        {/* Subject Name */}
                        <div className="text-center">
                          <h3 className="font-semibold text-lg text-foreground mb-1">
                            {sub.name}
                          </h3>
                          <div className="w-12 h-0.5 bg-primary/60 mx-auto rounded-full"></div>
                        </div>

                        {/* Circular Progress */}
                        <div className="relative">
                          <CircularProgress
                            value={completedMistakes}
                            total={totalMistakes}
                          />
                        </div>

                        {/* Stats */}
                        <div className="w-full space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              Yanlış:
                            </span>
                            <span className="font-medium text-red-600">
                              {sub.wrong}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Boş:</span>
                            <span className="font-medium text-gray-600">
                              {sub.empty}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              Toplam:
                            </span>
                            <span className="font-medium text-foreground">
                              {totalMistakes}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>İlerleme</span>
                            <span>{Math.round(progressPercentage)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                progressPercentage === 100
                                  ? "bg-green-500"
                                  : progressPercentage > 50
                                  ? "bg-blue-500"
                                  : "bg-orange-500"
                              }`}
                              style={{
                                width: `${progressPercentage}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex flex-col w-full gap-2">
                          {/* Action Button */}
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

          {/* Empty State */}
          {form.getValues().subjects.filter((s) => s.empty + s.wrong > 0)
            .length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Hiç yanlış veya boş cevabınız yok!
              </h3>
              <p className="text-muted-foreground">
                Tüm soruları doğru cevapladınız. Tebrikler! 🎉
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-4 w-full max-w-7xl">
        <Button
          type="button"
          variant="outline"
          onClick={handlePreviousStep}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          İptal
        </Button>
        <Button type="submit" className="gap-2 bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4" />
          Kaydet
        </Button>
      </div>
    </>
  );
}
