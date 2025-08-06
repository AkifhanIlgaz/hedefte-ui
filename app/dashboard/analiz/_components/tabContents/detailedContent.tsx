"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
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
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AnalysisFormRequest } from "../../_schemas/schema";

const chartConfig = {
  totalNet: {
    label: "Net",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function DetailedContent({
  allExams,
}: {
  allExams: AnalysisFormRequest[];
}) {
  // Ders iconları mapping
  const subjectIcons: { [key: string]: LucideIcon } = {
    Türkçe: BookOpen,
    Matematik: Calculator,
    Tarih: Globe,
    Coğrafya: Globe,
    Felsefe: Globe,
    "Din Kültürü": Globe,
    Fizik: FlaskConical,
    Kimya: FlaskConical,
    Biyoloji: FlaskConical,
  };

  // Ders bazında soru sayıları
  const subjectQuestionCounts: { [key: string]: number } = {
    Türkçe: 40,
    Matematik: 40,
    Tarih: 5,
    Coğrafya: 5,
    Felsefe: 5,
    "Din Kültürü": 5,
    Fizik: 7,
    Kimya: 7,
    Biyoloji: 6,
  };

  // allExams verisini transform et
  const transformData = () => {
    if (!allExams || allExams.length === 0) return [];

    // Tüm benzersiz ders isimlerini al
    const uniqueSubjects = Array.from(
      new Set(
        allExams.flatMap((exam) => exam.subjects.map((subject) => subject.name))
      )
    );

    return uniqueSubjects
      .map((subjectName) => {
        // Bu ders için tüm denemelerden verileri topla
        const subjectData = allExams
          .map((exam) => {
            const subject = exam.subjects.find((s) => s.name === subjectName);
            if (!subject) return null;

            const net = subject.correct - subject.wrong * 0.25;
            return {
              net,
              correct: subject.correct,
              wrong: subject.wrong,
              empty: subject.empty,
              examDate: exam.date,
              examName: exam.name,
            };
          })
          .filter((data) => data !== null)
          .sort(
            (a, b) =>
              new Date(a!.examDate).getTime() - new Date(b!.examDate).getTime()
          );

        if (subjectData.length === 0) return null;

        // İstatistikleri hesapla
        const nets = subjectData.map((d) => d!.net);
        const averageNet =
          nets.reduce((sum, net) => sum + net, 0) / nets.length;

        const totalQuestions = subjectQuestionCounts[subjectName] || 40;


        // Tutarlılık skoru (standart sapma bazlı)
        const mean = averageNet;
        const variance =
          nets.reduce((sum, net) => sum + Math.pow(net - mean, 2), 0) /
          nets.length;
        const stdDev = Math.sqrt(variance);
        const consistencyScore = Math.max(0, 100 - stdDev * 10);

        // Net chart verisi
        const netChartData = subjectData.map((exam, index) => ({
          exam: `D${index + 1}`,
          net: Math.round(exam!.net * 100) / 100,
          date: exam!.examDate,
          name: exam!.examName,
        }));

        return {
          subject: subjectName,
          icon: subjectIcons[subjectName] || BookOpen,
          stats: {
            averageNet: Math.round(averageNet * 100) / 100,
            totalQuestions,

            consistencyScore: Math.round(consistencyScore),
          },

          examCount: subjectData.length,
          netChartData,
        };
      })
      .filter((data) => data !== null);
  };

  const subjectPerformanceData = transformData();

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
        {subjectPerformanceData.map((subject, index) => {
          const IconComponent = subject.icon;

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
                      <CardTitle className="text-lg">
                        {subject.subject}
                      </CardTitle>
                      {subject.stats.averageNet}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ayrıntılar
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 ">
                {/* Net Gelişim Grafiği */}
                {subject.netChartData.length > 1 && (
                  <ResponsiveContainer width="100%" height={200}>
                    <ChartContainer
                      config={chartConfig}
                      className="h-full w-full"
                    >
                      <LineChart
                        data={subject.netChartData}
                        accessibilityLayer
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid
                          vertical={false}
                          strokeDasharray="3 3"
                          stroke="#fcd34d"
                          opacity={0.4}
                        />
                        <XAxis
                          dataKey="exam"
                          tickMargin={8}
                          tick={{ fontSize: 12, fill: "#b45309" }}
                          axisLine={{ stroke: "#d97706" }}
                          tickLine={{ stroke: "#d97706" }}
                          angle={-45}
                          textAnchor="end"
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
                          domain={[0, subject.stats.totalQuestions]}
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
                      {subject.stats.consistencyScore}%
                    </span>
                  </div>
                  <Progress
                    value={subject.stats.consistencyScore}
                    className="h-2"
                  />
                </div>

                {/* İstatistik Özeti */}
                <div className="text-xs text-muted-foreground text-center">
                  {subject.examCount} denemeden hesaplandı
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </TabsContent>
  );
}
