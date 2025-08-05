"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BarChart3,
  Calendar,
  LucideIcon,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
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
    subject: "Turkce",
    averageNet: 35,
    totalQuestions: 40,
  },
  {
    subject: "Sosyal",
    averageNet: 15,
    totalQuestions: 20,
  },
  {
    subject: "Matematik",
    averageNet: 25,
    totalQuestions: 40,
  },
  {
    subject: "Fen",
    averageNet: 8,
    totalQuestions: 20,
    percentage: (8 / 20) * 100, // %40
  },
];

interface AnalysisCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  variant?: "default" | "up" | "down";
}

export default function Page() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            TYT Deneme Analizi
          </h1>
          <p className="text-lg text-muted-foreground">
            TYT deneme sonuçlarınızı takip edin ve gelişiminizi analiz edin.
          </p>
        </div>

        <Button
          onClick={() => router.push("/dashboard/analiz/tyt/ekle")}
          className="gap-2 bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
        >
          <Plus className="size-4" />
          TYT Denemesi Ekle
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <AnalysisCard icon={Target} label={"Son Net"} value={88} />
        <AnalysisCard
          icon={TrendingUp}
          label={"Gelişim"}
          value={13.7}
          variant="up"
        />
        <AnalysisCard icon={BarChart3} label={"Ortalama"} value={77.75} />
        <AnalysisCard icon={Calendar} label={"Toplam Deneme"} value={2} />
      </div>
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
    </div>
  );
}

function AnalysisCard({
  icon: Icon,
  label,
  value,
  variant = "default",
}: AnalysisCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "up":
        return {
          iconBg: "bg-green-100 dark:bg-green-900/20",
          iconColor: "text-green-700 dark:text-green-300",
          labelColor: "text-green-600 dark:text-green-400",
          valueColor: "text-green-800 dark:text-green-200",
        };
      case "down":
        return {
          iconBg: "bg-red-100 dark:bg-red-900/20",
          iconColor: "text-red-700 dark:text-red-300",
          labelColor: "text-red-600 dark:text-red-400",
          valueColor: "text-red-800 dark:text-red-200",
        };
      default:
        return {
          iconBg: "bg-amber-100 dark:bg-amber-900/20",
          iconColor: "text-amber-700 dark:text-amber-300",
          labelColor: "text-amber-600 dark:text-amber-400",
          valueColor: "text-amber-800 dark:text-amber-200",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Card className="border border-sidebar-border shadow-sm bg-background dark:bg-background w-full">
      <CardHeader className="p-0"></CardHeader>
      <CardContent className="flex items-center gap-4">
        <div className={`p-2 ${styles.iconBg} rounded-lg`}>
          <Icon className={`w-6 h-6 ${styles.iconColor}`} />
        </div>
        <div>
          <p className={`text-md ${styles.labelColor}`}>{label}</p>
          <p className={`text-xl font-semibold ${styles.valueColor}`}>
            {value.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
