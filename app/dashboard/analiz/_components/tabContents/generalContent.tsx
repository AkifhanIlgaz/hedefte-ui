import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TabsContent } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  net: {
    label: "Net",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const subjectConfig = {
  averageNet: {
    label: "Ortalama Net",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", net: 60 },
  { month: "February", net: 65 },
  { month: "March", net: 62 },
  { month: "May", net: 70 },
  { month: "June", net: 68 },
  { month: "January", net: 60 },
  { month: "February", net: 65 },
  { month: "March", net: 62 },
  { month: "May", net: 70 },
  { month: "June", net: 68 },
];

const subjectAnalysis = [
  {
    subject: "Türkçe",
    averageNet: 35,
    totalQuestions: 40,
    percentage: (35 / 40) * 100,
  },
  {
    subject: "Matematik",
    averageNet: 25,
    totalQuestions: 40,
    percentage: (25 / 40) * 100,
  },
  {
    subject: "Sosyal Bilimler",
    averageNet: 15,
    totalQuestions: 20,
    percentage: (15 / 20) * 100,
  },
  {
    subject: "Fen Bilimleri",
    averageNet: 12,
    totalQuestions: 20,
    percentage: (12 / 20) * 100,
  },
];



export default function GeneralContent() {
  return (
    <TabsContent value="general" className="space-y-2 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200">
              Net İlerleme Grafiği
            </h3>
            <div className="text-sm text-amber-600 dark:text-amber-400">
              {chartData.length} deneme
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="#fcd34d"
                    opacity={0.4}
                  ></CartesianGrid>
                  <XAxis
                    dataKey="month"
                    tickMargin={8}
                    tick={{ fontSize: 12, fill: "#b45309" }}
                    axisLine={{ stroke: "#d97706" }}
                    tickLine={{ stroke: "#d97706" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#b45309" }}
                    axisLine={{ stroke: "#d97706" }}
                    tickLine={{ stroke: "#d97706" }}
                    domain={["dataMin - 2", "dataMax + 2"]}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
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
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200">
              Ders Bazinda Ortalama Net
            </h3>
            <div className="text-sm text-amber-600 dark:text-amber-400">
              {subjectAnalysis.length} deneme
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer config={subjectConfig}>
                <BarChart
                  accessibilityLayer
                  data={subjectAnalysis}
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
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="averageNet"
                    fill="var(--color-amber-500)"
                    radius={[4, 4, 0, 0]}
                    stroke="var(--color-amber-600)"
                    strokeWidth={1}
                  />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
