import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { AnalysisFormRequest } from "../../_schemas/schema";

interface GeneralContentProps {
  chartData: AnalysisFormRequest[];
}

const chartConfig = {
  totalNet: {
    label: "Net",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function NetChart({ chartData }: GeneralContentProps) {
  // Date'leri formatla
  const formattedData = chartData.map((item) => ({
    ...item,
    formattedDate: format(new Date(item.date), "dd MMM", { locale: tr }),
    fullDate: format(new Date(item.date), "dd MMMM yyyy", { locale: tr }),
  }));

  return (
    <Card>
      <CardHeader className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200">
          Net İlerleme Grafiği
        </h3>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={formattedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#fcd34d"
                opacity={0.4}
              />
              <XAxis
                dataKey="formattedDate"
                tickMargin={8}
                tick={{ fontSize: 12, fill: "#b45309" }}
                axisLine={{ stroke: "#d97706" }}
                tickLine={{ stroke: "#d97706" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#b45309" }}
                axisLine={{ stroke: "#d97706" }}
                tickLine={{ stroke: "#d97706" }}
                domain={["dataMin - 2", "dataMax + 2"]}
                label={{
                  value: "Net",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#b45309" },
                }}
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
                          {data.fullDate}
                        </p>
                        <p className="text-sm font-semibold text-amber-600">
                          Net: {data.totalNet}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                dataKey="totalNet"
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
  );
}
