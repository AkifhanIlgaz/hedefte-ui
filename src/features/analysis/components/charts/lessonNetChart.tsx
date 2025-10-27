import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ExamType } from "@/src/shared/domain/types";
import { lessons } from "@/src/shared/domain/lesson/lesson.data";
import { log } from "console";
import { AddExamRequest } from "../../validations/analysis.validation";

const lessonNetChartConfig = {
  successRate: {
    label: "Ortalama Net",
    color: "#d97706",
  },
} satisfies ChartConfig;

interface LessonNetChartProps {
  chartData: AddExamRequest[];
  exam: ExamType;
}

export default function LessonNetChart({
  chartData,
  exam,
}: LessonNetChartProps) {
  // Her ders için ortalama başarı yüzdesi hesapla
  const calculateLessonAverages = () => {
    if (!chartData || chartData.length === 0) return [];

    const lessonNames = Array.from(new Set(Object.keys(lessons[exam])));
    console.log(chartData);

    return lessonNames.map((name) => {
      const lessonScores = chartData
        .map((exam) => {
          const lesson = exam.lessonAnalysis.find((s) => s.lessonName === name);
          if (!lesson) return null;

          return {
            net: lesson.totalNet,
          };
        })
        .filter((score) => score !== null);

      const averageNet =
        lessonScores.length > 0
          ? lessonScores.reduce((sum, score) => sum + score!.net, 0) /
            lessonScores.length
          : 0;

      return {
        lessonName: name,
        averageNet: Math.round(averageNet * 100) / 100,
      };
    });
  };

  const lessonData = calculateLessonAverages();
  console.log(lessonData);
  return (
    <Card>
      <CardHeader className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200">
          Derslere Göre Ortalama Net
        </h3>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={lessonNetChartConfig}>
            <BarChart
              accessibilityLayer
              data={lessonData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#fcd34d"
                opacity={0.4}
              />
              <XAxis
                dataKey="lessonName"
                tickMargin={8}
                tick={{ fontSize: 12, fill: "#b45309" }}
                axisLine={{ stroke: "#d97706" }}
                tickLine={{ stroke: "#d97706" }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#b45309" }}
                axisLine={{ stroke: "#d97706" }}
                tickLine={{ stroke: "#d97706" }}
                domain={[0, 40]}
                label={{
                  value: "Net",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#b45309" },
                }}
              />
              <ChartTooltip
                cursor={false}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium text-foreground">{label}</p>
                        <p className="text-sm text-muted-foreground">
                          Ortalama Net: {data.averageNet}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="averageNet" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
