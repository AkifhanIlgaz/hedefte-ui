import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { formatNumber } from "./utils";

interface AnalysisCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  variant?: "default" | "up" | "down";
}

export default function AnalysisCard({
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
    <Card>
      <CardHeader className="p-0"></CardHeader>
      <CardContent className="flex items-center gap-4">
        <div className={`p-2 ${styles.iconBg} rounded-lg`}>
          <Icon className={`w-6 h-6 ${styles.iconColor}`} />
        </div>
        <div>
          <p className={`text-md ${styles.labelColor}`}>{label}</p>
          <p className={`text-xl font-semibold ${styles.valueColor}`}>
            {formatNumber(value)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
