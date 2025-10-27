"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Globe,
  LucideIcon,
  Target,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import SubjectDetailModal from "../modals/subjectDetailModal";
import { AddExamRequest } from "../../validations/analysis.validation";
import { getAllLessons } from "@/src/shared/domain/lesson/lesson.data";
import { Field } from "@/src/features/profile/data";
import { ExamType } from "@/src/shared/domain/types";
import { useAnimate } from "framer-motion";
import { useAuth } from "@/src/shared/hooks/useAuth";

const chartConfig = {
  totalNet: {
    label: "Net",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface DetailedContentProps {
  allExams: AddExamRequest[];
  exam: ExamType;
}

export default function DetailedContent({
  allExams,
  exam,
}: DetailedContentProps) {
  const { user } = useAuth();

  // allExams verisini transform et
  const transformData = () => {
    if (!allExams || allExams.length === 0) return [];

    // Tüm benzersiz ders isimlerini al
    const lessons = getAllLessons(exam, user?.user_metadata?.field);
    console.log(lessons);
    return lessons
      .map((lesson) => {
        // Bu ders için tüm denemelerden verileri topla
        const subjectData = allExams
          .map((exam) => {
            const subject = exam.lessonAnalysis.find(
              (s) => s.lessonName === lesson.name,
            );
            if (!subject) return null;

            const net = subject.correct - subject.wrong * 0.25;
            return {
              net,
              correct: subject.correct,
              wrong: subject.wrong,
              empty: subject.empty,
              examDate: exam.date,
              examName: exam.name,
              topicAnalysis: subject.topicAnalysis || [],
            };
          })
          .filter((data) => data !== null)
          .sort(
            (a, b) =>
              new Date(a!.examDate).getTime() - new Date(b!.examDate).getTime(),
          );

        if (subjectData.length === 0) return null;

        // İstatistikleri hesapla
        const nets = subjectData.map((d) => d!.net);
        const averageNet =
          nets.reduce((sum, net) => sum + net, 0) / nets.length;

        // Tutarlılık skoru (standart sapma bazlı)
        const mean = averageNet;
        const variance =
          nets.reduce((sum, net) => sum + Math.pow(net - mean, 2), 0) /
          nets.length;
        const stdDev = Math.sqrt(variance);
        const consistencyScore = Math.max(0, 100 - stdDev * 10);

        // Net chart verisi
        const netChartData = subjectData.map((exam) => ({
          net: Math.round(exam!.net * 100) / 100,
          date: format(new Date(exam!.examDate), "dd MMM", { locale: tr }),
          name: exam!.examName,
        }));

        // Tüm konu hatalarını topla
        const allTopicMistakes = subjectData.flatMap(
          (exam) => exam!.topicAnalysis,
        );

        return {
          name: lesson.name,
          icon: lesson.icon,
          stats: {
            averageNet: Math.round(averageNet * 100) / 100,
            totalQuestions: lesson.totalQuestions,
            consistencyScore: Math.round(consistencyScore),
          },
          examCount: subjectData.length,
          netChartData,
          topicMistakes: allTopicMistakes,
        };
      })
      .filter((data) => data !== null);
  };

  const lessonPerformanceData = transformData();

  if (!allExams || allExams.length === 0) {
    return (
      <TabsContent value="detailed" className="space-y-6">
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Detaylı analiz için en az bir deneme sonucu eklemeniz gerekiyor.
          </p>
        </div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="detailed" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lessonPerformanceData.map((lesson, index) => {
          const IconComponent = lesson.icon;

          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                      <IconComponent className="w-6 h-6 text-amber-700 dark:text-amber-300" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{lesson.name}</CardTitle>
                      <p className="text-xl font-semibold text-amber-800 dark:text-amber-200">
                        {lesson.stats.averageNet}
                      </p>
                    </div>
                  </div>
                  <SubjectDetailModal
                    name={lesson.name}
                    topicMistakes={lesson.topicMistakes}
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-6 ">
                {/* Net Gelişim Grafiği */}
                {lesson.netChartData.length > 1 && (
                  <ResponsiveContainer width="100%" height={200}>
                    <ChartContainer
                      config={chartConfig}
                      className="h-full w-full"
                    >
                      <LineChart
                        data={lesson.netChartData}
                        accessibilityLayer
                        margin={{ top: 5, right: 30, left: 20, bottom: 0 }}
                      >
                        <CartesianGrid
                          vertical={false}
                          strokeDasharray="3 3"
                          stroke="#fcd34d"
                          opacity={0.4}
                        />
                        <XAxis
                          dataKey="date"
                          tickMargin={4}
                          tick={{ fontSize: 10, fill: "#b45309" }}
                          axisLine={{ stroke: "#d97706" }}
                          tickLine={{ stroke: "#d97706" }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                          label={{
                            value: "Net",
                            angle: -90,
                            position: "insideLeft",
                            style: {
                              textAnchor: "middle",
                              fill: "#b45309",
                            },
                          }}
                          domain={[0, lesson.stats.totalQuestions]}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                                  <p className="font-medium text-foreground">
                                    {data.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {data.date}
                                  </p>
                                  <p className="text-sm font-semibold text-amber-600">
                                    Net: {data.net}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line
                          dataKey="net"
                          stroke="#d97706"
                          strokeWidth={3}
                          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
                          activeDot={{
                            r: 8,
                            fill: "#92400e",
                            stroke: "#fff",
                            strokeWidth: 2,
                          }}
                          connectNulls={false}
                        />
                      </LineChart>
                    </ChartContainer>
                  </ResponsiveContainer>
                )}

                {/* Tutarlılık Skoru */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Tutarlılık
                    </span>
                    <span className="text-sm font-semibold">
                      {lesson.stats.consistencyScore}%
                    </span>
                  </div>
                  <Progress
                    value={lesson.stats.consistencyScore}
                    className="h-2"
                  />
                </div>

                {/* İstatistik Özeti */}
                <div className="text-xs text-muted-foreground text-center">
                  {lesson.examCount} denemeden hesaplandı
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </TabsContent>
  );
}
