import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const subjectConfig = {
  averageNet: {
    label: "Ortalama Net",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface SubjectChartProps {
  chartData: SubjectData[];
}

type SubjectData = {
  subject: string;
  averageNet: number;
};

export default function SubjectChart({ chartData }: SubjectChartProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200">
          Ders Bazinda Ortalama Net
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
              data={chartData}
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
  );
}
