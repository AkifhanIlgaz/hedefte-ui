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
import { AnalysisFormRequest } from "../../validations/analysis.validation";

const subjectConfig = {
  successRate: {
    label: "Başarı Oranı (%)",
    color: "#d97706",
  },
} satisfies ChartConfig;

interface SubjectChartProps {
  chartData: AnalysisFormRequest[];
}

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

export default function SubjectChart({ chartData }: SubjectChartProps) {
  // Her ders için ortalama başarı yüzdesi hesapla
  const calculateSubjectAverages = () => {
    if (!chartData || chartData.length === 0) return [];

    // Tüm derslerden benzersiz ders isimlerini al
    const subjectNames = Array.from(
      new Set(
        chartData.flatMap((exam) =>
          exam.subjects.map((subject) => subject.name)
        )
      )
    );

    // Her ders için ortalama hesapla
    return subjectNames.map((subjectName) => {
      const subjectScores = chartData
        .map((exam) => {
          const subject = exam.subjects.find((s) => s.name === subjectName);
          if (!subject) return null;

          // Net hesapla: doğru - (yanlış * 0.25)
          const net = subject.correct - subject.wrong * 0.25;
          const totalQuestions =
            subjectQuestionCounts[subjectName] || subject.total || 40;

          // Başarı yüzdesi hesapla
          const successRate = (net / totalQuestions) * 100;

          return {
            net,
            successRate: Math.max(0, successRate), // Negatif değerleri 0 yap
            totalQuestions,
          };
        })
        .filter((score) => score !== null);

      const averageSuccessRate =
        subjectScores.length > 0
          ? subjectScores.reduce((sum, score) => sum + score!.successRate, 0) /
            subjectScores.length
          : 0;

      const averageNet =
        subjectScores.length > 0
          ? subjectScores.reduce((sum, score) => sum + score!.net, 0) /
            subjectScores.length
          : 0;

      return {
        subject: subjectName,
        successRate: Math.round(averageSuccessRate * 100) / 100, // 2 ondalık
        averageNet: Math.round(averageNet * 100) / 100,
        totalQuestions: subjectQuestionCounts[subjectName] || 40,
        examCount: subjectScores.length,
      };
    });
  };

  const subjectData = calculateSubjectAverages();

  return (
    <Card>
      <CardHeader className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200">
          Ders Bazında Başarı Oranı
        </h3>
        <div className="text-sm text-amber-600 dark:text-amber-400">
          {chartData.length} deneme
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={subjectConfig}>
            <BarChart
              accessibilityLayer
              data={subjectData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#fcd34d"
                opacity={0.4}
              />
              <XAxis
                dataKey="subject"
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
                domain={[0, 100]}
                label={{
                  value: "Başarı Oranı (%)",
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
                        <p className="text-sm text-amber-600">
                          Başarı Oranı: %{data.successRate}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Ortalama Net: {data.averageNet}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Toplam Soru: {data.totalQuestions}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {data.examCount} denemeden
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="successRate"
                fill="#d97706"
                radius={[4, 4, 0, 0]}
                stroke="#b45309"
                strokeWidth={1}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
